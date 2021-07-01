
const QuizReport = require('../models/QuizReport')
const User = require('../models/User')

exports.getquizReport=async(req,res)=>{
    try{
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})

        const reports = await QuizReport.find({author:req.userId})
        console.log(reports)
        reports.reverse()
        return res.status(200).json(reports)
    }catch(err){
        return res.status(500).json({msg:"Something went wrong in 1 "})
    }
}

exports.postQuizReport = async(req,res)=>{
    try{

        const {data,score,time_taken,attempted} = req.body

       if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})

        const quizReport = await QuizReport.create({author:req.userId,questions:data,score,time_taken,attempted})

        const noOfcorrect = data.filter((item)=>item.correct_answer===item.selected_answer).length
        

        const currentUser = await User.findOne({_id:req.userId})
        console.log("Hello before")
        const total_score = currentUser.totalScore
        const correct_answered = currentUser.correctSolved;
        const quizesTaken = currentUser.quizesTaken;
        const attemptedQuestions = currentUser.questionsAttempted;
        const time_spent = currentUser.timeSpent

    
        await User.findOneAndUpdate({_id:req.userId},{totalScore:total_score+score,correctSolved:correct_answered+noOfcorrect,quizesTaken:quizesTaken+1,questionsAttempted:attemptedQuestions+attempted,timeSpent:time_spent+time_taken},{new:true})
        console.log("Hello")
        // return res.status(200).json({data:"data"})
        return res.status(200).json(quizReport)
    }catch(err){
        return res.status(500).json({msg:"Something went wrong in 2"})
    }
}

exports.getquizReportById = async(req,res)=>{
    try{
        const {id} = req.params
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})
        const report = await QuizReport.findById(id)
        console.log(report)
        return res.status(200).json(report)
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Something went wrong in 3"})
    }
}


exports.getDailyReport = async(req,res)=>{
    try{
        console.log("Hello")
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})
        const pastDate = new Date()
        const ourDate = pastDate.getTime()-1000*60*60
        console.log("Helo")
        const reports = await QuizReport.find({author:req.userId,createdAt:{$gte:Date.now()-1000*60*60*24}})
        console.log(reports)
        const dt = new Date();
        const finalReport = []
        var i;
        for(i=0;i<24;i++){
            finalReport.push({
                label:(dt.getHours()-i+24)%24,
                data:reports.filter(rep=>(rep.createdAt>Date.now()-1000*60*60*(i+1))&&(rep.createdAt<Date.now()-1000*60*60*i)).length
            }) 
        }
        finalReport.reverse() 
        console.log(finalReport)
        return res.status(200).json({msg:finalReport})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Something went wrong in 4"})
    }
}

const weekDay = {
    "0":"Sunday",
    "1":"Monday",
    "2":"Tuesday",
    "3":"Wednesday",
    "4":"Thursday",
    "5":"Friday",
    "6":"Saturday"
}

exports.getWeeklyReport = async(req,res)=>{
    try{
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})

        const reports = await QuizReport.find({author:req.userId,createdAt:{$gte:Date.now()-7*1000*60*60*24}})
        console.log(reports)
        const finalReport = []
        const dt = new Date();
        var i;
        for(i=0;i<7;i++){
            finalReport.push({
                label:weekDay[(dt.getDay()-i+7)%7],
                data:reports.filter(rep=>(rep.createdAt>Date.now()-1000*60*60*24*(i+1))&&(rep.createdAt<Date.now()-1000*60*60*24*i)).length
            }) 
        }
        finalReport.reverse()
        console.log(finalReport)
        return res.status(200).json({msg:finalReport})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong in 5"})
    }
}

exports.getMonthlyReport = async(req,res)=>{
    try{
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})
        const reports = await QuizReport.find({author:req.userId,createdAt:{$gte:Date.now()-30*1000*60*60*24}})
        console.log(reports)
        const finalReport = []
        const dt = new Date();
        var i;
        for(i=0;i<dt.getDate();i++){
            finalReport.push({
                label:(dt.getDate()-i+31)%31,
                data:reports.filter(rep=>(rep.createdAt>Date.now()-1000*60*60*24*(i+1))&&(rep.createdAt<Date.now()-1000*60*60*24*i)).length
            }) 
        }
        finalReport.reverse()
        console.log(finalReport)
        return res.status(200).json({msg:finalReport})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong in 6"})
    }
}