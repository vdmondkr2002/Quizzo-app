import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {postQuestion} from '../../actions/questions'
const Form = () => {
    const [choice,setChoice] = useState('')
    const [doneChoice,setDoneChoice] = useState(true);
    const [questionData,setQuestionData]=useState({
        category:'',question:'',choices:[]
    })
    const [addoption,setAddoption] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const [correctChoiceNum,setcorrectChoiceNum] = useState(2);
    const [doneCorrectChoice,setDoneCorrectChoice] = useState(false);

    const addChoice =(e)=>{
        const choiceObj = {choice:choice,isCorrect:false}
        setQuestionData({...questionData,choices:[...questionData.choices,choiceObj]})
        setAddoption(false)
        setChoice('')
    }

    const changeOption = (e)=>{
        e.preventDefault()
        setAddoption(true)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(postQuestion(questionData,history))
    }

    const doneWithChoice = (e)=>{
        e.preventDefault()
        setDoneChoice(prevChoice=>!prevChoice)

        setDoneCorrectChoice(false)
        const choices = questionData.choices
        choices[correctChoiceNum-1].isCorrect = false;
        setQuestionData({...questionData,choices:choices})
    }

    const setCorrectChoice = (e)=>{
        e.preventDefault()
        const choices = questionData.choices
        choices[correctChoiceNum-1].isCorrect = true;
        setQuestionData({...questionData,choices:choices})
        setDoneCorrectChoice(true)
    }
    
    return (

        <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <input type="text" id="category" name="category" className="form-control" value={questionData.category} onChange={e=>setQuestionData({...questionData,category:e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="question">Question</label>
                                <input type="text" id="question" name="question" className="form-control" value={questionData.question} onChange={e=>setQuestionData({...questionData,question:e.target.value})} />
                            </div>
                            {
                                questionData.choices.map(({choice},index)=>(
                                    <div>
                                        <div style={{height:'150%'}} key={index} className="btn btn-warning btn-block text-left">{index+1}. {choice}
                                        {
                                            doneChoice?(
                                                <button style={{float:'right'}} onClick={(e,index)=>{
                                                    const choices = questionData.choices
                                                    choices.splice(index,1)
                                                    console.log(choices);
                                                    e.preventDefault()
                                                    setQuestionData({...questionData,choices:choices})
                                                }}  className="btn btn-primary btn-sm" >X</button>
                                            ):null
                                        }
                                        </div>    
                                        <br/>
                                    </div>
                                ))
                            }
                            {
                                addoption?(
                                    <div className="row mt-2">  
                                        <div className="col-8">
                                            <div className="form-group">
                                                <label htmlFor="choice" className="sr-only">Choice</label>
                                                <input type="text" className="form-control" id="inputPassword2" value={choice} onChange={e=>setChoice(e.target.value)} placeholder="Enter choice"/>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-group">
                                                <button className="btn btn-info btn-block" onClick={addChoice}>Add Option</button>
                                            </div>   
                                        </div>                                                    
                                    </div>
                                ):null
                            }
                            {
                                doneChoice?(
                                    <div className="text-center mt-2">
                                    <button type="button" onClick={changeOption} className="btn btn-success">
                                        {
                                            questionData.choices.length===0?(
                                                'Add an option'
                                            ):('Add another Option') 
                                        }</button>
                                    </div>
                                ):null
                            }
                            
                            {
                                questionData.choices.length>=2?(
                                    <button type="button" onClick={doneWithChoice} className="btn btn-success">
                                     {
                                         doneChoice?('Done'):('Make changes')
                                     }
                                    </button>
                                ):null
                            }
                            {
                                !doneChoice && !doneCorrectChoice?(
                                    <div className="row mt-2">  
                                        <div className="col-8">
                                            <div className="form-group">
                                                <label htmlFor="choice" className="sr-only">Enter correct choice Id</label>
                                                <input type="text" className="form-control" id="inputPassword2" value={correctChoiceNum} onChange={e=>setcorrectChoiceNum(e.target.value)} placeholder="Enter correct choice Number"/>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-group">
                                                <button className="btn btn-info btn-block" onClick={setCorrectChoice}>Add</button>
                                            </div>   
                                        </div>      
                                    </div>
                                ):null
                            }
                            {
                                !doneChoice?(
                                    <div className="text-center mt-2">
                                        <button type="button" onClick={handleSubmit} data-toggle="modal" data-target="#exampleModal" className="btn btn-success">Submit Question</button>
                                    </div>
                                ):null
                            }
                        </form>
                </div>
            </div>
        </div>
        
    )
}

export default Form
