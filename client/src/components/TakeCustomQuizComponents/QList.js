import React,{useState} from 'react';
import Pagination from 'react-js-pagination'
import Question from './Question'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {addResultToDB} from '../../actions/quizqs'

const QList = ()=>{
    
    const quizObj = useSelector(state=>state.quizqs)
    const dispatch = useDispatch()
    //get questions of quiz
    const quizqs = quizObj.data===undefined?[]:quizObj.data;

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
    }

    // choices.map((choice)=>choice.choice)

    return (
        <div>
        {quizqs.length!==0?(<div className="quiz">
            <Question key={quizqs[currentPage-1]._id} question={quizqs[currentPage-1].question} choices={quizqs[currentPage-1].choices.map((choice)=>choice.choice)} correct_choice={quizqs[currentPage-1].choices[quizqs[currentPage-1].choices.findIndex(choice=>choice.isCorrect===true)].choice} id={quizqs[currentPage-1]._id} score={score} setScore={setScore} />
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