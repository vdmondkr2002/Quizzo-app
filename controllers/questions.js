const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Question = require('../models/Question')
const Category = require('../models/Category')
const User = require('../models/User')
const Choice = require('../models/Choice')

exports.postQuestion = async(req,res)=>{
    try{
        const {category,question,choices} = req.body;
        // console.log(category,question,choices)
        if(!req.userId)
            return res.status(403).json({msg:"Unauthorized"})
        
        const user = await User.findOne({_id:req.userId})
        const qposted = user.questionsContributed;

        
        const updatedUser = await User.findOneAndUpdate({_id:req.userId},{questionsContributed:qposted+1},{new:true})
        updatedUser.save()
        console.log(updatedUser)
        const existingCategory = await Category.findOne({category:category})
    
        if(!existingCategory){
            const newCategory = new Category({category:category,createdAt:new Date().toISOString()})
            newCategory.save()
            console.log("New category created")
            const newQuestion = new Question({author:req.userId,question:question,catId:newCategory._id,createdAt:new Date().toISOString()})
            newQuestion.save()
            choices.forEach(({choice,isCorrect}) => {
                const newChoice = new Choice({choice,is_correct:isCorrect,questionId:newQuestion._id,createdAt:new Date().toISOString()})
                newChoice.save()
                console.log(newChoice)
            });
            return res.status(200).json({msg:`Thank you ${user.name} for contributing!!`})

        }else{
            const newQuestion = new Question({author:req.userId,question:question,catId:existingCategory._id,createdAt:new Date().toISOString()})
            newQuestion.save()
            choices.forEach(({choice,isCorrect}) => {
                const newChoice = new Choice({choice,is_correct:isCorrect,questionId:newQuestion._id,createdAt:new Date().toISOString()})
                newChoice.save()
                console.log(newChoice)
            });
            return res.status(200).json({msg:`Thank you ${user.name} for contributing!!`})
        }


        
    }catch{
        return res.status(500).json({msg:"Something went wrong"})
    }
    
}

