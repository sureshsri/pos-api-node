const userSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');

const salt = 10;


const register =(req,resp)=>{
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

        console.log(req.body)
        user.save().then(saveResponse=>{
            resp.status(201).json({'message':'Saved!'})

        }).catch(error=>{
            resp.status(500).json(error);
        })



    })

}

const login =(req,resp)=>{

}

module.exports={
    register,login
}