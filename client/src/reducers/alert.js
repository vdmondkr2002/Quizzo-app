import {SET_ALERT,CLEAR_ALERT} from '../constants/actions'

// eslint-disable-next-line import/no-anonymous-default-export
export default(alert={},action)=>{
    switch(action.type){
        case SET_ALERT:
            return action.payload;
        case CLEAR_ALERT:
            return {}
        default:
            return alert;
    }
}