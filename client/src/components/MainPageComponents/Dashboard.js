import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { REMOVE } from '../../constants/actions';
import Buttons from './Buttons'
const Dashboard = ()=>{
    const questionData = useSelector(state=>state.questionData)
    const dispatch = useDispatch()

    useEffect(() => {
        if(questionData?.msg)
            alert(questionData.msg)
    }, [questionData.msg,dispatch])
    
    return (
        <div className="container mt-5">
            <div className="col-md-6 m-auto">
                <div className="card text-white bg-success mb-3">
                    <div className="card-header" style={{textAlign:"center"}}>Welcome To Quizzo App</div>
                    <div className="card-body">
                        <Buttons/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Dashboard;