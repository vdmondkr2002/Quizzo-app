import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserData} from '../../actions/user'
import Progress from './Progress'
const ProfilePage = ()=>{
    const dispatch = useDispatch()

    const user = useSelector(state=>state.userData)
    

    useEffect(()=>{
        dispatch(getUserData())
    },[dispatch])

    return (
        <div className="container" style={{marginTop:"2rem"}}>
            <div className="col-md-6 m-auto">
                <div className="card text-white bg-success mb-3">
                    <div className="card-header" style={{textAlign:"center"}}>Welcome, {user?.name}</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col" style={{border:"1px solid #0f0",paddingTop:"0.4rem",paddingBottom:"0.4rem"}}>
                                Questions Contributed  - {user?.questionsContributed}
                            </div>
                            <div className="col" style={{border:"1px solid #0f0",paddingTop:"0.4rem",paddingBottom:"0.4rem"}}>
                                Quizes Taken - {user?.quizesTaken}
                            </div>
                        </div>
                        <Progress/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;