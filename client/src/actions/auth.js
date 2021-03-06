import { AUTH } from '../constants/actions'
const api = require('../api/index')

export const signUp = (formData,history)=>async(dispatch)=>{
    try {
        console.log(formData)

        const {data} = await api.signUp(formData)

        // console.log(data)
        
        dispatch({type:AUTH,payload:data})
        history.push('/login')
    } catch (err) {
        const data = err.response.data
        dispatch({type:AUTH,payload:data})
    }
}

export const signIn = (formData,history)=>async(dispatch)=>{
    try {
        const {data} = await api.signIn(formData)
        console.log(data)
        dispatch({type:AUTH,payload:data})
        history.push('/dashboard')
    } catch (err) {
        const data = err.response.data
        dispatch({type:AUTH,payload:data})
    }
}