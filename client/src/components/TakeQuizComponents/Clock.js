import React, { useEffect } from 'react'
import {CLEAR, DONE} from '../../constants/actions'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router';

const styles = {
    clockContainer:{
        textAlign:"center",
        background:"#00ECB9",
        fontFamily:"sans-serif",
        fontWeight:"100"
    },
    styleh1:{
        color:"#396",
        fontWeight:"100",
        fontSize:"40px",
        margin:"40px 0px 20px"
    },
    clockdiv:{
        fontFamily:"sans-serif",
        color:"#fff",
        display:"inline-block",
        fontWeight:"100",
        textAlign:"center",
        fontSize:"30px"
    },
    clockdivInside:{
        padding:"10px",
        borderRadius:"3px",
        background:"#00BF96",
        display:"inline-block"
    },
    clockdivSpan:{
        padding:"15px",
        borderRadius:"3px",
        background:"#00816A",
        display:"inline-block"
    },
    smallText:{
        paddingTop:"5px",
        fontSize:"16px"
    }
}


const Clock = ({done}) => {
    const dispatch =useDispatch()
    const history = useHistory();
    console.log(done)
    const quizObj = useSelector(state=>state.quizqs)
    const quizqs = quizObj.data===undefined?[]:quizObj.data;
   
    useEffect(()=>{
        const deadline = new Date(Date.parse(new Date()) + quizqs.length*30 * 1000);
        initializeClock("clockdiv",deadline);
    },[])
    const getTimeRemaining = (endtime)=>{
        var t=Date.parse(endtime)-Date.parse(new Date());
        var seconds = Math.floor((t/1000)%60);
        var minutes = Math.floor((t/1000/60)%60);
        return {'total':t,'minutes':minutes,'seconds':seconds}
    }

    const initializeClock = (id,endtime)=>{
        const clock = document.getElementById(id);
        console.log(clock);
        console.log("Hello i am clock");
        const minuetsSpan = clock.querySelector('.minutes');
        const secondsSpan = clock.querySelector('.seconds');
        const updateClock = ()=>{
            var t=getTimeRemaining(endtime);
            minuetsSpan.innerHTML = ('0'+t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0'+t.seconds).slice(-2);
            if((t.total<=0)||(quizqs.length===0)){
                // console.log(window.location.href.includes("/score"))
                if(quizqs.length===0){
                    clearInterval(timeinterval);
                }else{
                    dispatch({type:DONE,payload:{msg:"You have run out of time, Try again!!"}})
                    history.push('/takequiz');
                    dispatch({type:CLEAR})
                    clearInterval(timeinterval)
                }             
            }
        }
        updateClock();
        var timeinterval = setInterval(updateClock,1000);
    }
    


    return (
        <div style={styles.clockContainer}>
            <h1 style={styles.styleh1}>Time remaining</h1>
            <div style={styles.clockdiv} id="clockdiv">
                <div style={styles.clockdivInside}>
                    <span className="minutes" style={styles.clockdivSpan}>9</span>
                    <div style={styles.smallText}>Minutes</div>
                </div>
                <div style={styles.clockdivInside}>
                    <span className="seconds" style={styles.clockdivSpan}>46</span>
                    <div style={styles.smallText}>Seconds</div>
                </div>
            </div>
            
        </div>
    )
}

export default Clock
