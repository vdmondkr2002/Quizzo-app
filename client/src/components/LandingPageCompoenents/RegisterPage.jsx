import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
const RegisterPage = ()=>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password1,setPassword1] = useState('')
    const [password2,setPassword2] = useState('')
    const [err,setErr] = useState('')
    const history = useHistory()
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token!=='null'){
            history.push('/dashboard')
        }
    },[history])


    const submitForm = async(e)=>{
        e.preventDefault()
        if(password1!==password2){
            setErr("Password do not match")
            return 
        }
        try{
            await fetch('/api/v1/users/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name,email,password:password1})
            }).then(response=>response.json())
            .then(res=>{
                console.log(res.msg)
                setErr(res.msg)
                setName('')
                setEmail('')
                setPassword1('')
                setPassword2('')
                if(res.user != null){
                    history.push('/login')
                }
            })
        }catch(err){
            console.log(err)
        }
    }
    


    return (
        <div className="row mt-5">
            <div className="col-md-6 m-auto">
            <div className="card card-body">
                <h1 className="text-center mb-3">
                <i className="fa fa-user-plus"></i> Register
                </h1>
                {
                    err?(
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Note:</strong> {err}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    ):null
                }
                <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                    type="name"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Create Password"
                    onChange={(e)=>setPassword1(e.target.value)}
                    password={password1}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                    type="password"
                    id="password2"
                    name="password2"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={(e)=>setPassword2(e.target.value)}
                    password={password2}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={submitForm}>
                    Register
                </button>
                </form>
                <p class="lead mt-4">Have An Account? <a href="/login">Login</a></p>
            </div>
            </div>
        </div>
    )
}
export default RegisterPage