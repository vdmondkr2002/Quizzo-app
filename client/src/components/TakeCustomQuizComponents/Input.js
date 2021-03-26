import React,{useState,useEffect} from 'react'
import Modal from '../TakeQuizComponents/Modal'
import {useDispatch} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {getCatquizqs} from '../../actions/quizqs'
import { CLEAR } from '../../constants/actions'

const Input = ({category}) => {
    const [noOfqs,setNoOfqs] = useState(0);
    const dispatch = useDispatch()
    
    
    
    const getSearch=(e)=>{
        e.preventDefault()
        dispatch({type:CLEAR})
        dispatch(getCatquizqs(noOfqs,category));
        setNoOfqs(0)
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card text-white bg-success mb-3">
                <img className="card-img-top" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201506/quiz-650-x-418_060115061449.jpg" alt="Welcome" style={{'height':'10rem'}}></img>
                <div className="card-body">
                    <h3>Generate A {category} Quiz Here</h3>
                    <i className="fa fa-hand-o-down" style={{'fontSize':'48px','color':'red'}}></i>
                    <form onSubmit={getSearch}>
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="ml-3 col-form-label">Enter the number of questions you want in quiz:</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" value={noOfqs} onChange={(e)=>setNoOfqs(e.target.value)} id="inputEmail3"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Generate Quiz</button>
                            </div>
                        </div>
                        <Modal/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Input;
