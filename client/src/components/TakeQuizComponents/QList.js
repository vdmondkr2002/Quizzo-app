import React,{useState} from 'react';
import Pagination from 'react-js-pagination'
import Quizq from './Quizq'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {addResultToDB} from '../../actions/quizqs'
import Clock from './Clock'
import { CLEAR } from '../../constants/actions';
const QList = ()=>{
    const [done,setDone] = useState(false)
    const quizObj = useSelector(state=>state.quizqs)
    const dispatch = useDispatch()
    //get questions of quiz
    const quizqs = quizObj.data===undefined?[]:quizObj.data;
    console.log(done)
    //score initialized to 0
    const [score,setScore] = useState(0)

    /*For Pagination */
    //current page
    const [currentPage,setcurrentPage] = useState(1)
    //records per page
    const recordPerPage = 1
    //total number of records 
    const totalRecords = quizqs.length
    //rage of pages in paginator 
    const pageRange = 1
    const handlePageChange = (pageNumber)=>{
        setcurrentPage(pageNumber)
    }

    const handleScore = (e)=>{
        const result = quizObj?.score*1.0/quizqs?.length
        console.log(result)
        dispatch(addResultToDB({scorePercent:result}))
        setDone(true)
        console.log(done)
    }


    return (
        <div>
        
        {quizqs.length!==0?(<div className="quiz">
            <Clock done={done}/>
            <Quizq key={quizqs[currentPage-1].id} question={quizqs[currentPage-1].question} answer={quizqs[currentPage-1].answer} id={quizqs[currentPage-1].id} score={score} setScore={setScore} />
            <h1>{currentPage}</h1>
        </div>
        ):null}
        {
            quizqs.length!==0?(
                <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={currentPage}
                itemsCountPerPage={recordPerPage}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={pageRange}
                onChange={handlePageChange}
                />
            ):null
        }
        {
            quizqs.length!==0?(
            <Link to="/score"  >
                <button onClick={handleScore} className="btn btn-primary">Get Score</button>
            </Link>
            ):null
        }
        
        </div>
    )
}

export default QList;