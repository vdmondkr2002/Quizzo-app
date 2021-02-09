const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:6
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model('User',UserSchema)
module.exports = User