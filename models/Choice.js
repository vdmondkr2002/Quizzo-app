const mongoose = require('mongoose')

const ChoiceSchema = mongoose.Schema({
    choice:{
        type:String,
        required:true
    },
    is_correct:{
        type:Boolean,
        required:true
    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Choice = mongoose.model('Choice',ChoiceSchema)
module.exports = Choice