import React from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Score from './components/ScorePageComponents/Score'
import Navbar from './components/Navbar/Navbar.js'
import about from './components/AboutPageComponents/about.js'
import Dashboard from './components/MainPageComponents/Dashboard'
import RegisterPage from './components/LandingPageCompoenents/RegisterPage'
import LoginPage from './components/LandingPageCompoenents/LoginPage'
import LandingPage from './components/LandingPageCompoenents/LandingPage'
import Profile from './components/ProfilePageComponents/ProfilePage'
import TakeQuiz from './components/TakeQuizComponents/Home'
import TakeCustomQuiz from './components/TakeCustomQuizComponents/Home'
import CreateQuestion from './components/CreateQuestionComponents/Form'


const App = ()=> {
  return (
      <div className="App">      
        <Router>
        <Navbar/>
          <Switch>    
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/dashboard" component={Dashboard}/> 
            <Route exact path="/profile" component={Profile}/> 
            <Route exact path="/takequiz/:cat" component={TakeCustomQuiz}/>
            <Route exact path="/takequiz" component={TakeQuiz}/> 
            <Route exact path="/createquestion" component={CreateQuestion}/>
            <Route exact path="/about" component={about}/>
            <Route exact path="/score" component={Score}/>
          </Switch>
        </Router>
      </div>  
  );
}

export default App;
