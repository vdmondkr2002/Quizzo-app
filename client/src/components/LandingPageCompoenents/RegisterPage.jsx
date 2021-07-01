import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {signUp} from '../../actions/auth'

const initialState = {
    name:'',email:'',password:'',confirmPassword:''
}
const RegisterPage = ()=>{
    const [formData,setFormData] = useState(initialState)
    const authData = useSelector(state=>state.authData)
    const [err,setErr] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    
   

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(signUp(formData,history))
        console.log(authData)
        setErr(authData?.msg)
    }

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
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
                            <strong>Note:</strong> {authData?.msg}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
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
                    onChange={handleChange}
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
                    placeholder="Create Password"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>
                    Register
                </button>
                </form>
                <p className="lead mt-4">Have An Account? <a href="/login">Login</a></p>
            </div>
            </div>
        </div>

    )
}
export default RegisterPage



// const handleSubmit = async(e)=>{
//     e.preventDefault()
//     if(password1!==confirmPassword){
//         setErr("Password do not match")
//         return 
//     }
//     try{
//         await fetch('/api/v1/users/register',{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({name,email,password:password1})
//         }).then(response=>response.json())
//         .then(res=>{
//             console.log(res.msg)
//             setErr(res.msg)
//             setName('')
//             setEmail('')
//             setPassword1('')
//             setPassword2('')
//             if(res.user != null){
//                 history.push('/login')
//             }
//         })
//     }catch(err){
//         console.log(err)
//     }
// }