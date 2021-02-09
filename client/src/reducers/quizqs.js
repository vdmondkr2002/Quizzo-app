import {FETCH_ALL,UPDATE_SCORE,CLEAR} from '../constants/actions'

// eslint-disable-next-line import/no-anonymous-default-export
export default(quizqs={},action)=>{
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case UPDATE_SCORE:
            console.log(action.payload)
            return {...quizqs,score:action.payload}
        case CLEAR:
            return {}
        default:
            return quizqs;
    }
}