const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

//port
const PORT = process.env.PORT || 5000
dotenv.config({path:'./config/config.env'})
const app = express()

//connect to database
connectDB()

app.get('/',(req,res)=>{
  res.send('Quizzo API running')
})
app.use((req, res, next) => {
    // res.append("Access-Control-Allow-Origin", "https://quizzo-v1.netlify.app");
    res.append("Access-Control-Allow-Origin", "http://localhost:3000");
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.append(
      "Access-Control-Allow-Headers",
      "authorization,Content-Type,origin, x-requested-with"
    );
    res.append("Access-Control-Allow-Credentials", "true");
    // res.append("Origin", "https://quizzo-v1.netlify.app");
    res.append("Origin", "http://localhost:3000");
    res.append("Access-Control-Max-Age", "86400");
    next();
});


//body parser middleware for accepting json
app.use(express.json({ limit: "80mb", extended: true }));
//middleware for accepting data from forms
app.use(express.urlencoded({ limit: "80mb", extended: true }));
//routes
app.use('/api/v1/users/',require('./routes/users'))
app.use('/api/v1/questions/',require('./routes/questions'))
app.use('/api/v1/report/',require('./routes/quizReport'))


app.listen(PORT,()=>console.log(`Server running ${PORT}`))