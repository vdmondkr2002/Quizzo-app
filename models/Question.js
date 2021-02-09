const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    question:{
        type:String,
        required:true
    },
    catId:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})