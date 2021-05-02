import React,{useEffect} from 'react'
import {Input} from './Input'
import QList from './QList'
import {useDispatch, useSelector} from 'react-redux'


const Home = () => {
    const quizObj = useSelector(state=>state.quizqs)
    const dispatch = useDispatch()
    const questionData = useSelector(state=>state.questionData)

    useEffect(() => {
        if(questionData?.msg)
            alert(questionData.msg)
    }, [questionData.msg,dispatch])

    return (
        <div className="container">
                <hr></hr>
                <div className="cont">
                    <Input/>
                    <QList/>
                </div>
        </div>
    )
}
export default Home;
