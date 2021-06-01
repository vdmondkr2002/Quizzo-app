import {GET,ADDPIC} from '../constants/actions'

const userReducer = (userData={},action)=>{
    switch (action.type) {
        case GET:
            return action.payload
        case ADDPIC:
            return {...userData,profilePic:action.payload}
        default:
            console.log(action.type)
            return userData
    }
}

export default userReducer;