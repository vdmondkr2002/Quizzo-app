import React, { useEffect } from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import {useDispatch} from 'react-redux'

import {Container,makeStyles, ThemeProvider} from '@material-ui/core'
import Score from './components/ScorePageComponents/Score'
import Navbar from './components/Navbar/Navbar.js'
import About from './components/AboutPageComponents/about.js'
import Dashboard from './components/MainPageComponents/Dashboard'
import RegisterPage from './components/LandingPageCompoenents/RegisterPage'
import LoginPage from './components/LandingPageCompoenents/LoginPage'
import LandingPage from './components/LandingPageCompoenents/LandingPage'
import Profile from './components/ProfilePageComponents/ProfilePage'
import Report from './components/ProfilePageComponents/ReportDialog'
import CreateQuestion from './components/CreateQuestionComponents/Form'
import Contributed from './components/QContributedComponents/Contributed'
import NotFound from './components/ErrorPages/404/error404'

import TakeQuiz from './components/QuizInputComponents/QuizInput'
import CategoryQuizInput from './components/CategoryQuizInputComponents/CategoryQuizInput'
import QuizQuestions from './components/QuizQuestionsComponents/QuizQuestions'
import CategoryQuizQuestions from './components/CatQuizQuestions/CatQuizQuestions'
import VerifyMail from './components/Utils/VerifyMail'
import ResetPassword from './components/Utils/ResetPassword'
import {theme} from './components/theme/theme'
import Footer from './components/Footer/Footer'
import { loadUser } from './actions/auth';

import PrivateRoute from './components/Utils/PrivateRoute';


const useStyles = makeStyles((theme)=>({
  root:{
    padding:0,
    maxWidth:"100vw",
    position:"relative"
  }
})) 

const App = ()=> {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadUser())
  },[])

  return (
      <ThemeProvider theme={theme}>
          <Router>
            <Container className={classes.root}>
              <Navbar/>
              <Switch>    
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/verifyMail/:code" component={VerifyMail}/>
                <Route exact path="/resetPassword/:code" component={ResetPassword}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/> 
                <PrivateRoute exact path="/profile" component={Profile}/>                 
                <PrivateRoute exact path="/takequiz/input/random" component={TakeQuiz}/>
                <PrivateRoute exact path="/takequiz/random/:noOfqs" component={QuizQuestions}/>
                <PrivateRoute exact path="/takequiz/input/:cat" component={CategoryQuizInput}/>
                <PrivateRoute exact path="/takequiz/:cat/:noOfqs" component={CategoryQuizQuestions}/>
                <PrivateRoute exact path="/report/:reportId" component={Report}/>
                <PrivateRoute exact path="/contributed" component={Contributed}/>
                <PrivateRoute exact path="/createquestion" component={CreateQuestion}/>
                <PrivateRoute exact path="/score" component={Score}/>
                <Route exact path="/about" component={About}/>
                <Route component={NotFound}/>
              </Switch>
              <Footer/>
            </Container>
        </Router>
      </ThemeProvider>
      
  );
}

export default App;


