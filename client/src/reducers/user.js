import {GET} from '../constants/actions'

const userReducer = (userData={},action)=>{
    switch (action.type) {
        case GET:
            return action.payload
        default:
            console.log(action.type)
            return null
    }
}

export default userReducer;