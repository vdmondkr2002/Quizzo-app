import {FETCH_ALL} from '../constants/actions'
import {v4} from 'uuid'

const api = require('../api/index')

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export const getQuizqs = (noOfqs)=>async(dispatch)=>{
    try{
        // console.log(noOfqs);
        //get data from external api
        const {data} = await api.getRandomQuizqs(noOfqs);
        const quizqs = {data:[],score:0,time_taken:0,attempted:0}
        for(const item of data.data){
            const answers = [...item.incorrect_answers,item.correct_answer]
            shuffle(answers)
            // console.log(answers)
            // console.log(item);
            quizqs.data.push({
                id:v4(),
                question:item.question,
                correct_answer:item.correct_answer,
                options:answers,
                selected_answer:'',
                marked_done:false
            })
        }
        
        dispatch({type:FETCH_ALL,payload:quizqs})
    }catch(err){
        console.log(err);
    }
}

export const getCategoryQuizqs = (noOfqs,category)=>async(dispatch)=>{
    try{
        // console.log(noOfqs);
        // console.log(category);

        const {data} = await api.getCategoryQuizqs(noOfqs,category);
        const quizqs = {data:[],score:0,time_taken:0,attempted:0,category:category}
        for(const item of data.data){
            const answers = [...item.incorrect_answers,item.correct_answer]
            shuffle(answers)
            // console.log(answers)
            // console.log(item);
            quizqs.data.push({
                id:v4(),
                question:item.question,
                correct_answer:item.correct_answer,
                options:answers,
                selected_answer:'',
                marked_done:false
            })
        }
        
        dispatch({type:FETCH_ALL,payload:quizqs})
    }catch(err){
        console.log(err);
    }
}

export const postQuizReport = (quizqs,history)=>async(dispatch)=>{
    try{
        const {data} = await api.postReport(quizqs)
        console.log(data)
        dispatch({type:FETCH_ALL,payload:data})
        history.push(`/report/${data._id}`)
    }catch(err){
        console.log(err)
    }
}







