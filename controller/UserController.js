const userSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const salt = 10;


const register =(req,resp)=>{

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
            return resp.status(200).json({'infomation':info.response});
        }
    });
    /*bcrypt.hash(req.body.password,salt,function(err,hash){
        if(err){
             return resp.status(500).json(err);
        }
        const user = new userSchema({
            fullName:req.body.fullName,
            password:hash,
            email:req.body.email,
            activeStatus:req.body.activeStatus
        });

        console.log(req.body)
        user.save().then(saveResponse=>{
            resp.status(201).json({'message':'Saved!'})

        }).catch(error=>{
            resp.status(500).json(error);
        })

    })*/

}

const login =(req,resp)=>{

}

module.exports={
    register,login
}