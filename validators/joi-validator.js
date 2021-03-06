const joi = require('joi')

const regValidator = joi.object({
    name:joi.string().min(6).max(255).required(),
    email:joi.string().required().email(),
    password:joi.string().min(6).required(),
    confirmPassword:joi.string().min(6).required()
})

const loginValidator = joi.object({
    email:joi.string().required().email(),
    password:joi.string().min(6).required()
})

module.exports.loginValidator = loginValidator
module.exports.regValidator = regValidator