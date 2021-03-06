import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import './Progress.css'
const Progress = ()=>{
    
    const user = useSelector(state=>state.userData)
    console.log(user?.scorePercent)
    const percent = parseInt(user?.scorePercent.toFixed(2)*100) 
    // const num=Num
    console.log(percent)
    return (
        <div className="row">
            <div className="align-middle col" style={{textAlign:'center'}}>
                <h3 style={{marginTop:"30%"}}>Your Score:</h3>
            </div>
            <div className="col" >
                <div className={'progress-circle p'+percent}>
                    <span>{percent}%</span>
                    <div className="left-half-clipper">
                        <div className="first50-bar"></div>
                        <div className="value-bar"></div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Progress;