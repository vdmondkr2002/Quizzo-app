import {ADDCONTRI} from '../constants/actions'

const contributorsReducer = (contributors=[],action)=>{
    switch (action.type) {
        case ADDCONTRI:
            return action.payload.contributors
        default:
            console.log(action.type)
            return contributors
    }
}

export default contributorsReducer;