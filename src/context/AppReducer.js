export default function AppReducer(state,action){
    switch (action.type) {
        case 'SET_NO_OF_QS':
            return {
                ...state,noOfqs:action.payload
            }
        case 'SET_QUIZ_QS':
            return {
                ...state,quizqs:action.payload
            }
        case 'SET_IS_GEN':
            return {
                ...state,isgenerated:action.payload
            }
        case 'SET_SCORE':
            return {
                ...state,score:action.payload
            }
        default:
            return state;
    }
}