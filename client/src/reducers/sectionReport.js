import {FETCH_SECTION_REPORTS} from '../constants/actions'
const sectionReportReducer = (sectionReport=[],action)=>{
    switch (action.type) {
        case FETCH_SECTION_REPORTS:
            return action.payload;
        default:
            return sectionReport
    }
}
export default sectionReportReducer