const User = require("../models/user");
const path = require('path');
const { check,validationResult } = require("express-validator");
var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
const { xor } = require("lodash");
const { format } = require("path");

exports.signup=(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const user=new User(req.body)
    console.log(req.body);
    user.save((err,user)=>{
        if(err){
            return res.json({
                'err':'data is not stored in DB'
            });
        }
        return res.redirect('/');
    });
};

exports.signin=(req,res)=>{
    const errors = validationResult(req)
    const {email,encry_password1} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    } 
    User.findOne({email},(err,user)=>{
        if(err|| !user){
           return res.status(400).json({
                error:"User Email Doesnt exist"
            })
        }
        if(!user.autheticate(encry_password1)){
         return res.status(401).json({
                error:"Email and Password do not Match"
            })
        }
    //     const token =jwt.sign({_id: user._id},process.env.SECRET);
    //    res.cookie("token",token,{expire: new Date()+9999});
    //    const { name, email } = user;
       return res.redirect("/register");
    });
};
// exports.isSignedIn = expressJwt({
//     secret: process.env.SECRET,
//     userProperty:"auth"
// });

// //custom middlewares
// exports.isAuthenticated = (req,res,next)=>{
//     let checker = req.profile && req.auth &&  req.profile._id == req.auth._id;
//     if(!checker){
//         return res.status(403).json({
//             error:"Access Denied"
//         })
//     }
//     next();
// };