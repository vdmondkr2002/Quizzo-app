const express = require('express')
const router = express.Router()
const {postQuestion} = require('../controllers/questions')
const auth = require('../middleware/auth')


router.post('/add',auth,postQuestion);

module.exports = router