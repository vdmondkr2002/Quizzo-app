const api = require('../api/index')
const {GET_CATS} = require('../constants/actions')
export const getCategories = ()=>async(dispatch)=>{
    try {
        console.log("in action")
        const {data} = await api.getCategories()
        console.log(data)
        dispatch({type:GET_CATS,payload:data})
    } catch (err) {
        console.log(err)
        console.log("Some error occured")
    }
}