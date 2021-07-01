const api = require('../api/index')
const {SET_ALERT} = require('../constants/actions')

export const postQuestion = (formData,history)=>async(dispatch)=>{


    try {
        console.log(formData);
        let count=0;
        for (const key in formData.choices) {
            if(formData.choices[key].choice!=='')
                count++;
        }
        if(count<2){
            dispatch({type:SET_ALERT,payload:{msg:'Please add at least two options',type:"error"}})
            return;
        }
        const {data} = await api.postQuestion(formData)
        
        dispatch({type:SET_ALERT,payload:{msg:data.msg,type:"success"}})
        history.push('/dashboard')
    } catch (err) {
        const data = err.response.data
        dispatch({type:SET_ALERT,payload:{msg:data.msg,type:"error"}})
    }
}


