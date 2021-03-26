import React from 'react'
import {Link} from 'react-router-dom'


const CategoryCard = ({name,img}) => {
    return (
        <>
            <div className="col-md-4">
                <div className="card text-white bg-success mb-3" style={{"height":"100%","borderRadius": '15px'}}>
                    <img className="card-img-top" style={{"height":"70%"}} src={img} alt="Pic"/>
                    <div className="card-body">
                        <h3>{name}</h3>
                        <div className="text-center">
                            <Link to={`/takequiz/${name}`}>
                                <button className="btn btn-primary">Take a Quiz Now</button>
                            </Link>            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryCard
