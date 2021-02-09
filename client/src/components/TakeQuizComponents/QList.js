import React,{useState} from 'react';
import Pagination from 'react-js-pagination'
import Quizq from './Quizq'
import {useSelector} from 'react-redux'


const QList = ()=>{
    
    const quizObj = useSelector(state=>state.quizqs)
    
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
    const totalRecords = 10
    //rage of pages in paginator 
    const pageRange = 1
    const handlePageChange = (pageNumber)=>{
        setcurrentPage(pageNumber)
    }


    return (
        <div>
        {quizqs.length!==0?(<div className="quiz">
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
        
        </div>
    )
}
export default QList;