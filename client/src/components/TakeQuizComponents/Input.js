import React,{useState,useEffect} from 'react'
import Modal from './Modal'
import {useDispatch} from 'react-redux'
import {getQuizqs} from '../../actions/quizqs'

export const Input = () => {
    const [noOfqs,setNoOfqs] = useState(0);
    const [search,setSearch] = useState('')
    const dispatch = useDispatch()
    
    
    useEffect(()=>{
        dispatch(getQuizqs(noOfqs));
    },[noOfqs,dispatch]);

    const UpdateSearch = (e)=>{
        setSearch(e.target.value)
    }
    
    const getSearch=(e)=>{
        e.preventDefault()
        setNoOfqs(search)
        
        setSearch(0)
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card text-white bg-success mb-3">
                <img className="card-img-top" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201506/quiz-650-x-418_060115061449.jpg" alt="Welcome" style={{'height':'10rem'}}></img>
                <div className="card-body">
                    <h3>Generate A Random Quiz Here</h3>
                    <i className="fa fa-hand-o-down" style={{'fontSize':'48px','color':'red'}}></i>
                    <form onSubmit={getSearch}>
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="ml-3 col-form-label">Enter the number of questions you want in quiz:</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" value={search} onChange={UpdateSearch} id="inputEmail3"></input>
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
