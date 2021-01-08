import React,{useContext} from 'react'
import {Input} from './Input'
import QList from './QList'
import {Link} from "react-router-dom"
import {GlobalContext} from '../../context/GlobalState'
import './Home.css'
const Home = () => {
    const {isgenerated} = useContext(GlobalContext);
    return (
        <>
        <div className="row">

            <hr></hr>
            <div className="cont">
                <Input/>
                <QList/>
                {isgenerated?<Link to="/score" class="btn btn-primary" >Get Score</Link>:null}
            </div>
        </div>
            
        </>
    )
}
export default Home;
