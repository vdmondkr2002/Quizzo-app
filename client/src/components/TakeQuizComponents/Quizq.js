import React from 'react'
import Icon from './ui/Icon.js'
import Alert from './ui/Alert.js'
import {useSelector,useDispatch} from 'react-redux'
import {updateScore} from '../../actions/quizqs'
import {doneQuestion} from '../../actions/responses'
const Quizqs = ({setScore,score,question,answer,id}) => {
    
    const responses = useSelector(state=>state.responses)

    const dispatch = useDispatch()
    
    const prevResponse = responses.find(response=>response.id===id)

    // console.log(prevResponse)
    console.log(" I am causing trouble")
    const check=(e)=>{
        const button = e.target
        button.innerText = 'Checked'
        button.className = 'btn btn-success col-sm-2'
        const ans = e.target.parentNode.firstChild.value
        if(ans === answer){
            if(prevResponse===undefined){
                setScore(score+1)
                dispatch(updateScore(score+1))
                dispatch(doneQuestion(id,question,answer,ans,true))
            }
        }else{
            if(prevResponse===undefined){
                dispatch(doneQuestion(id,question,answer,ans,false))
            }
        }
    }
    return (
        <div className="jumbotron">
            {question}
            <hr></hr>
            <div className="row">
                <textarea className="form-control col-sm-9" rows="1" defaultValue={prevResponse?.ans}></textarea>
                {
                    prevResponse!==undefined?(
                        <Icon response={prevResponse.iscorrect}/>
                    ):null
                }
                {
                    prevResponse===undefined?(
                        <button onClick={check} id="check" className="btn btn-primary col-sm-2" >Submit</button>
                    ):(
                        prevResponse.iscorrect?(
                            <button className="btn btn-success col-sm-2">Checked</button>
                        ):(
                            <button className="btn btn-primary col-sm-2">Checked</button>
                        )
                    )
                }
            </div>
            {
                    prevResponse!==undefined?(
                        <Alert response={prevResponse.iscorrect} answer={answer}/>
                    ):null
            }
        </div>
    )
}
export default Quizqs;
