const axios = require('axios')
const urlQuiz = 'http://jservice.io/api/';

export const fetchQs = (noOfqs)=>axios.get(urlQuiz+`random?count=${noOfqs}`)

const API = axios.create({ baseURL: 'http://localhost:5000/' });

API.interceptors.request.use(req=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

const urlUser = '/api/v1/users'

export const signUp = (formData)=>API.post(`${urlUser}/signUp`,formData)

export const signIn = (formData)=>API.post(`${urlUser}/signIn`,formData)

export const addResult = (scorePercent)=>API.post(`${urlUser}/addResult`,scorePercent)

export const getUserData = ()=>API.get(`${urlUser}/userData`)

const urlQuestion = '/api/v1/questions'

export const postQuestion = (formData)=>API.post(`${urlQuestion}/add`,formData);

