import {SET_CURRENTUSER,LOGOUT} from '../constants/actions'

const authReducer = (authData={},action)=>{
    switch (action.type) {
        case SET_CURRENTUSER:
            return action.payload;
        case LOGOUT:
            localStorage.removeItem('quizToken')
            return {}
        default:
            return authData
    }
}

export default authReducer;