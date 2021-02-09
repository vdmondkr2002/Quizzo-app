const mongoose = require('mongoose')

const ScoreSchema = mongoose.Schema({
    score:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    best_score:Number,
    best_category:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})