import {SET_QS, CLEAR_QS} from '../constants/actions'

const questionReducer = (questionData=[],action)=>{
    switch (action.type) {
        case SET_QS:
            console.log(action.payload)
            return action.payload;
        case CLEAR_QS:
            return []
        default:
            return questionData
    }
}
export default questionReducer