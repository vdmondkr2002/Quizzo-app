import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Container,Paper,Typography,Button,Box,makeStyles} from '@material-ui/core'
import { signInWithCode } from '../../actions/auth'
import Alert from './Alert'

const useStyles = makeStyles(()=>({
    outerCont:{
        display:"flex",
        justifyContent:"center"
    },
    paperCont:{
        padding:"2em",
        textAlign:"center",
        width:"70ch",
    },
    text:{
        padding:"0.3em"
    }
}))
const VerifyMail = ({match}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const code = match.params.code

    const loginWithCode = ()=>{
        console.log(code)
        dispatch(signInWithCode(code,history))
    }
    
    return (
        <>
        <Alert/>
        <Container className={classes.outerCont}>
            
            <Box marginTop="10%">
                <Paper className={classes.paperCont}>
                    <Typography variant="h5">Verify Account</Typography>
                    <Typography className={classes.text}>
                        Thank you for registering on quizzo!
                        
                    </Typography>
                    <Typography className={classes.text}>
                        Click Log In Button Below To verify and access Your Account
                    </Typography>
                   
                    <Button variant="contained" onClick={loginWithCode} color="primary">
                        Log In
                    </Button>
                </Paper>
            </Box> 
        </Container>
        </>
    )
}

export default VerifyMail
