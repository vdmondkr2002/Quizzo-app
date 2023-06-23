const express = require('express')
const { postQuizReport ,getquizReport, getDailyReport, getWeeklyReport, getMonthlyReport, getquizReportById } = require('../controllers/quizReports')
const router = express.Router()
const auth = require('../middleware/auth')


router.post('',auth,postQuizReport)
router.get('',auth,getquizReport)
router.get('/day',auth,getDailyReport)
router.get('/week',auth,getWeeklyReport)
router.get('/month',auth,getMonthlyReport)
router.get('/:id',auth,getquizReportById)

module.exports = router