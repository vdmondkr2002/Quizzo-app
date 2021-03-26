import React from 'react'
import Input from './Input'
import QList from './QList'


const Home = ({match}) => {
    const category = match.params.cat
    console.log(category)
    return (
        <div className="container">
                <hr></hr>
                <div className="cont">
                    <Input category={category}/>
                    <QList/>
                    {/* {
                        quizqs.length!==0?(
                        <Link to="/score"  >
                            <button onClick={handleScore} class="btn btn-primary">Get Score</button>
                        </Link>
                        ):null
                    } */}
                </div>
        </div>
    )
}
export default Home;
