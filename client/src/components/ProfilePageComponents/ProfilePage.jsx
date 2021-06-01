import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {getUserData,getTopScorers} from '../../actions/user'
import Compress from 'compress.js'
import {setProfilePic} from '../../actions/user'
const ProfilePage = ()=>{
    const dispatch = useDispatch()

    const user = useSelector(state=>state.userData)
    
    const topscorers = useSelector(state=>state.toppers)
    const topcontributors = useSelector(state=>state.contributors)
    console.log(topscorers)
    console.log(topcontributors)
    useEffect(()=>{
        dispatch(getUserData())
        dispatch(getTopScorers())
    },[dispatch])

    const compress = new Compress()
    const uploadImgClick = async(e)=>{
        const files = [...e.target.files];
        const imageData = await compress.compress(files,{
            quality:0.8
        })
        const imageFile = imageData[0].prefix+imageData[0].data;
        dispatch(setProfilePic(imageFile));
    }

    const cicularLandScape = {
        display: "inline-block",
        position: "relative",
        width: "200px",
        height: "200px",
        overflow: "hidden",
        borderRadius: "50%"
    }

    const uploadStyles = {
        width: "0.1px",
        height: "0.1px",
        opacity: "0",
        overflow: "hidden",
        position: "absolute",
        zIndex: "-1"
    }
    const innerCircle = {
        width: "100%",
        height: "auto"

    }
    return (
        <div className="container" style={{marginTop:"2rem"}}>
            <div className="col-md-6 m-auto">
                <div className="card text-white bg-success mb-3">
                    <div className="card-header" style={{textAlign:"center"}}>Welcome, {user?.name}</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="m-auto">
                                <div className="d-flex justify-content-center" style={cicularLandScape}>
                                    <img style={innerCircle} width="40%" height="40%" alt="100x100" src={user?.profilePic}/>
                                </div> 
                                
                                <div className="d-flex justify-content-center" style={{cursor:"pointer"}}>    
                                    <label htmlFor="icon-button-file" style={{cursor:"pointer"}}>
                                        <i className="fa fa-camera" style={{fontSize:"36px"}}></i>
                                    </label>
                                    <input
                                        accept="image/*"
                                        id="icon-button-file"
                                        type="file"
                                        onChange={uploadImgClick}
                                        style={uploadStyles}
                                    />
                                </div>
                            </div>                  
                        </div>
                        <div className="row">
                            <div className="col" style={{border:"1px solid #0f0",paddingTop:"0.4rem",paddingBottom:"0.4rem"}}>
                                Questions Contributed  - {user?.questionsContributed}
                            </div>
                            <div className="col" style={{border:"1px solid #0f0",paddingTop:"0.4rem",paddingBottom:"0.4rem"}}>
                                Quizes Taken - {user?.quizesTaken}
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col" style={{border:"1px solid #0f0",paddingTop:"0.4rem",paddingBottom:"0.4rem"}}>
                                Questions Solved  - {user?.correctSolved}
                            </div>
                        </div>
                        {/* <Progress/> */}
                    </div>
                </div>
                <h2>Leader Board</h2>
                <h3>Top Scorers</h3>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Username</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            topscorers?.map((user,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>
                                        <Link to={`/users/${user._id}`}>
                                            <div style={{color:"blue"}}>
                                                {user.name}
                                            </div>
                                        </Link>
                                    </td>
                                    <td>{user.correctSolved}</td>
                                </tr>
                            ))
                            
                        }
                    </tbody>
                </table>
                <h3>Top Contributors</h3>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Username</th>
                            <th scope="col">Questions Contributed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            topcontributors?.map((user,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>
                                        <Link to={`/users/${user._id}`}>
                                            <div style={{color:"blue"}}>
                                                {user.name}
                                            </div>
                                        </Link>
                                    </td>
                                    <td>{user.questionsContributed}</td>
                                </tr>
                            ))
                            
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProfilePage;