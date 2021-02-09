import React, { useState,useEffect } from 'react'
import {useHistory} from 'react-router-dom'
const LoginPage = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [err,setErr] = useState('')
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token!=='null'){
            history.push('/dashboard')
        }
    },[history])
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            fetch('/api/v1/users/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            }).then(response=>response.json())
                .then(res=>{
                    setErr(res.msg)
                    if(res.token != null){
                        localStorage.setItem('token',res.token)
                        history.push('/dashboard')
                    }
                }).catch(err=>console.error(err))
        }catch(err){
            throw err
        }  
    }
    return (
        <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="fa fa-user-secret">Login</i></h1>  
                        {
                            err?(
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Note:</strong> {err}
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
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
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
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
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