import React,{useContext} from 'react';
import {GlobalContext} from '../../context/GlobalState'
import Quizq from './Quizq'
const QList = ()=>{
    const {quizqs} = useContext(GlobalContext);
    return (
        <>
        <div className="quiz">
            {quizqs.map((quiz)=><Quizq key={quiz.id} question={quiz.question} answer={quiz.answer} id={quiz.id}/>)}
        </div>
        </>
    )
}
export default QList;