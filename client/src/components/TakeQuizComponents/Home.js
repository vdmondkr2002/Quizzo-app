import React from 'react'
import {Input} from './Input'
import QList from './QList'
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux'

const Home = () => {
    const quizObj = useSelector(state=>state.quizqs)
    
    //get questions of quiz
    const quizqs = quizObj.data===undefined?[]:quizObj.data;

    return (
        <div className="container">
                <hr></hr>
                <div className="cont">
                    <Input/>
                    <QList/>
                    {
                        quizqs.length!==0?(
                        <Link to="/score" class="btn btn-primary" >Get Score</Link>
                        ):null
                    }
                </div>
        </div>
    )
}
export default Home;
