import React from 'react';
import {Link} from 'react-router-dom'
const Buttons = ()=>{
    return (
        <div className="btns-container">
            <button className="btn btn-primary">Create a Quiz</button>
            <Link to="/takequiz" className="btn btn-primary">Take a Quiz</Link>
        </div>
    )
}

export default Buttons;