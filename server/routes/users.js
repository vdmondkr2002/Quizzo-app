const express = require('express')
const router = express.Router()
const {signIn,signUp,addResult,getUserData, getTopScorers,addProfilePic,editProfile,getContributed,getCurrentUser, signInWithCode, sendResetEmail, resetPassword,editPassword} = require('../controllers/users')
const auth = require('../middleware/auth')

router.get('',auth,getCurrentUser)
router.post('/signIn',signIn)
router.post('/signIn/:code',signInWithCode)
router.post('/resetMail',sendResetEmail)
router.post('/resetPassword',resetPassword)
router.post('/signUp',signUp)
router.get('/userData',auth,getUserData)
router.get('/topscorers',auth,getTopScorers)
router.post('/profileImage',auth,addProfilePic)
router.post('/profile',auth,editProfile)
router.post('/changePassword',auth,editPassword)
router.get('/contributed',auth,getContributed)

module.exports = router