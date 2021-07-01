import {GET_PROFILE,ADDTOPPERS,ADDPIC, ADDCONTRI, UPDATE_PROFILE, DONE, SET_QS, SET_ALERT} from '../constants/actions'
import {v4} from 'uuid'
import { loadUser } from './auth';
const api = require('../api/index')


export const getUserData = ()=>async(dispatch)=>{
    try {
        const {data} = await api.getUserData();
        console.log(data);
        dispatch({type:GET_PROFILE,payload:data})
    } catch (err) {
        console.log("Some error occured")
    }
}


// export const getTopScorers = ()=>async(dispatch)=>{
//     try{
//         const {data} = await api.getToppers();
//         console.log(data);
//         dispatch({type:ADDTOPPERS,payload:data})
//         dispatch({type:ADDCONTRI,payload:data})
//     }catch(err){
//         console.log(err)
//         console.log("Some error occured")
//     }
// }
export const editProfile = (formData)=>async(dispatch)=>{
    try{
        await api.editProfile(formData)
        dispatch({type:UPDATE_PROFILE,payload:formData})
        dispatch(loadUser())
        dispatch({type:SET_ALERT,payload:{msg:"Profile info updated",type:"success"}})
    }catch(err){
        console.log(err)
    }
}

export const editPassword = (passData)=>async(dispatch)=>{
    try{
        const {data} = await api.editPassword(passData);
        dispatch({type:SET_ALERT,payload:{msg:data.msg,type:"success"}})
    }catch(err){
        if(err.response){
            const data = err.response.data
            dispatch({type:SET_ALERT,payload:{msg:data.msg,type:"error"}})
        }else{
            console.log(err)
        }
    }
}
export const setProfilePic = (imageFile)=>async(dispatch)=>{
    try{
        await api.setProfilePic({pic:imageFile});
        dispatch({type:ADDPIC,payload:imageFile})
        dispatch(loadUser())
        dispatch({type:SET_ALERT,payload:{msg:"Profile Photo updated",type:"success"}})
    }catch(err){
        console.log(err)
        console.log("Some error occured in adding")
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
export const getContrQs = ()=>async(dispatch)=>{
    try{
        const {data} = await api.getContrQs();
        console.log(data)
        const questions = []
        for(const item of data){
            const answers = [...item.incorrect_answers,item.correct_answer]
            shuffle(answers)
            questions.push({
                id:v4(),
                question:item.question,
                correct_answer:item.correct_answer,
                options:answers,
                category:item.category,
                createdAt:item.createdAt
            })
        }
        dispatch({type:SET_QS,payload:questions})
    }catch(err){
        console.log(err)
    }
}