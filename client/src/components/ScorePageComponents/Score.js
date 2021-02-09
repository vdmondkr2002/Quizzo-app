import React from 'react'
import { useHistory } from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import {getClear} from '../../actions/quizqs'
import { clearReponses } from '../../actions/responses'
const Score = () => { 
    const dispatch = useDispatch()
    const quizObj = useSelector(state=>state.quizqs)
    const quizqs = quizObj.data===undefined?[]:quizObj.data;
    const score = quizObj?.score;
    let history = useHistory()
    function goHome(){
        history.push('/takequiz')
        dispatch(getClear())
        dispatch(clearReponses())
    } 
    const ratio = score/(quizqs.length);
    return (
        <React.Fragment>
            <div className="container mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card text-white bg-success mb-3">
                        <img className="card-img-top" src={ratio>=0.5?"https://broughtonprimary.files.wordpress.com/2016/06/well-done.jpg":"https://tse3.mm.bing.net/th?id=OIP.cYF_mdpOx5_WeFytR5BcygHaJS&pid=Api&P=0&w=300&h=300"} style={{height:"15rem"}} alt="Card cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">Score</h5>
                            <p className="card-text">You have scored:</p>
                            <p><b>{score}/{quizqs.length}</b></p>
                            <button className="btn btn-primary" onClick={goHome}>Take Another</button>
                        </div>
                    </div>
                </div>
            </div>
                
        </React.Fragment>
    )
}

export default Score;