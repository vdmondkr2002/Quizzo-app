const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    correct_answer:{
        type:String,
        required:true
    },
    incorrect_answers:{
        type:[String],
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    question:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Question = mongoose.model('Question',QuestionSchema)
module.exports = Question


/*"category": "Animals",
"type": "multiple",
"difficulty": "medium",
"question": "A carnivorous animal eats flesh, what does a nucivorous animal eat?",
"correct_answer": "Nuts",
"incorrect_answers": [
"Nothing",
"Fruit",
"Seaweed"
] */