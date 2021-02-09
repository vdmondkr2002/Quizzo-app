import React from 'react';
import {Link} from 'react-router-dom'
const Buttons = ()=>{
    return (
        <div>
            <Link to="/createquestion">
                <button className="btn btn-block btn-info mb-3">Contribute a Question</button>
            </Link>          
            <Link to="/takequiz">
                <button  className="btn btn-block btn-info">Take a Quiz</button>
            </Link>
        </div>
    )
}

export default Buttons;