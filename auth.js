const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const { usersModel } = require('./dbSchema');
const saltRound = 10
const secretKey = 'CoINjnLK89$#!Nnjsdk!@%'

let hashPassword = async (password)=>{
    let salt = await bcrypt.genSalt(saltRound);
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

let hashCompare = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}


let createToken = async (email,role)=>{
    let token = await jwt.sign(
        {email,role},
        secretKey,
        {expiresIn:'1m'})
    return token
}
let createforgetToken = async (email,id)=>{
    let token = await jwt.sign(
        {email,id},
        secretKey,
        {expiresIn:'5m'})
    return token
}

let jwtDecode = async (token)=>{
    let data = await jwt.decode(token)
    return data
}

let validate = async(req,res,next)=>{
    let token = req.headers.authorization.split(" ")[1]
    let data = await jwtDecode(token)
    let currentTime = Math.round(new Date()/1000)
    if(currentTime<=data.exp)
       next()
    else
        res.send({
            stausCode:401,
            message:"Token Expired"
        })
}

let roleAdmin = async(req,res,next)=>{
    let token = req.headers.authorization.split(" ")[1]
    let data = await jwtDecode(token)
    if(data.role=="admin")
       next()
    else
        res.send({
            stausCode:401,
            message:"Unauthorized! Only Admin can access!"
        })
}


module.exports = {hashPassword,hashCompare,createToken,jwtDecode,validate,roleAdmin,createforgetToken}