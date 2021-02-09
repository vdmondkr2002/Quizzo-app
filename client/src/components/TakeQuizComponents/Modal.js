import React from 'react';

const Modal = ()=>{
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog " role="document">
                            <div className="modal-content">
                            <div className="modal-header ">
                                <h5 className="modal-title text-danger" id="exampleModalLabel">Attention:</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-warning bg-info">
                                Do not reload the site while giving the quiz, doing this , you might lose your responses!
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Ok,I Got It!</button>
                            </div>
                            </div>
                        </div>
        </div>
    )
}
export default Modal;