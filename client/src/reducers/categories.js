import {GET_CATS} from '../constants/actions'

// eslint-disable-next-line import/no-anonymous-default-export
export default(categories=[],action)=>{
    switch(action.type){
        case GET_CATS:
            return action.payload;
        default:
            return categories;
    }
}