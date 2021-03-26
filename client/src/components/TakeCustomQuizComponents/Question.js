import React from 'react'
import Icon from '../TakeQuizComponents/ui/Icon.js'
import Alert from '../TakeQuizComponents/ui/Alert.js'
import {useSelector,useDispatch} from 'react-redux'
import {updateScore} from '../../actions/quizqs'
import {doneQuestion} from '../../actions/responses'
const Question = ({setScore,score,question,choices,correct_choice,id}) => {
    
    const responses = useSelector(state=>state.responses)

    console.log(choices,correct_choice)

    const dispatch = useDispatch()
    
    const prevResponse = responses.find(response=>response.id===id)

    // console.log(prevResponse)
    console.log(" I am the one imp")
    let ans;
    const check=(e)=>{
        console.log(e.target)
        document.getElementsByName('choice').forEach((choice)=>{
            if(choice.checked===true){
                ans=choice.value
            }
        })
        console.log(ans);
        const button = e.target
        button.innerText = 'Checked'
        button.className = 'btn btn-success col-sm-2'
        if(ans === correct_choice){
            if(prevResponse===undefined){
                setScore(score+1)
                dispatch(updateScore(score+1))
                dispatch(doneQuestion(id,ans,true))
            }
 
        }else{
            if(prevResponse===undefined){
                dispatch(doneQuestion(id,ans,false))
            }
        }
    }
    return (
        <div className="jumbotron">
            {question}
            <hr></hr>
            <div className="row">
                
                {
                    choices.map((choice)=>(
                        <div className="btn btn-info btn-block text-left">
                            <div className="form-check">    
                                {
                                    (prevResponse===undefined)||(prevResponse===[])?(
                                        <input className="form-check-input" type="radio" name="choice" id={`exampleRadios${choice}`} value={choice} />
                                    ):(
                                        <input className="form-check-input" type="radio" name="choice" id={`exampleRadios${choice}`} value={choice} checked={prevResponse?.ans===choice}/>
                                    )
                                }                          
                                
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    {choice}
                                </label>                  
                            </div>
                        </div>  
                    ))
                }
                <div className="container mt-2" >
                    <div className="row" style={{"textAlign":"right"}}>
                        <div className="col">
                        {
                            prevResponse!==undefined?(
                                <Icon response={prevResponse.iscorrect}/>
                            ):null
                        }
                            {
                                
                                prevResponse===undefined?(
                                    
                                        <button onClick={check} id="check" className="btn btn-primary col-sm-2" >Check</button>
                                    
                                ):(
                                    prevResponse.iscorrect?(
                                        <button className="btn btn-success col-sm-2">Checked</button>
                                    ):(
                                        <button className="btn btn-primary col-sm-2">Checked</button>
                                    )
                                )
                                
                            }
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            {
                    prevResponse!==undefined?(
                        <Alert response={prevResponse.iscorrect} answer={correct_choice}/>
                    ):null
            }
        </div>
    )
}
export default Question;
