import axios from 'axios';
const urlQuiz = 'http://jservice.io/api/';

export const fetchQs = (noOfqs)=>axios.get(urlQuiz+`random?count=${noOfqs}`)