import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'

const initialState = {
    quizqs : [],
    noOfqs : 0,
    isgenerated : false,
    score: 0
}


export const GlobalContext = createContext(initialState);


export const GlobalProvider = ({children})=>{
    const [state,dispatch] = useReducer(AppReducer,initialState);
    function setnoOfqs(num){
        dispatch({
            type:'SET_NO_OF_QS',
            payload : num
        })
    }
    function setquizqs(data){
        dispatch({
            type:'SET_QUIZ_QS',
            payload : data
        })
    }
    function setisgenerated(bool){
        dispatch({
            type:'SET_IS_GEN',
            payload : bool
        })
    }
    function setScore(score){
        dispatch({
            type:'SET_SCORE',
            payload:score
        })
    }
    return (
    <GlobalContext.Provider value={{
        quizqs:state.quizqs,
        noOfqs:state.noOfqs,
        isgenerated:state.isgenerated,
        score:state.score,
        setisgenerated,
        setquizqs,
        setnoOfqs,
        setScore
    }}>
        {children}
    </GlobalContext.Provider>
    )
}

