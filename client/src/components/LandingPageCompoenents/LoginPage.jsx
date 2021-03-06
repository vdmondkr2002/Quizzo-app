import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {signIn} from '../../actions/auth'

const initialState = {
    email:'',password:''
}

const LoginPage = ()=>{
    const [formData,setFormData] = useState(initialState)
    const authData = useSelector(state=>state.authData)
    // const [err,setErr] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if(token!=='null'){
    //         history.push('/dashboard')
    //     }
    // },[history])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        dispatch(signIn(formData,history))
        // setErr(authData?.msg)
    }

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        // setErr('')
    }

    return (
        <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="fa fa-user-secret">Login</i></h1>  
                        {
                            authData?.msg?(
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Note:</strong> {authData.msg}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            ):null
                        }
                        <form>
                            <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                onChange={handleChange}
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                                onChange={handleChange}
                            />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Login</button>
                        </form>
                        <p className="lead mt-4">
                            No Account? <a href="/register">Register</a>
                        </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage