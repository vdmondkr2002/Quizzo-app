import React,{useState} from 'react'

const Form = () => {
    const [choice,setChoice] = useState('')
    const [questionData,setQuestionData]=useState({
        category:'',question:'',choices:[]
    })
    const [addoption,setAddoption] = useState(false);

    const addChoice =(e)=>{
        setQuestionData({...questionData,choices:[...questionData.choices,choice]})
        setAddoption(false)
        setChoice('')
    }

    const changeOption = (e)=>{
        e.preventDefault()
        setAddoption(true)
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
                                questionData.choices.map((choice,index)=>(
                                    <div key={index} className="btn btn-warning btn-block text-left">{index}. {choice}</div>
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
                            <div className="text-center mt-2">
                                <button type="button" onClick={changeOption} className="btn btn-success">
                                    {
                                        questionData.choices.length===0?(
                                            'Add an option'
                                        ):('Add another Option') 
                                    }</button>
                            </div>

                        </form>
                </div>
            </div>
        </div>
        
    )
}

export default Form
