import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { CLEAR_ALERT } from '../../constants/actions';

const InnerAlert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Alert = () => {
    const dispatch = useDispatch()
    const alert = useSelector(state=>state.alert)

    const [openAlert,setOpenAlert] = useState(false);

    useEffect(()=>{
        if(alert.msg){
            setOpenAlert(true);
        }
    },[alert])


    const handleCloseAlert = (e)=>{
        setOpenAlert(false);
        dispatch({type:CLEAR_ALERT})
    }

    return (
        <>
        {
            openAlert?(
                <Snackbar
                    style={{ top: "10%", left: "55%" }}
                    anchorOrigin={{ horizontal: "center", vertical: "top" }}
                    open={openAlert}
                    autoHideDuration={5000}
                    onClose={handleCloseAlert}
                >
                    <InnerAlert onClose={handleCloseAlert} severity={alert.type}>
                        <strong>{alert?.msg}</strong>
                    </InnerAlert>
                </Snackbar>
            ):null
        }
        </>
    )
}

export default Alert
