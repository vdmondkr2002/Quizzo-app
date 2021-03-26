const express = require('express')
const router = express.Router()
const {getCategories} = require('../controllers/categories')
const auth = require('../middleware/auth')

router.get('/',auth,getCategories)

module.exports = router