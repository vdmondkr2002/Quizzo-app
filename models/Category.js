const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    category:{
        type:String,
        required:true
    }
})