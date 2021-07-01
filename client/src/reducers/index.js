import {combineReducers} from 'redux';
import quizqs from './quizqs';
import authData from './auth'
import questionData from './questions'
import userData from './user'
import toppers from './topscorers'
import contributors from './topcontributors'
import alert from './alert'
import reports from './report'
import sectionReport from './sectionReport'

export default combineReducers({quizqs,authData,questionData,userData,toppers,contributors,alert,reports,sectionReport});