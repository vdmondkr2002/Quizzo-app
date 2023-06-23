const Question = require('../models/Question')
const Category = require('../models/Category')
const User = require('../models/User')
const QuizReport = require('../models/QuizReport')
const {qaddValidator} = require('../validators/joi-validator')
const Choice = require('../models/Choice')
const axios = require('axios')

exports.postQuestion = async(req,res)=>{
    try{

        const {category,question,choices} = req.body;
        // console.log(category)
        // console.log(question)
        // console.log(choices)
        const {error} = qaddValidator.validate({category,question})
        // console.log(category,question,choices)
        
        if(error)
            return res.status(400).json({msg:error.details[0].message})

        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})
        
        const user = await User.findOne({_id:req.userId})
        const qposted = user.questionsContributed;
        let correct_answer=""
        const incorrect_answers = []
        for(const key in choices){
            if(choices[key].isCorrect){
                correct_answer=choices[key].choice
            }else{
                incorrect_answers.push(choices[key].choice)
            }
        }
        const newQuestion = new Question({category,correct_answer,incorrect_answers,author:req.userId,question:question,createdAt:new Date().toISOString()})
        newQuestion.save()
        // console.log(correct_answer)
        // console.log(incorrect_answers)
        
        const updatedUser = await User.findOneAndUpdate({_id:req.userId},{questionsContributed:qposted+1},{new:true})
        updatedUser.save()
        // console.log(updatedUser)
    

        
        return res.status(200).json({msg:`Thank you ${user.userName}  for contributing!!`})
    }catch{
        return res.status(500).json({msg:"Something went wrong"})
    }
    
}

// exports.getQuizqs = async(req,res)=>{
//     try {
//         const {noOfqs,category} = req.query
//         console.log(noOfqs,category);
//         const cat = await Category.findOne({category:category})
//         const quizqs = await Question.aggregate([
//             {
//                 $match:{
//                     catId:cat._id
//                 }
//             },
//             {
//                 $sample:{
//                     size:Number(noOfqs)
//                 }
//             }
//         ])
//         console.log(quizqs);
//         return res.status(200).json(quizqs)
//     } catch (err) {
//         return res.status(500).json({msg:"Something went wrong"})
//     }
// }

const urlQuiz = 'https://opentdb.com/api.php';
exports.fetchQs = (noOfqs)=>axios.get(urlQuiz+`?amount=${noOfqs}&type=multiple`)

exports.getRandomQuizqs = async(req,res)=>{
    try{
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})

        const {noOfqs} = req.params;

        const noOfqsServer = Math.ceil(0.4*Number(noOfqs))
        const maxnoOfqs = await Question.countDocuments({});
        const quizqsServer = await Question.aggregate([
            {
                $match:{}
            },
            {
                $sample:{
                    size:Number(maxnoOfqs>=noOfqsServer?noOfqsServer:maxnoOfqs)
                }
            }
        ])
        console.log("Hello")
        console.log(Number(noOfqs))
        console.log(maxnoOfqs)
        console.log(noOfqsServer)
        console.log(noOfqs-noOfqsServer)
        console.log(noOfqs-maxnoOfqs>=noOfqsServer?noOfqsServer:maxnoOfqs)
        const finalQs =[];
        if(maxnoOfqs>=noOfqsServer){
            const {data} = await this.fetchQs(noOfqs-noOfqsServer)
        
            data.results.forEach((el)=>{
                finalQs.push(el)
            })
        }else{
            const {data} = await this.fetchQs(noOfqs-maxnoOfqs)
        
            data.results.forEach((el)=>{
                finalQs.push(el)
            })
        }
        
        quizqsServer.forEach((el)=>{
            finalQs.push(el)
        })
        // console.log(finalQs)
        // console.log(data.results+quizqsServer)
        return res.status(200).json({data:finalQs})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong"})
    }
}   

exports.catCode = {
    "Science":17,
    "Maths":19,
    "Geography":22,
    "History":23,
    "Movies":13
}

exports.fetchCatQs = (noOfqs,category)=>axios.get(urlQuiz+`?amount=${noOfqs}&category=${this.catCode[category]}`)

exports.getCategoryQuizqs = async(req,res)=>{
    try{
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})
            
        const {noOfqs,category} = req.query
        console.log(noOfqs)
        console.log(category)
        const noOfqsServer = Math.ceil(0.4*Number(noOfqs))
        const maxnoOfqs = await Question.countDocuments({category:category});
        const quizqsServer = await Question.aggregate([
            {
                $match:{category:category}
            },
            {
                $sample:{
                    size:Number(maxnoOfqs>=noOfqsServer?noOfqsServer:maxnoOfqs)
                }
            }
        ])
        console.log("Hello")
        console.log(Number(noOfqs))
        console.log(maxnoOfqs)
        console.log(noOfqsServer)
        console.log(noOfqs-noOfqsServer)
        console.log(noOfqs-maxnoOfqs>=noOfqsServer?noOfqsServer:maxnoOfqs)
        const finalQs =[];
        if(maxnoOfqs>=noOfqsServer){
            const {data} = await this.fetchCatQs(noOfqs-noOfqsServer,category)
        
            data.results.forEach((el)=>{
                finalQs.push(el)
            })
        }else{
            const {data} = await this.fetchCatQs(noOfqs-maxnoOfqs,category)
        
            data.results.forEach((el)=>{
                finalQs.push(el)
            })
        }
        
        quizqsServer.forEach((el)=>{
            finalQs.push(el)
        })
        // console.log(finalQs)
        // console.log(data.results+quizqsServer)
        return res.status(200).json({data:finalQs})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong"})
    }
}



// {
//     $match:{
//         catId:cat._id
//     }
// },