import React,{useEffect} from 'react'
import Input from './Input'
import QList from './QList'
import {useDispatch, useSelector} from 'react-redux'


const Home = ({match}) => {
    const dispatch = useDispatch()
    const questionData = useSelector(state=>state.questionData)
    
    useEffect(() => {
        if(questionData?.msg)
            alert(questionData.msg)
    }, [questionData.msg,dispatch])

    const category = match.params.cat
    console.log(category)


    return (
        <div className="container">
                <hr></hr>
                <div className="cont">
                    <Input category={category}/>
                    <QList category={category}/>
                    {/* {
                        quizqs.length!==0?(
                        <Link to="/score"  >
                            <button onClick={handleScore} class="btn btn-primary">Get Score</button>
                        </Link>
                        ):null
                    } */}
                </div>
        </div>
    )
}
export default Home;
