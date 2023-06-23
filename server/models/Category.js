const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Category = mongoose.model('Category',CategorySchema)
module.exports = Category