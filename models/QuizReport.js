const mongoose = require('mongoose')
const Question = require('./Question')

const QuizReportSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    questions:{
        type:[Object],
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    time_taken:{
        type:Number,
        required:true
    },
    attempted:{
        type:Number,
        required:true
    },
    category:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const QuizReport = mongoose.model('QuizReport',QuizReportSchema)
module.exports = QuizReport