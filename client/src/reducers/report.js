import {FETCH_REPORTS} from '../constants/actions'
const reportReducer = (reports=[],action)=>{
    switch (action.type) {
        case FETCH_REPORTS:
            return action.payload;
        default:
            return reports
    }
}
export default reportReducer