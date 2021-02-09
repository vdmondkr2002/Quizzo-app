import React,{useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
const LandingPage = ()=>{
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token!=='null'){
            history.push('/dashboard')
        }
    },[history])

    return (
        <div className="container">
            <div className="row m-auto">
                <div className="card card-body">
                    <p>Create Account</p>
                    <Link to="/register">
                        <button className="btn btn-info">Register</button>
                    </Link> 
                    <p>Already have account?</p>
                    <Link to="/login">
                        <button className="btn btn-info">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage