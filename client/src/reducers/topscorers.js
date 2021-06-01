import {ADDTOPPERS} from '../constants/actions'

const toppersReducer = (toppers=[],action)=>{
    switch (action.type) {
        case ADDTOPPERS:
            return action.payload.toppers
        default:
            console.log(action.type)
            return toppers
    }
}

export default toppersReducer;