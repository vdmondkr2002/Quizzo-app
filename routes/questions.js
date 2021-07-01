const express = require('express')
const router = express.Router()
const {postQuestion,getRandomQuizqs,getCategoryQuizqs} = require('../controllers/questions')
const auth = require('../middleware/auth')


router.post('/add',auth,postQuestion);
router.get('/random/:noOfqs',auth,getRandomQuizqs)
router.get('/',auth,getCategoryQuizqs)
// router.post('/report',auth,postQuizReport)
// router.get('/reports',auth,getquizReport)
// router.get('/report/day',auth,getDailyReport)
// router.get('/report/week',auth,getWeeklyReport)
// router.get('/report/month',auth,getMonthlyReport)
// router.get('/report/:id',auth,getquizReportById)


module.exports = router