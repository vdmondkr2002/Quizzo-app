import {FETCH_ALL,UPDATE_SCORE,CLEAR,UPDATE_SELECTED, MARK_DONE, UPDATE_TIME, UPDATE_ATTEMPT} from '../constants/actions'

// eslint-disable-next-line import/no-anonymous-default-export
export default(quizqs={},action)=>{
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case UPDATE_SELECTED:
            return {...quizqs,data:quizqs.data.map((q,index)=>index===action.payload.id?action.payload.question:q)}
        case UPDATE_TIME:
            return {...quizqs,time_taken:action.payload}
        case UPDATE_ATTEMPT:
            return {...quizqs,attempted:action.payload}
        case MARK_DONE:
            console.log(action.payload)
            return {...quizqs,data:quizqs.data.map((q,index)=>index===action.payload?{...q,marked_done:true}:q)}
        case UPDATE_SCORE:
            return {...quizqs,score:action.payload}
        default:
            return quizqs;
    }
}