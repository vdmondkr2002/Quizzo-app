import {FETCH_SECTION_REPORTS} from '../constants/actions'
const sectionReportReducer = (sectionReports=[],action)=>{
    switch (action.type) {
        case FETCH_SECTION_REPORTS:
            return action.payload;
        default:
            return sectionReports
    }
}
export default sectionReportReducer