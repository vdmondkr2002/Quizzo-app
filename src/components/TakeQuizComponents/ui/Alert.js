import React from 'react'

const Alert = ({response,answer}) => {
    if(response === -1){
        return(
            <div className=" mt-3 corr-ans">
                <div class="alert alert-success alert-dismissible fade show" id="success-alert" role="alert">
                        <strong>Correct Answer: </strong> ${answer}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
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
