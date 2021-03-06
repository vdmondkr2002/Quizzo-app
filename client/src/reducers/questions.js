import {REMOVE, DONE} from '../constants/actions'

const questionReducer = (questionData={},action)=>{
    switch (action.type) {
        case DONE:
            return action.payload;
        case REMOVE:
            return {}
        default:
            return {}
    }
}
export default questionReducer