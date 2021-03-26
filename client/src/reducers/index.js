import {combineReducers} from 'redux';
import quizqs from './quizqs';
import responses from './responses';
import authData from './auth'
import questionData from './questions'
import userData from './user'
import categories from './categories'

export default combineReducers({quizqs,responses,authData,questionData,userData,categories});