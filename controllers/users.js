const jwt = require('jsonwebtoken')
const decode = require('jwt-decode')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Question = require('../models/Question')
const { regValidator, loginValidator,resetMailValidator,resetPassValidator, editPassValidator } = require('../validators/joi-validator')
const mongoose = require('mongoose')
const sendEmail = require('../Utils/sendEmail')

exports.getCurrentUser = async(req,res)=>{
    try{
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})

        const user = await User.findOne({_id:req.userId})
        // console.log(user)
        // return res.status(200).json(user)
        return res.status(200).json({firstName:user.firstName,lastName:user.lastName,profilePic:user.profilePic,userName:user.userName,_id:user._id,email:user.email})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong.."})
    }
}

exports.signUp = async(req,res)=>{
    const {email,password,confirmPassword,firstName,lastName,userName,bio} = req.body
    console.log(req.body)
    const {error} = regValidator.validate(req.body)
    // console.log(error)
    try {
        if(error)
            return res.status(400).json({msg:error.details[0].message})

        const profilePic = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODUK/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgAYABgAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+uic7juLFjgnH3/ajOCSGZSBgEj7vsaCfvZZc55x0/4D70Z5OGXOOM9P+Be9AAMAqBuUAZAx933qG8urWztHub24SC3TLyySuEXH94seAK8S/aB/aM8OfDZpNF0dE1zxKq4NtvxFan/puw7/AOwOfUrwa+IfiV8TfG/xDvzc+KddubqIMWitEOy2h/3IxwPqcn1JoA+8fGH7Sfwh8OSywP4o/te4U4ZNLhM4cegcYj/8erz7UP20PBkch/s/wp4gnA4RpnhjIH0DNXw9RQB9w2H7Z/gp5VW98JeILeIdDC8MpU+uCy5/OvQfCH7Sfwg8RskH/CTHSp3bmLU4jbgk9/M5jH/fVfm7RQB+vlpdW17ard2l1HdQTDKTRMGSUf7JHH4ips4JIZlIGASPu+xr8rvht8TfG/w8vhceFtdubWItuktHO+3l/wB6M8Z9xgjsRX29+z5+0Z4e+JTRaLrCw6F4nK4W3d/9HuyOpjY87v8AYPPoW5oA9zGAVA3KAMgY+770nBAB3NuOSB/F7ilBGVwxxjjd1/4F7UmRgZY4zzjr/wAB9qAFORuHyjackD+H3FfOX7YHx2k8C2TeDfCl0n/CR3sIa5uU5NjEw4PtKw6f3Rz3WvZPiz4xs/h/8PNY8V3salbCHdBAW5eZsLGv4sR9Bk9q/LXxJrWpeItfvtd1e5a5v7+dp7iVj95mOT9B2A7DAoApTyyzzPNPI8ssjFndySzE8kknqaZR/nrR/nrQBNZWtzfXkVnZW0tzczOEihiQu7seAABySfSvevBv7JXxR12zjutROk6Asih1hvZ2abB9VjVgPoSD7V7T+wz8K9P0bwXF8RdUtY5tZ1Xd9haQZNpbglQw9GfBJP8AdwO5z9NEZLAoGyMkZ+97igD8+/GX7JnxP0Oya90xtJ8QRqM+XZTMsxx1wkirn6Akn0rwe+tLqxvJrO9tpra5hcpLDNGUeNh1DKeQR6Gv195LAnaxYYJ/v+1fMf7c/wAK7DV/BUnxE0u0jh1fSdovmjGDcWxIX5vVkJBDf3cjsMAHwvT4ZZIJkmhkaOWNgyOhIZSOQQR0NM/z1o/z1oA+9/2QPjtJ48s18G+K7pT4mtIibe5frqMQ65/6aKOvqOezV9GZwAS4UKcE4+57V+Rnh3WNR8P67Za3pNw1tfWMyzwSKfuspz+I7EdxkV+pXwn8ZWfj74faN4ssdkYvIAZEBz9nlGVkjPrhgQD3GD3oA+bP+Cinip47Xw34Lt3KpK0mpXSH7xC/u4s+2TL+Qr44r3v9vG+a7+Ps8BcutnpttCpPoQ0n83NeCUAFFFFAH6jfs73Vpe/ArwXNZbWiXR7aIkdpEQI4PtvVq70gZbKnGOcdf+A+1fDH7HHx20/wXE/gbxhc/Z9FnmMtjesTttZG+9G/pGx5z/CSSeCSPuGzurW9tUvLO5juLaRA0c8MgdSD02kHBHuKAJsfMMqucc46f8B964L9oe6tLL4FeM5rwKIm0a5iUnpvdCiA/wC1uZfxrt7y5trG2kur2aO1t4ELyySyBUiUdWLE4FfD37Y3x30/xnEvgXwddGfRIZhJf3qkhbyRT8qr6op5z/EcY4GSAfMdFFFABX2P/wAE6vFLyW3iTwXPIGETJqNqrHgBv3cv4cRfiTXxxXvn7Bt5JbfH2C2QFheabcwsucZACyfzQUAH7eVnJbfH2e4cllvNNtpkbGMgBo/5oa8Dr7I/4KKeFnltPDfjSCPcIXfTrt1HGG+eL8MiX8SK+OKAEr0T4P8Awb8cfE+7/wCJBp/k6cjbZtRuspAh7gHGXb2UHHfFdn+yl8DJPibq7a74gEsHhWxl2yYJVryUYPlKeyDjcw9cDk5H6A6Rp+n6RpdtpmmWsNnZWyiOKC3jCLGo6BAO1AHz94B/ZF+HWjQxy+JrrUPE12Mbgztb25PoqId35ufpXt/g/wAIeGPB9m9n4Y0a00mA8sII8c/7R6k+5rdJ+9lhnPOOh/3fejPJw65xxnp/wL3oAwvF/hDwx4uslsfE2iWup26jKx3Ee7yz6g9a8Q8f/si/DzWoHl8LXGoeG70g7FV2uLdj6lHO7H0YY9K+jARlcMcY4z1H+97UmRgZY9ecdf8AgPtQB+YXxh+DXjf4YXW7XbAXGmO+yDU7TL28h7AnAKN7MB3xnrXnVfrzq+n2Gr6ZdaZqltb3tncoY54JUDxyIeowepr8/v2rfgZJ8MtXXXvD4luPCt9Jtj3Es9jIcnynPcHnaT6YPIyQDweve/2DrFrv4+wThC62emXMzY9CFj/m4rwWvsf/AIJ1+FXisvEnjS4Qqszx6dasPvEL+8lx7ZMX5GgD6U+K3g6y8e/D/WfCd+UjS9gIR8Z8iUYaOQfRgDjuMjvX5naX4C8QXnxPt/h5Jatb6zJqAsZEYZEbbsM/uoGWz3HNfqxjAI2hQpyBn7nv714T+0n8J9Y1fVbP4n/Do/ZfG+i4k2R9dQjUHjHQsFyMH7ykqe1AHr3gjw5pXhDwppnhvRIlisLGAQw8cyepb3YkknuSa2M4AJcAKcE4+77CvMPgL8Y9F+KGlNCyrpviezTZqelyna6sOCUB5KZ/FTwe2fTxkbTkLtOAf7ntQAHI3D5QVOSB/D7ijksR8pLDIH973oxgEbQoU5Az9z396CMlgVDZGSufv+9AADkqQ4IIwCR972NGcAEuAFOCcfd9hS8kg5ViwwW/v+3tSDI2nIXacA/3PagAORuHygqckD+H3FY/jbw3pnjDwtqXhnWIlmstRtzE6459nHoynDA9iBWxjAI2hQpyBn7nv715h8e/jDonwx0fyNian4kvl26dpURLPM5OFkcDlUz+LHgd8AH566l4C1+1+J8/w8gtWutZTUDYxIq4EjbsK/spGGyegOa/TH4U+D7LwB8PdH8K2UismnwhZpguC8xy0j/8CYk+wIHavMP2bfhVrOm6re/FL4jN9r8ba5l9kg/4842AGwD+FyuF4+6oCjvXu4yNpyF2nAP9z2oAMDBwvfjPUf73tQQMtlDjHOOv/Afak4IJG45OASfvexpTgbidwAGCQeV9h7UAeN/Gf4E6f4w1ePxf4T1FvCvjW3PmRajaErHOwHAkC857bhzjqGHFcjpfxy8b/De4i0T45eDrmNFYRxeINNiElvP7uo+Unv8AKQ3+wK+ksYIBUjAyQD933FRXVtb3ls1rdWsdzBMCHhlUMkq/7QPH50Acx4M+JHgLxjAknhrxRpd+zkFYROFnH+/G2HA+orrCBlvk4xzjr/wH2ryDxd+zd8IfEbvcf8IydKuHbibTJmt+f+uYzGP++a5ofsww2JK6F8VvHulwIMbBehtvt8mz+VAH0Jj5hlVzjnHQ/wC771yfjT4keBPBsJfxJ4o0mwkQE+Q84eYj/rkuXJ+gNeTf8MwR3oEXiD4q+PNSi6vGb0AY/wCBbxXT+D/2bfhF4cmiuF8Mf2vcg5WTVJjcBvcocR/+O0AcVqvxy8bfEi6k0L4F+ELuSItsl8Q6nEEgg9SAcr7jcSf9g11/wa+BOm+ENWk8XeLdQm8V+M5zvm1G4JZYWP8AzxDc+28846BRxXr1nbWtnaJbWdvHBbx4SKOJAigf3do4AqY4G4ncABgkHlfYe1ABj5hlVzjnHQ/7vvQB93CrnPGen/AvejGCAVIwMkA/d9xQBnaNpOTkAn73ufegD//Z';
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
        const newUser = await User.create({email:email,password:hashedPassword,profilePic,firstName,lastName,userName,bio,quizesTaken:0,correctSolved:0,questionsContributed:0,questionsAttempted:0,totalScore:0,timeSpent:0,createdAt:new Date().toISOString()})

        // //to store in token
        const payload = {
            id:newUser._id
        }

        const confirmationCode = jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:"1d"})

        const subject = `[Quizzo]Welcome! Please verify your email address.`
        // const subject = "Hello"
        // const body = "Hello"
        const html = `
        <h3>Welcome to Quizzo, ${userName}!</h3> 
        <div>To complete your Sign Up and To access your account, Please verify your email address,within a day:</div>
        <a href="#">${email}</a>
        <div>
        <a href="https://quizzo-v1.netlify.app/verifyMail/${confirmationCode}"> Verify Email Address </a>
        </div>
        `
        const receiverMail = email
        console.log("Hello")
        sendEmail({html,subject,receiverMail})
        // console.log(token);
        return res.status(200).json({msg:"A verification mail has been sent to the registered email"})
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
        
        if(!oldUser.verified)
            return res.status(400).json({msg:"Please verify your account first! Check the link sent on mail during registration"})

        //Check passowrd
        const isMatch = await bcrypt.compare(password,oldUser.password)

        if(!isMatch)
            return res.status(400).json({msg:"Invalid credentials"})
        
        const payload ={
            email:oldUser.email,
 
            id: oldUser._id
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "3h" });
        console.log(token);
        return res.status(200).json(token)
    }catch(err){
        return res.status(500).json({msg:"Something went wrong.."})
    }
}

exports.sendResetEmail = async(req,res)=>{
    const {error} = resetMailValidator.validate(req.body)
    try{
        if(error)
            return res.status(400).json({msg:error.details[0].message})

        
        const oldUser = await User.findOne({email:req.body.email})

        if(!oldUser)
            return res.status(404).json({msg:"User doesn't exist with this email" })
            
        const payload = {
            email:oldUser.email,
            id:oldUser._id
        }
        const resetCode = jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:"30m"})
        const subject = "[Quizzo] Link Reset Your password"
        const html = `
        <h3>To reset Your password follow the link below:</h3>
        <div>
        <a href="https://quizzo-v1.netlify.app/resetPassword/${resetCode}">Reset Your password</a>
        </div>
        <div>If you haven't made this request. simply ignore the mail and no changes will be made</div>
        `
        
        const receiverMail = req.body.email
        sendEmail({html,subject,receiverMail})
        return res.status(200).json({msg:"Mail sent with link to reset password"})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong.."})
    }
}


exports.resetPassword = async(req,res)=>{
    const {code,password,confirmPassword} = req.body
    const {error} = resetPassValidator.validate(req.body)
    try{
        if(error)
            return res.status(400).json({msg:error.details[0].message})

        if(password !== confirmPassword){
            console.log("No match")
            return res.status(400).json({msg:"Password don't match"})
        }

        const decodedData = decode(code)

        if(decodedData.exp*1000<Date.now()){
            return res.status(400).json({msg:"Expired code"})
        }


        //Get the hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const updatedUser = await User.findOneAndUpdate({_id:decodedData.id},{password:hashedPassword},{new:true})

        return res.status(200).json({msg:"Password Reset Successfully,Now Login with New password"})
    }catch(err){
        return res.status(500).json({msg:"Invalid Code"})
    }
}
exports.signInWithCode = async(req,res)=>{
    const {code} = req.params
    console.log(code)
    try{
        const decodedData = decode(code)
        
        if(decodedData.exp*1000<Date.now()){
            return res.status(400).json({msg:"Expired code"})
        }

        const user = await User.findOne({_id:decodedData.id})
        const updatedUser = await User.findOneAndUpdate({_id:decodedData.id},{verified:true},{new:true})

        const payload ={
            email:user.email,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "3h" });
        console.log(token);
        // return res.status(200).json({ profile: {email:oldUser.email,firstName:oldUser.firstName,lastName:oldUser.lastName,userName:oldUser.userName,id:oldUser._id,profilePic:oldUser.profilePic}, token });
        return res.status(200).json(token)
    }catch(err){
        return res.status(500).json({msg:"Invalid Code"})
    }
  }


exports.getUserData = async(req,res)=>{
    try{
        const userId = req.userId;

        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})

        const user = await User.findOne({_id:userId})

        return res.status(200).json({
            firstName:user.firstName,
            lastName:user.lastName,
            userName:user.userName,
            bio:user.bio,
            email:user.email,
            quizesTaken:user.quizesTaken,
            correctSolved:user.correctSolved,
            totalScore:user.totalScore,
            questionsAttempted:user.questionsAttempted,
            questionsContributed:user.questionsContributed,
            profilePic:user.profilePic
        })
    }catch(err){
        return res.status(500).json({msg:"Something went wrong.."})
    }
}

exports.getTopScorers = async(req,res)=>{
    try{
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})

        const users = await User.find().sort({correctSolved:-1}).limit(10)
        const contributors = await User.find().sort({questionsContributed:-1}).limit(10)
        // console.log(users)
        return res.status(200).json({toppers:users,contributors:contributors})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong.."})
    }
}


exports.addProfilePic = async(req,res)=>{
    try{
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})
        const {pic} = req.body
        // console.log(pic)
        const updatedUser = await User.findOneAndUpdate({_id:req.userId},{profilePic:pic},{new:true})
        return res.status(200).json({msg:"ADDed image successfully"})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong.."})
    }
}

exports.editProfile = async(req,res)=>{
    try{
        const {userName,firstName,lastName,bio,email} = req.body

        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})

        const updatedUser = await User.findOneAndUpdate({_id:req.userId},{userName,firstName,lastName,bio,email},{new:true})

        return res.status(200).json({msg:"Profile updated successfully"})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong.."})
    }
}

exports.editPassword = async(req,res)=>{
    const {error} = editPassValidator.validate(req.body)

    try{

        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})

        if(error)
            return res.status(400).json({msg:error.details[0].message})

        const {password,confirmPassword} = req.body

        if(password !== confirmPassword){
            console.log("No match")
            return res.status(400).json({msg:"Password don't match"})
        }

        //Get the hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        await User.findOneAndUpdate({_id:req.userId},{password:hashedPassword},{new:true})

        return res.status(200).json({msg:"Password updated succesfully"})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong.."})
    }
}

exports.getContributed = async(req,res)=>{
    try{
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})

        const userId= req.userId
        // const user = await User.findOne({_id:id})
        // console.log(user)
        const contrQs = await Question.find({author:userId})
        console.log(contrQs)
        return res.status(200).json(contrQs)
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Something went wrong.."})
    }
}