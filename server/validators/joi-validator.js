const joi = require('joi')

const regValidator = joi.object({
    firstName:joi.string().min(2).max(30).required(),
    lastName:joi.string().min(2).max(40).required(),
    userName:joi.string().min(5).max(30).required(),
    bio:joi.string().max(255),
    email:joi.string().required().email(),
    password:joi.string().min(6).required(),
    confirmPassword:joi.string().min(6).required()
})

const loginValidator = joi.object({
    email:joi.string().required().email(),
    password:joi.string().min(6).required()
})

const qaddValidator = joi.object({
    category:joi.string().required(),
    question:joi.string().required()
})

const resetMailValidator = joi.object({
    email:joi.string().required().email()
})

const resetPassValidator = joi.object({
    password:joi.string().min(6).required(),
    confirmPassword:joi.string().min(6).required(),
    code:joi.string().required()
})

const editPassValidator = joi.object({
    password:joi.string().min(6).required(),
    confirmPassword:joi.string().min(6).required()
})

module.exports= {loginValidator,regValidator,qaddValidator,resetMailValidator,resetPassValidator,editPassValidator}