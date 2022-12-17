const mongoose=require('mongoose')
const validator=require('validator')

var userSchema=new mongoose.Schema({
    name:{type:'string',required:'true'},
    email:{
        type:'string',
        required:'true',
        lowercase:'true',
        validate:(value)=>{
            return validator.isEmail(value)
        }
    },
    password:{type:'string',required:'true'},
    role:{type:'string',default:'admin'}
    
})
let usersModel=mongoose.model('users',userSchema);
module.exports={mongoose,usersModel}