import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
const Header =()=> {
    const [isloggedin,setisLoggedIn] = useState(false)

    const history = useHistory()

    useEffect(()=>{
      const token= localStorage.getItem('token')
      if(token !== 'null'){
        setisLoggedIn(true)
      }
    },[isloggedin])

    const logout = ()=>{
      localStorage.setItem('token',null)
      setisLoggedIn(false)
      history.push('/login')
    }

  
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/dashboard">Quizzo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/"><i className='fas fa-dice-d20'></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
            </ul>
            {
              isloggedin?(
                <button onClick={logout} className="btn btn-secondary">Logout</button>
              ):null
            }
        </div>
    </nav>
    )
}

export default Header;