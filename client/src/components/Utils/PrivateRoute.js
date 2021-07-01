import React,{useEffect} from 'react'
import {Route,Redirect, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoggedIn } from '../../actions/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useSelector(state=>state.authData)
    const token = localStorage.getItem('quizToken')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(checkLoggedIn())
    },[])
    return (
        <Route
            {...rest}
            render={
                (props) => {
                    return user._id || token?(
                        <Component {...props} />
                    ):(
                        <Redirect to='/login'/>
                    )
                }
            }
        />
    )
}

export default PrivateRoute
