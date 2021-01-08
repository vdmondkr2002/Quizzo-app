import React,{useState,useContext} from 'react'
import Icon from './ui/Icon.js'
import Alert from './ui/Alert.js'
import {GlobalContext} from '../../context/GlobalState'
const Quizqs = ({question,answer,id}) => {
    const {score,setScore} = useContext(GlobalContext);
    const [qvalue,setQvalue] = useState(0)


    const updateScore = ()=>{
        setScore(score+1)
    }

    const check=(e)=>{
        const button = e.target
        button.innerText = 'Checked'
        button.className = 'btn btn-success col-sm-2'
        const ans = e.target.parentNode.firstChild.value
        if(ans === answer){
            updateScore()
            setQvalue(1)
        }else{
            setQvalue(-1)
        }
    }
    return (
        <div className="jumbotron">
            {question}
            <hr></hr>
            <div className="row">
                <textarea className="form-control col-sm-9" rows="1"></textarea>
                <Icon response={qvalue}/>
                <button onClick={check} id="check" className="btn btn-primary col-sm-2" >Check</button>
            </div>
            <Alert response={qvalue} answer={answer}/>
        </div>
    )
}
export default Quizqs;
