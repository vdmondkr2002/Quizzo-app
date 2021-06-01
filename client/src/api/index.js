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

export const addResult = (score)=>API.post(`${urlUser}/addResult`,score)

export const getUserData = ()=>API.get(`${urlUser}/userData`)

export const getToppers = ()=>API.get(`${urlUser}/topscorers`)

export const setProfilePic = (imageFile)=>API.post(`${urlUser}/profileImage`,imageFile)

const urlQuestion = '/api/v1/questions'

export const getQuizqs = (noOfqs,category)=>API.get(`${urlQuestion}?noOfqs=${noOfqs}&category=${category}`);

export const postQuestion = (formData)=>API.post(`${urlQuestion}/add`,formData);



const urlCats = '/api/v1/categories'

export const getCategories = ()=>API.get(`${urlCats}`)
