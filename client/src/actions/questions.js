const api = require('../api/index')
const {DONE} = require('../constants/actions')
export const postQuestion = (formData,history)=>async(dispatch)=>{
    try {
        console.log(formData);
        const {data} = await api.postQuestion(formData)
        dispatch({type:DONE,payload:data})
        history.push('/dashboard')
    } catch (err) {
        console.log(err)
        console.log("Some error occured")
    }
}
