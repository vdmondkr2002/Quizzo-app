const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6
    },
    profilePic:String,
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    quizesTaken:{
        type:Number,
        required:true
    },
    scorePercent:{
        type:Number,
        required:true
    },
    questionsContributed:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model('User',UserSchema)
module.exports = User