const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:[5,'password must be of 5 or more charcters']
    }
},{timestamps:true})

userSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: "1h"})
    return token
}

userSchema.methods.comparePassword = async function(password){
    const isMatched =await bcrypt.compare(password,this.password)
    return isMatched
}

userSchema.statics.hashPassword = async function(password){
    const hashedPassword = await bcrypt.hash(password,10)
    return hashedPassword
}

module.exports = mongoose.models.user || mongoose.model('user', userSchema);