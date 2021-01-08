import React,{useState,useEffect,useContext} from 'react'
import {GlobalContext} from '../../context/GlobalState'
import Modal from './Modal'
export const Input = () => {
    const {noOfqs,setquizqs,setisgenerated,setnoOfqs} = useContext(GlobalContext);
    const [search,setSearch] = useState('')
    
    useEffect(()=>{
        const getQuestions = async()=>{
          const reponse = await fetch(`http://jservice.io/api/random?count=${noOfqs}`)
          const data= await reponse.json()
          console.log(data)
          setquizqs(data)
        }
        getQuestions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[noOfqs]);

    const getAlert=()=>{
        setisgenerated(true)
    }

    const UpdateSearch = (e)=>{
        setSearch(e.target.value)
    }
    
    const getSearch=(e)=>{
        e.preventDefault()
        setnoOfqs(search)
        setSearch(0)
    }

    return (
        <div className="card" style={{"width": "69rem",'height':'27rem'}}>
            <img className="card-img-top" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201506/quiz-650-x-418_060115061449.jpg" alt="Welcome" style={{'height':'10rem'}}></img>
            <div className="card-body">
                <h3>Generate A Random Quiz Here</h3>
                <i className="fa fa-hand-o-down" style={{'fontSize':'48px','color':'red'}}></i>
                <form onSubmit={getSearch}>
                    <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-sm-6 col-form-label">Enter the number of questions you want to generate quiz with:</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" value={search} onChange={UpdateSearch} id="inputEmail3"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" onClick={getAlert} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Generate Quiz</button>
                        </div>
                    </div>
                    <Modal/>
                </form>
            </div>
        </div>
    )
}
