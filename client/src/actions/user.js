import {GET,ADDTOPPERS,ADDPIC, ADDCONTRI} from '../constants/actions'
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

export const getTopScorers = ()=>async(dispatch)=>{
    try{
        const {data} = await api.getToppers();
        console.log(data);
        dispatch({type:ADDTOPPERS,payload:data})
        dispatch({type:ADDCONTRI,payload:data})
    }catch(err){
        console.log(err)
        console.log("Some error occured")
    }
}

export const setProfilePic = (imageFile)=>async(dispatch)=>{
    try{
        await api.setProfilePic({pic:imageFile});
        dispatch({type:ADDPIC,payload:imageFile})
    }catch(err){
        console.log(err)
        console.log("Some error occured in adding")
    }
}