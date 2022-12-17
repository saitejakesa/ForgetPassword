var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const {mongoose,usersModel} = require('../dbSchema')
const {hashPassword,hashCompare,createToken,validate,validatetoken,roleAdmin,createforgetToken} = require('../auth')
const {mongodb,dbName,dbUrl} = require('../dbConfig')
const secretKeyforget = 'CoINjnLK89$#!Nnjsdk!@%'
const nodemailer = require("nodemailer");



router.post('/signup',async(req,res)=>{
  mongoose.connect(dbUrl)
  try{
    let details = await usersModel.find({email:req.body.email});
    if(details.length){
      res.send({
        statusCode:400,
        message:"User Already exists"
      })
      
    }
    else{
      let hashedpassword= await hashPassword(req.body.password)
      req.body.password=hashedpassword
      let newusers=await usersModel.create(req.body)
    res.send({
      statusCode:200,
      message:"Sign Up Successfull"
    })
  }
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.post('/login',async(req,res)=>{
  mongoose.connect(dbUrl)
  try{
    console.log(req.body.email)
    let emailuser= await usersModel.findOne({email:req.body.email})
    console.log(emailuser)
    if(emailuser.email !== null){
      
      let hash=await hashCompare(req.body.password,emailuser.password)
      console.log(hash)
        if(hash){
          let token= await createToken(emailuser.email,emailuser.role)
          console.log(token)
          res.send({
            statusCode:200,
            message:"Login Succesfull",
            token
          })
        }
        else{
          res.send({
            statusCode:400,
          message:"Invalid User"
        })
        }
    }
    else{
      res.send({
        statusCode:400,
        message:"User Does Not Exist"
      })
    }
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})
router.post("/forgetpassword",async(req,res)=>{
  mongoose.connect(dbUrl)
  const {email} =req.body
  try{
    const oldUser=await usersModel.findOne({email})
    if(oldUser){
      const secret=secretKeyforget+oldUser.password;
      let token = await jwt.sign(
        {email:oldUser.email,id:oldUser.id},
        secret,
        {expiresIn:'5m'})
      const link=`http://localhost:5000/users/reset-password/${oldUser.id}/${token}`;
      console.log(link)
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dummydeveloper030896@gmail.com',
          pass: 'tulnnhftdpackvln'
        }
      });
      
      var mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Reset Password Link',
        text: link
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send({
        statusCode:200,
        message:"Link sent",
        token,
        link
      })
    }
    else{
      res.send({
        statusCode:400,
        message:"Forget Password not successful"
    })
    }

    // if(oldUser){
    //   return res.send("User Not exists")
    // }
    // const secret = JWT_SECRET+oldUser.password;
    // const token=jwt.sign({email:oldUser.email, id:oldUser.id},secret,{
    //   expiresIn:"5m"
    // })
    // const link=`http://localhost:5000/resetpassword/${oldUser.id}/${token}`;
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.get("/reset-password/:id/:token",async(req,res)=>{
  mongoose.connect(dbUrl)
  const {id,token}=req.params
  try{
  const oldUser=await usersModel.findOne({_id:id});
  if(oldUser){
    const secret=secretKeyforget+oldUser.password;
    const verify = jwt.verify(token,secret)
    res.render("index",{email:verify.email})
  }
  else{
    res.send({
      statusCode:400,
      message:"Password Reset not successful"
  })
  }
  }
  catch(error){
      console.log(error)
      res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.post("/reset-password/:id/:token",async(req,res)=>{
  mongoose.connect(dbUrl)
  const {id,token}=req.params
  const {password}=req.body;
  try{
  const oldUser=await usersModel.findOne({_id:id});
  if(oldUser){
    const secret=secretKeyforget+oldUser.password;
    const verify = jwt.verify(token,secret)
    let hashedpassword= await hashPassword(req.body.password)
      req.body.password=hashedpassword
      await usersModel.updateOne({_id:id},
      {$set: {password:hashedpassword,},})

    res.send({
      statusCode:200,
      message:"Password updated succesfully"
    })
  }
  else{
    res.send({
      statusCode:400,
      message:"User Not exists"
  })
  }
  }
  catch(error){
      console.log(error)
      res.send({statusCode:400,message:"Internal Server Error",error})
  }
})


module.exports = router;
