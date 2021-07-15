const axios = require('axios')

const API = axios.create({ baseURL: 'https://quizzo-web-v1.herokuapp.com/' });
// const API = axios.create({ baseURL: 'http://localhost:5000/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('quizToken')) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem('quizToken'))
      }`;
    }
    return req;
});
  

const urlUser = '/api/v1/users'

//get currently logged In User
export const getCurrentUser = ()=>API.get(`${urlUser}`)

//Register and Log In
export const signUp = (formData)=>API.post(`${urlUser}/signUp`,formData)
export const signIn = (formData)=>API.post(`${urlUser}/signIn`,formData)


//Verify Your email
export const signInWithCode = (code)=>API.post(`${urlUser}/signIn/${code}`)

//Forgot Password?
export const sendResetEmail = (email)=>API.post(`${urlUser}/resetMail`,email)
export const resetPassword = (formData)=>API.post(`${urlUser}/resetPassword`,formData)

//profile page and edit profile
export const getUserData = ()=>API.get(`${urlUser}/userData`)
export const editProfile = (formData)=>API.post(`${urlUser}/profile`,formData)
export const editPassword = (passData)=>API.post(`${urlUser}/changePassword`,passData)
export const setProfilePic = (imageFile)=>API.post(`${urlUser}/profileImage`,imageFile)

//contributed questions
export const getContrQs = ()=>API.get(`${urlUser}/contributed`)


const urlQuestion = '/api/v1/questions'
//take a random quiz
export const getRandomQuizqs = (noOfqs)=>API.get(`${urlQuestion}/random/${noOfqs}`)
//take a category quiz
export const getCategoryQuizqs = (noOfqs,category)=>API.get(`${urlQuestion}?noOfqs=${noOfqs}&category=${category}`);
//Contribute a question
export const postQuestion = (formData)=>API.post(`${urlQuestion}/add`,formData);

const urlReport = '/api/v1/report'
//add the report to database
export const postReport = (report)=>API.post(`${urlReport}/`,report);
//get report of all quizzes of current User
export const getReport = ()=>API.get(`${urlReport}/`)
//get monthly, weekly and daily quiz report
export const getMonthlyReport = ()=>API.get(`${urlReport}/month/`)
export const getWeeklyReport = ()=>API.get(`${urlReport}/week/`)
export const getDailyReport = ()=>API.get(`${urlReport}/day/`)
//get details of a particular report
export const getReportById = (id)=>API.get(`${urlReport}/${id}`)


