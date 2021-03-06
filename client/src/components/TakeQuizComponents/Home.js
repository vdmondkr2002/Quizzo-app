import React from 'react'
import {Input} from './Input'
import QList from './QList'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {addResultToDB} from '../../actions/quizqs'
const Home = () => {
    const quizObj = useSelector(state=>state.quizqs)
    const dispatch = useDispatch()
    //get questions of quiz
    const quizqs = quizObj.data===undefined?[]:quizObj.data;

    const handleScore = (e)=>{
        const result = quizObj?.score*1.0/quizqs?.length
        console.log(result)
        dispatch(addResultToDB({scorePercent:result}))
    }

    return (
        <div className="container">
                <hr></hr>
                <div className="cont">
                    <Input/>
                    <QList/>
                    {
                        quizqs.length!==0?(
                        <Link to="/score"  >
                            <button onClick={handleScore} class="btn btn-primary">Get Score</button>
                        </Link>
                        ):null
                    }
                </div>
        </div>
    )
}
export default Home;
