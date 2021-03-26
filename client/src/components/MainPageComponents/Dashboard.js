import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getCategories} from '../../actions/categories'
import {catData} from './catData'
import CategoryCard from './CategoryCard'
import Buttons from './Buttons'
const Dashboard = ()=>{
    const questionData = useSelector(state=>state.questionData)
    const dispatch = useDispatch()
    const categories = useSelector(state=>state.categories)
    const [cats,setCats] = useState([]);

    useEffect(()=>{
        if(categories!==[])
            setCats(categories) 
    },[dispatch,categories])

    useEffect(() => {
        dispatch(getCategories())
        if(questionData?.msg)
            alert(questionData.msg)
    }, [questionData.msg,dispatch])
    
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
            <div className="categories">
                <h2 className="text-center">Available Categories</h2>
                <div className="row" >
                    {
                        cats.map((category)=>
                            <CategoryCard name={category.category} key={category._id} img={catData[category.category]}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Dashboard;