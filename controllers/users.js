const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { regValidator, loginValidator } = require('../validators/joi-validator')

exports.signUp = async(req,res)=>{
    const {name,email,password,confirmPassword} = req.body
    console.log(req.body)
    const {error} = regValidator.validate(req.body)
    console.log(error)
    try {
        if(error)
            return res.status(400).json({msg:error.details[0].message})

        const profilePic = 'https://tse4.mm.bing.net/th?id=OIP.ZT-Tw8tYy38htqch69vsGQAAAA&pid=Api&P=0&w=300&h=300';
        //Find whether email exists in database
        const existingUser = await User.findOne({email:email})
        if(existingUser)
            return res.status(400).json({msg:"User already exists"})

        //check whether both passwords are same
        if(password !== confirmPassword){
            console.log("No match")
            return res.status(400).json({msg:"Password don't match"})
        }
            

        //Get the hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
  
        //save the user in database
        const newUser = await User.create({email:email,password:hashedPassword,profilePic,name,quizesTaken:0,scorePercent:0,questionsContributed:0,createdAt:new Date().toISOString()})

        //to store in token
        const payload = {
            email:newUser.email,
            id:newUser._id
        }

        const token = jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:"1h"})

        return res.status(200).json({profile:newUser,token:token})
    } catch (err) {
        return res.status(500).json({msg:"Something went wrong.."})
    }
}

exports.signIn = async(req,res)=>{
    const {email,password} = req.body
    const {error} = loginValidator.validate(req.body)

    try{
        if(error)
            return res.status(400).json({msg:error.details[0].message})
        
        //Check email
        const oldUser = await User.findOne({email:email})
        if(!oldUser)
            return res.status(404).json({msg:"User doesn't exist" })
        
        //Check passowrd
        const isMatch = await bcrypt.compare(password,oldUser.password)

        if(!isMatch)
            return res.status(400).json({msg:"Invalid credentials"})
        
        const payload ={
            profile: oldUser, 
            id: oldUser._id
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ profile: oldUser, token });
    }catch(err){
        return res.status(500).json({msg:"Something went wrong.."})
    }
}

exports.addResult = async(req,res)=>{
    
    try{
        const {scorePercent} = req.body;
        console.log(scorePercent)
        const userId = req.userId;
        if(!req.userId)
            return res.status(403).json({msg:"Unauthorized"})
        const user = await User.findById(userId);
        const quizesTaken = user.quizesTaken;
        const currentScore = user.scorePercent;
        const updatedUser = await User.findOneAndUpdate({_id:userId},{quizesTaken:quizesTaken+1,scorePercent:(currentScore+scorePercent)*1.0/(quizesTaken+1)},{new:true})
        await updatedUser.save()
        // console.log(updatedUser);
        return res.status(200).json({msg:"score updated in DB"})
    }catch(err){
        console.log('Something went wrong..') 
    }
}

exports.getUserData = async(req,res)=>{
    try{
        const userId = req.userId;

        if(!req.userId)
            return res.status(403).json({msg:"Unauthorized"})

        const user = await User.findOne({_id:userId})

        return res.status(200).json({
            name:user.name,
            email:user.email,
            quizesTaken:user.quizesTaken,
            scorePercent:user.scorePercent,
            questionsContributed:user.questionsContributed
        })
    }catch(err){
        console.log("Something went wrong...")
    }
}