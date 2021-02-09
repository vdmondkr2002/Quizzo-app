import React from 'react';
import {Link} from 'react-router-dom'
const Buttons = ()=>{
    return (
        <div>
            <button className="btn btn-block btn-info mb-3">Create a Quiz</button>
            <Link to="/takequiz">
                <button  className="btn btn-block btn-info">Take a Quiz</button>
            </Link>
        </div>
    )
}

export default Buttons;