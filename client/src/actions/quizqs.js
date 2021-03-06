import {FETCH_ALL,UPDATE_SCORE,CLEAR} from '../constants/actions'
const api = require('../api/index')
export const getQuizqs = (noOfqs)=>async(dispatch)=>{
    try{
        console.log(noOfqs);
        const score=0;
        //get data from external api
        const {data} = await api.fetchQs(noOfqs);
        const quizqs = {data,score:score}
        console.log(data)
        dispatch({type:FETCH_ALL,payload:quizqs})
    }catch(err){
        console.log(err);
    }
}

export const updateScore = (score)=>async(dispatch)=>{
    try {
        console.log(score)
        dispatch({type:UPDATE_SCORE,payload:score})
    } catch (err) {
        console.log(err)
    }
}

export const getClear = ()=>async(dispatch)=>{
    try {
        dispatch({type:CLEAR})
    } catch (err) {
        console.log(err)
    }
}

export const addResultToDB = (scorePercent)=>async(dispatch)=>{
    try {
        await api.addResult(scorePercent)
    } catch (err) {
        console.log(err)
    }
}
