import React from 'react'

const about=()=> {
    return (
        <React.Fragment>
            <div className="container mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-header" style={{textAlign:"center"}}>Welcome To Quizzo App</div>
                        <div className="card-body">
                            This app is built on MERN stack by Vedant Mondkar
                            <a href="https://github.com/vdmondkr2002/Quizzo-app" rel="noreferrer" target="_blank" className="btn btn-warning">Get the code here</a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}



export default about;
