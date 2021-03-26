const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    question:{
        type:String,
        required:true
    },
    catId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    choices:[Object],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Question = mongoose.model('Question',QuestionSchema)
module.exports = Question
