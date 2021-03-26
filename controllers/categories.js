const Category = require('../models/Category')

exports.getCategories = async(req,res)=>{
    try{
        console.log("Hello")
        const categories = await Category.find();
        console.log("Done")
        return res.status(200).json(categories)
    }catch(err){
        return res.status(500).json({msg:"Something went wrong"})
    }
}