const userSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jsonwebtoken = require('jsonwebtoken');

const salt = 10;


const register =(req,resp)=>{

    userSchema.findOne({'email':req.body.email}).then(result=>{
        console.log(req.body.email);
        console.log(result);
        if(result==null){
            bcrypt.hash(req.body.password,salt,function(err,hash){
                if(err){
                     return resp.status(500).json(err);
                }
                const user = new userSchema({
                    fullName:req.body.fullName,
                    password:hash,
                    email:req.body.email,
                    activeStatus:req.body.activeStatus
                });
        
                const transporter =nodemailer.createTransport({
                    service:'gmail',
            
                    auth:{
                        user:'sureshwts2@gmail.com',
                        pass:'iqnw quqq yztk hedl'
                    }
                });
            
            
                const mailOption = {
                    from:'sureshwts2@gmail.com',
                    to:req.body.email,
                    subject:'New account creation!',
                    text:'You have created your account'
            
                }
                transporter.sendMail(mailOption,function(err,info){
                    if(err){
                        return resp.status(500).json({'error':err});
                    }else{
                        user.save().then(saveResponse=>{
                            resp.status(201).json({'message':'Saved!'})
                
                        }).catch(error=>{
                            resp.status(500).json(error);
                        })
                    }
                });
            })
        }else{
            resp.status(409).json({'error':'Already exist!'})
        }
    })

   
 

}

const login =(req,resp)=>{

    userSchema.findOne({'email':req.body.email}).then(selectedUser=>{
        if(selectedUser!==null){
            bcrypt.compare(req.body.password, selectedUser.password, function(err, result) {
               if(err){
                resp.status(500).json({'message':'Internal server error'}) 
               }
               if(result){
                const payload ={
                    email:selectedUser.email
                }
                   const secretKey = process.env.SECRET_KEY;
                   const expiresIn = '24h'
    
                   const token = jsonwebtoken.sign(payload,secretKey,{expiresIn});
                   console.log("Token : "+token);

                   resp.status(200).json({'token':token});
               }else{
                 resp.status(401).json({'message':'Password is incorrect!'}) 
               }
            });
        }else{
            resp.status(404).json({'message':'not found!'}) 
        }
    });
}

module.exports={
    register,login
}