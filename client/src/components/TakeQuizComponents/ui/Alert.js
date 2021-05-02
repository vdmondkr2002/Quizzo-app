import React from 'react'

const Alert = ({response,answer}) => {
    if(response === false){
        return(
            <div className=" mt-3 corr-ans">
                <div className="alert alert-success alert-dismissible fade show" id="success-alert" role="alert">
                        <strong>Correct Answer: </strong> ${answer}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
            </div>
            
        )
    }else{
        return (
            <div className=" mt-3 corr-ans"></div>
        )
    }
    
}

export default Alert;
