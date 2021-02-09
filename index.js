const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

//port
const PORT = process.env.PORT || 5000

//Loads .env file contents into | process.env.
dotenv.config({path:'./config/config.env'})

//connect to database
connectDB()



const app = express()

//body parser middleware for accepting json
app.use(express.json())

//middleware for accepting data from forms
app.use(express.urlencoded({extended:false}))


//routes
app.use('/api/v1/users/',require('./routes/auth'))




app.listen(PORT,()=>console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))