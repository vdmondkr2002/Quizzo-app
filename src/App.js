import React from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import './App.css'
import Score from './components/ScorePageComponents/Score'
import Header from './components/layout/Header.js'
import about from './components/AboutPageComponents/about.js'
import Home from './components/LandingPageComponents/Random'
import TakeQuiz from './components/TakeQuizComponents/Home'
import {GlobalProvider} from './context/GlobalState'
const App = ()=> {
  return (
    <GlobalProvider>

      <div className="App">      
        <Router>
        <Header/>
          <Switch>    
            <Route exact path="/" component={Home}/>   
            <Route exact path="/takequiz" component={TakeQuiz}/> 
            <Route exact path="/about" component={about}/>
            <Route exact path="/score" component={Score}/>
          </Switch>
        </Router>
      </div>
    </GlobalProvider>  
  );
}

export default App;
