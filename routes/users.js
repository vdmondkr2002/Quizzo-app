const express = require('express')
const router = express.Router()
const {signIn,signUp,addResult,getUserData} = require('../controllers/users')
const auth = require('../middleware/auth')


router.post('/signIn',signIn)
router.post('/signUp',signUp)
router.post('/addResult',auth,addResult)
router.get('/userData',auth,getUserData)

module.exports = router