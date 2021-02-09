const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req,res,next)=>{
    const token = req.header('auth-token')

    if(!token)
        return res.status(400).json({msg:"Access denied"})
    
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        return res.status(400).json({msg:"Invalid Token"})
    }
}

module.exports = ensureAuthenticated