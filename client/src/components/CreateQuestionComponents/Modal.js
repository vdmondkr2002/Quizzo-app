import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

const Modal = ()=>{
    const [msg,setMsg] = useState('')
    const questionData = useSelector(state=>state.questionData)
    
    useEffect(() => {
        setMsg(questionData.msg)
    }, [])
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog " role="document">
                <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title text-danger" id="exampleModalLabel">Thank You:</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body text-warning bg-info">
                        {msg}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Welcome</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;