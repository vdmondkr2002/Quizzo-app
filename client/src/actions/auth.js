import { SET_CURRENTUSER, LOGOUT, SET_ALERT } from '../constants/actions'
import decode from 'jwt-decode'
import { useSelector } from 'react-redux'
const api = require('../api/index')

export const signUp = (formData,history)=>async(dispatch)=>{
    try {
        console.log(formData)

        const {data} = await api.signUp(formData)
        dispatch({type:SET_ALERT,payload:{msg:data.msg,type:"success"}})
        
    } catch (err) {
        if(err.response){
            const data = err.response.data
            dispatch({type:SET_ALERT,payload:{msg:data.msg,type:"error"}})
        }else{
            console.log(err)
        }
        
    }
}

export const signIn = (formData,history)=>async(dispatch)=>{
    try {
        const {data} = await api.signIn(formData)
        console.log(data)
        localStorage.setItem('quizToken',JSON.stringify(data))
        dispatch(loadUser())
        dispatch({type:SET_ALERT,payload:{msg:"Logged In Successfully",type:"success"}})
        history.push('/dashboard')
    } catch (err) {
        if(err.response){
            const data = err.response.data
            dispatch({type:SET_ALERT,payload:{msg:data.msg,type:"error"}})
        }else{
            console.log(err)
        }
    }
}
export const signInWithCode = (code,history)=>async(dispatch)=>{
    try{
        const {data} = await api.signInWithCode(code)
        console.log(data)
        localStorage.setItem('quizToken',JSON.stringify(data))
        dispatch(loadUser())
        dispatch({type:SET_ALERT,payload:{msg:"Logged In Successfully",type:"success"}})
        history.push('/dashboard')
    }catch(err){
        if(err.response){
            console.log("Hello")
            // console.log(err.response.data)
            const data = err.response.data
            dispatch({type:SET_ALERT,payload:{msg:data.msg,type:"error"}})
        }else{
            console.log("This is huge error")
            // console.log(err)
        }
    }
}

export const sendResetEmail = (email)=>async(dispatch)=>{
    try{
        const {data} = await api.sendResetEmail({email:email})
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

export const resetPassword = (formData,history)=>async(dispatch)=>{
    try{
        const {data} = await api.resetPassword(formData)
        dispatch({type:SET_ALERT,payload:{msg:data.msg,type:"success"}})
        history.push('/login')
    }catch(err){
        if(err.response){
            const data = err.response.data
            dispatch({type:SET_ALERT,payload:{msg:data.msg,type:"error"}})
        }else{
            console.log(err)
        }
    }
}

export const logOut = (history)=>async(dispatch)=>{
    dispatch({type:LOGOUT})
    history.push('/login')
}

export const loadUser = ()=>async(dispatch)=>{
    try{
        console.log("loading user")
        if(localStorage.getItem('quizToken')){
            console.log("user found")
            const token = localStorage.getItem('quizToken')
            const decodedToken = decode(token);
            if((decodedToken.exp*1000 < new Date().getTime())){
                dispatch({type:LOGOUT})
            }else{
                const {data} = await api.getCurrentUser();
                dispatch({type:SET_CURRENTUSER,payload:data})
            }
        }
    }catch(err){
        console.log(err)
    }
}

export const checkLoggedIn = ()=>(dispatch)=>{
    if(!localStorage.getItem('quizToken')){
        console.log("Hello there is no token")
        // console.log()
        dispatch({type:SET_ALERT,payload:{msg:"Please, Login to view this page",type:"warning"}})
        // history.push('/login')
    }else{

        const token = localStorage.getItem('quizToken')
        const decodedToken = decode(token);
        if((decodedToken.exp*1000 < new Date().getTime())){
            console.log("Token but expired")
            dispatch({type:LOGOUT})
            dispatch({type:SET_ALERT,payload:{msg:"You have been logged Out, Please login to view this page",type:"warning"}})
            // history.push('/login')
        }
        console.log("Yes found token")
    }
}