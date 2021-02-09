import {ADD,CLEAR} from '../constants/actions'

// eslint-disable-next-line import/no-anonymous-default-export
export default(responses=[],action)=>{
    switch(action.type){
        case ADD:
            return [...responses,action.payload];
        case CLEAR:
            return []
        default:
            return responses
    }
    
}