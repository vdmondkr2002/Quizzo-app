import React from 'react'
import { useHistory } from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import {getClear} from '../../actions/quizqs'
import { clearReponses } from '../../actions/responses'
const Score = () => { 
    const dispatch = useDispatch()
    const quizObj = useSelector(state=>state.quizqs)
    const responses = useSelector(state=>state.responses)
    const quizqs = quizObj.data===undefined?[]:quizObj.data;

    console.log(quizqs)
    console.log(responses)
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
                <div className="row">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                        <h2>Your Responses</h2>
                            {
                                <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                        <th scope="col">Question</th>
                                        <th scope="col">Correct answer</th>
                                        <th scope="col">Your answer</th>
                                        <th scope="col">Response</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        quizqs.map((question)=>(
                                            <tr>
                                                <td>{question.question}</td>
                                                <td>{question.answer}</td>
                                                <td>
                                                {
                                                    responses.findIndex(res=>res.id===question.id)!==-1?(
                                                        responses[responses.findIndex(res=>res.id===question.id)].ans
                                                    ):(
                                                        "Not attempted"
                                                    )
                                                }</td>
                                                <td>
                                                {
                                                    responses.findIndex(res=>res.id===question.id)!==-1?(    
                                                        responses[responses.findIndex(res=>res.id===question.id)].iscorrect===true?(
                                                            <img src="https://image.flaticon.com/icons/png/128/845/845646.png" width="50%" height="50" alt="correct"/>
                                                        ):(
                                                            <img src="https://t3.ftcdn.net/jpg/03/52/50/08/240_F_352500882_ynKURmVaMoOrbCc0QOs8AkEykrvpSVFG.jpg" width="55%" height="50" alt="wrong"/>
                                                        )
                                                    ):(
                                                        <>&#128512;</>
                                                    )
                                                }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            }
                    </div>

                </div>
                
            </div>
                
        </React.Fragment>
    )
}

export default Score;