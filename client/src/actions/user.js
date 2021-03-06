import {GET} from '../constants/actions'
const api = require('../api/index')



export const getUserData = ()=>async(dispatch)=>{
    try {
        const {data} = await api.getUserData();
        console.log(data);
        // console.log("eka")
        dispatch({type:GET,payload:data})
    } catch (err) {
        console.log("Some error occured")
    }
}
