import React,{useContext} from 'react'
import { useHistory } from "react-router-dom"
import {GlobalContext} from '../../context/GlobalState'
import './Score.css'
const Score = () => { 
    const {score,noOfqs,setquizqs,setnoOfqs,setScore} = useContext(GlobalContext);
    let history = useHistory()
    function goHome(){
        history.push('/takequiz')
        setquizqs([])
        setnoOfqs(0)
        setScore(0)
    } 
    const ratio = score/noOfqs;
    return (
        <React.Fragment>
            <div className="ScoreCard">
                <div className="score" style={{"width": "20rem",'height':'23rem'}}>
                    <img className="card-img-top" src={ratio>=0.5?"https://broughtonprimary.files.wordpress.com/2016/06/well-done.jpg":"https://tse3.mm.bing.net/th?id=OIP.cYF_mdpOx5_WeFytR5BcygHaJS&pid=Api&P=0&w=300&h=300"} alt="Card cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">Score</h5>
                        <p className="card-text">You have scored:</p>
                        <p><b>{score}/{noOfqs}</b></p>
                        <button className="btn btn-primary" onClick={goHome}>Take Another</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Score;