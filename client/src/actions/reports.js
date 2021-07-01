import {FETCH_ALL, FETCH_REPORTS, FETCH_SECTION_REPORTS} from '../constants/actions'
import {v4} from 'uuid'

const api = require('../api/index')

export const getReport = ()=>async(dispatch)=>{
    try{
        const {data}= await api.getReport()
        console.log(data)
        dispatch({type:FETCH_REPORTS,payload:data})
    }catch(err){
        console.log(err)
    }
}

export const getReportById = (id)=>async(dispatch)=>{
    try{
        const {data} = await  api.getReportById(id)
        console.log(data)
        dispatch({type:FETCH_ALL,payload:data})
    }catch(err){
        console.log(err)
    }
}

export const getMonthlyReport = ()=>async(dispatch)=>{
    try{
        const {data} = await api.getMonthlyReport();
        console.log(data)
        dispatch({type:FETCH_SECTION_REPORTS,payload:data.msg})
    }catch(err){
        console.log(err)
    }
}
export const getWeeklyReport = ()=>async(dispatch)=>{
    try{
        const {data} = await api.getWeeklyReport();
        console.log(data)
        dispatch({type:FETCH_SECTION_REPORTS,payload:data.msg})
    }catch(err){
        console.log(err)
    }
}


export const getDailyReport = ()=>async(dispatch)=>{
    try{
        const {data} = await api.getDailyReport();
        console.log(data)
        dispatch({type:FETCH_SECTION_REPORTS,payload:data.msg})
    }catch(err){
        console.log(err)
    }
}

