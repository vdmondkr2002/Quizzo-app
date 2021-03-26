const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

//port
const PORT = process.env.PORT || 5000

//Loads .env file contents into | process.env.
dotenv.config({path:'./config/config.env'})

const app = express()

//connect to database
connectDB()

//body parser middleware for accepting json
app.use(express.json())

//middleware for accepting data from forms
app.use(express.urlencoded({extended:false}))

//cross origin request
app.use(cors())

//routes
app.use('/api/v1/users/',require('./routes/users'))
app.use('/api/v1/questions/',require('./routes/questions'))
app.use('/api/v1/categories/',require('./routes/categories'))


app.listen(PORT,()=>console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))