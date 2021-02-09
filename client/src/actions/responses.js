import {ADD,CLEAR} from '../constants/actions'

export const doneQuestion = (id,ans,iscorrect)=>async(dispatch)=>{
    try {
        const response = {id,ans,iscorrect}
        console.log(response)
        dispatch({type:ADD,payload:response})
    } catch (err) {
        console.log(err)
    }
}

export const clearReponses = ()=>async(dispatch)=>{
    try {
        
        dispatch({type:CLEAR})
    } catch (err) {
        console.log(err)
    }
}
