const express = require('express')
const router = express.Router()
const {postQuestion,getQuizqs} = require('../controllers/questions')
const auth = require('../middleware/auth')


router.post('/add',auth,postQuestion);
router.get('/',auth,getQuizqs);

module.exports = router