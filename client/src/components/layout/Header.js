import React,{useState} from 'react'
import {useHistory,Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { LOGOUT } from '../../constants/actions'

const Header =()=> {
    const [isloggedin,setisLoggedIn] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

   
    const user = localStorage.getItem('profile')
      

    const logout = ()=>{
      dispatch({type:LOGOUT})
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
                <Link to='/'>
                  <button className="btn btn-success"><i className='fas fa-dice-d20'></i></button>
                </Link>
              </li>
              <li className="nav-item" style={{marginRight:"5%"}}>
                <Link to="/" >
                  <button className="btn btn-success">Home</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about">
                  <button className="btn btn-success">About</button>
                </Link>
              </li>
            </ul>
            <Link to="/profile" style={{marginRight:"5%"}} >
              <button className="btn btn-success">Profile</button>
            </Link>
            {
              user?(
                <button onClick={logout} className="btn btn-secondary">Logout</button>
              ):null
            }
        </div>
    </nav>
    )
}

export default Header;