const mongoose=require('mongoose')

const  UserSchema=mongoose.Schema({
    name:{require:true,type:String},
    email:{require:true,type:String},
    mno:{require:true,type:String},
    password:{require:true,type:String},
})

const User=mongoose.model('user',UserSchema)

module.exports=User;