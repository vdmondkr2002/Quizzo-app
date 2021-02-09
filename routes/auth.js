const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { regValidator, loginValidator } = require('../validators/joi-validator')
const router = express.Router()

//model
const User = require('../models/User')

router.post('/register',async(req,res)=>{
    const {name,email,password} = req.body
    const {error} = regValidator.validate(req.body)
    try {
        if(error)
            return res.status(400).json({msg:error.details[0].message})

        //Find whether email exists in database
        const user = await User.findOne({email:email})
        if(user)
            return res.status(400).json({msg:"Email already exists"})

        //Get the hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        //create a user 
        const newUser = new User({
            name,email,password:hashedpassword
        })

        //save the user
        const savedUser = await newUser.save()
        res.json({user:savedUser})
    } catch (err) {
        return res.status(500).json({msg:"Server Error"})
    }
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const {error} = loginValidator.validate(req.body)

    try{
        if(error)
            return res.status(400).json({msg:error.details[0].message})
        
        //Check email
        const user = await User.findOne({email:email})
        if(!user)
            return res.status(400).json({msg:"No account found with this email"})
        
        //Check passowrd
        const isMatch = await bcrypt.compare(password,user.password)

        
        if(isMatch){
            const payload ={
                _id:user.id
            }
            const token = jwt.sign(payload,process.env.TOKEN_SECRET)
            return res.header('auth-token',token).json({token})
        }
        return res.status(400).json({msg:"Password incorrect"})
    }catch(err){
        return res.status(500).json({msg:"Server Error"})
    }
})
module.exports = router