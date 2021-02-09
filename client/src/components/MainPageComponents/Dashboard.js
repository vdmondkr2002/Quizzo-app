import React,{useEffect} from 'react';
import './Dashboard.css';
import Buttons from './Buttons'
import { useHistory } from 'react-router';
const Dashboard = ()=>{
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token==='null'){
            console.log("Hello")
            history.push('/')
        }
    },[history])

    
    return (
        <div className="container mt-5">
            <div className="col-md-6 m-auto">
                <div className="card text-white bg-success mb-3">
                    <div className="card-header" style={{textAlign:"center"}}>Welcome To Quizzo App</div>
                    <div className="card-body">
                        <Buttons/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Dashboard;