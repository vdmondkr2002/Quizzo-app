import {GET_PROFILE,ADDPIC, UPDATE_PROFILE, UPDATE_PASS} from '../constants/actions'

const userReducer = (userData={},action)=>{
    switch (action.type) {
        case GET_PROFILE:
            return action.payload
        case UPDATE_PROFILE:
            return {...userData,userName:action.payload.userName,email:action.payload.email,
                firstName:action.payload.firstName,lastName:action.payload.lastName,bio:action.payload.bio}
        case ADDPIC:
            return {...userData,profilePic:action.payload}
        default:
            // console.log(action.type)
            return userData
    }
}

export default userReducer;