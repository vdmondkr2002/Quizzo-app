import React, { useState,useEffect } from 'react'

import {useHistory,Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import clsx from 'clsx'


import LockOpenIcon from '@material-ui/icons/LockOpen';
import {makeStyles,Grid,Paper,Box,Grow,Container,TextField,CardMedia,FormHelperText,Snackbar, Typography,Button,FormControl,OutlinedInput,InputAdornment,InputLabel,IconButton} from '@material-ui/core'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MuiAlert from '@material-ui/lab/Alert'

import {signIn} from '../../actions/auth'
import {signUp} from '../../actions/auth'
import {sendResetEmail} from '../../actions/auth'
import { CLEAR_ALERT } from '../../constants/actions';
import accessImg from '../../images/undraw_Access_account.svg'
import loginImg from '../../images/undraw_secure_login.svg'
import Alert from '../Utils/Alert';


const initialState = {
    userName:'',email:'',confirmPassword:'',password:'',firstName:'',lastName:'',bio:''
}



const useStyles = makeStyles((theme)=>({
    formCont:{
        marginTop:"5em",
        width:"auto"
    },
    titlePaper:{
        display:"flex",
        flexDirection:"column",
        textAlign:"center",
        alignItems:"center",
        position:"relative",
        height:"auto",
        backgroundColor:theme.palette.primary.dark,
        padding:"0.5em 0 0.5em 0",
        color:"#ffc",
        fontWeight:600
    },
    title:{
        backgroundColor:theme.palette.primary.light,
        padding:"0.4em 0",
        color:"#334257"
    },
    paper:{
        display:"flex",
        flexDirection:"column",
        textAlign:"center",
        alignItems:"center",
        position:"relative",
        height:"auto",
        paddingBottom:"1em",
       
    },
    form:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        width:"70%",
        margin:"auto",
        "@media (max-width : 500px)": {
            width:"100%"
        },
    },
    formPaper:{
        padding:"0.3em",
        display:"flex",
        flexDirection:"column",
        gap:"0.7em"
    },
    signUpBtn:{
        "&:hover":{
            color:"white"
        }
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    ipFields:{
        flexGrow:1,
    },
    submitBtn:{
        width:"100%"
    }
}))

const LoginPage = ()=>{
    const classes = useStyles()
    const user = useSelector(state=>state.authData)
    const alert = useSelector(state=>state.alert)

    const [formData,setFormData] = useState(initialState)

    const [showPassword1,setshowPassword1] = useState(false);
    const [showPassword2,setshowPassword2] = useState(false);
    const [openDialog,setOpenDialog] = useState(false);
    const [resetEmail,setResetEmail] = useState("");

    // const authData = useSelector(state=>state.authData)
    const [loginToggle,setLoginToggle] = useState(true);
    
    const dispatch = useDispatch()
    const history = useHistory()

    // useEffect(() => {
    //     const token=JSON.parse(localStorage.getItem('quizToken'))
    //     if(token)
    //         history.push('/dashboard')
    // },[user])

    useEffect(()=>{
        if(alert){
            if(alert.type==="success"){
                setLoginToggle(true)
            }
        }
    },[alert])


    const handleSubmit = (e)=>{
        e.preventDefault()
        if(loginToggle)
            dispatch(signIn({email:formData.email,password:formData.password},history))
        else
            dispatch(signUp(formData,history))
        
        // setFormData({...formData,userName:'',email:'',confirmPassword:'',password:'',firstName:'',lastName:'',bio:''})

    }

    
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const toggleLoginButton = ()=>{
        setLoginToggle(prevState=>!prevState);
        setFormData({...formData,password:'',firstName:'',lastName:'',userName:'',bio:'',email:'',confirmPassword:''})
    }

    const handleClickShowPassword1 = ()=>{
        setshowPassword1(prevState=>!prevState)

    }

    const handleClickShowPassword2 = ()=>{
        setshowPassword2(prevState=>!prevState)
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleCloseDialog = ()=>{
        setOpenDialog(false);
    }

    const handleClickOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleResetEmail = ()=>{
        dispatch(sendResetEmail(resetEmail))
        setOpenDialog(false)
    }

    return (
        <Grow in>
            <Container className={classes.formCont}>
                <Alert/>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                                <Paper className={classes.titlePaper}>
                                    <Typography variant="h6" className={classes.tit}>
                                        Access Your Account Or Create One!
                                    </Typography>
                                </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            
                            <CardMedia
                                component="img"
                                alt="Enlighten"
                                image={accessImg}
                                />
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.formContainer}>
                            {/* <Paper color="primary" className={classes.formPaper}> */}
                                {
                                    loginToggle?(
                                        <Paper className={classes.title}>
                                            <Typography variant="h5" align="center">
                                                <LockOpenIcon/> Login To Access Your Account
                                            </Typography> 
                                        </Paper>
                                        
                                    ):(
                                        <Paper className={classes.title}>
                                            <Typography variant="h5" align="center">
                                                <i className="fa fa-user-plus"></i>  Register To Create a new Account
                                            </Typography> 
                                        </Paper>
                                                        
                                    )
                                }
                            <form
                                autoComplete="off"
                                noValidate
                                className={classes.form}
                                onSubmit={handleSubmit}
                            >
                            <Grid container spacing={2}>
                            {
                                !loginToggle?(
                                    <>
                                    
                                        <Grid item sm={6} xs={12} className={classes.ipFields}>
                                            <TextField
                                                name="firstName"
                                                type="text"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Enter Your first name"
                                                onChange={handleChange}
                                                value={formData.firstName}
                                                className={classes.inputField}
                                            />
                                        </Grid>
                                        <Grid item sm={6} xs={12} className={classes.ipFields}>
                                            <TextField
                                                name="lastName"
                                                type="text"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Enter Your last name"
                                                onChange={handleChange}
                                                value={formData.lastName}
                                                className={classes.inputField}
                                            />
                                        </Grid>
                                    </>
                                ):null
                            }
                            <Grid item sm={12}  className={classes.ipFields}>
                                <TextField
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    
                                    required
                                    fullWidth
                                    label="Enter Your Email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    className={classes.inputField}
                                /> 
                            </Grid>
                               
                            {
                                !loginToggle?(
                                    <>
                                    <Grid item sm={12} className={classes.ipFields}>
                                        <TextField
                                        name="userName"
                                        type="text"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="What would u like to be called?"
                                        onChange={handleChange}
                                        value={formData.userName}
                                        className={classes.inputField}
                                        />
                                    </Grid>
                                    <Grid item sm={12} className={classes.ipFields}>
                                        <TextField
                                        name="bio"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        label="Some intersting lines about you"
                                        onChange={handleChange}
                                        value={formData.bio}
                                        className={classes.inputField}
                                        />
                                    </Grid>
                                    </>
                                ):null
                            }
                            <Grid item sm={12} className={classes.ipFields}>
                                <FormControl required fullWidth className={clsx(classes.margin, classes.inputField)} variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        name="password"
                                        type={showPassword1 ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword1}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPassword1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={80}
                                    />
                                    <FormHelperText required  variant="outlined" children="Password must be atleast 6 characters"/>
                                </FormControl>
                            </Grid>
                            
                            {
                                !loginToggle?(
                                    <Grid item sm={12} className={classes.ipFields}>
                                        <FormControl required fullWidth className={clsx(classes.margin, classes.inputField)} variant="outlined">
                                        <InputLabel htmlFor="confirmPassword">Confirm Your Password</InputLabel>
                                        <OutlinedInput
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showPassword2 ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword2}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            labelWidth={170}
                                        />
                                    </FormControl>
                                    </Grid>
                                ):null
                            }    
                            <Grid item sm={12} className={classes.submitBtn}>
                                <Button
                                        variant="contained"
                                        type="submit"
                                        className={classes.button}
                                        color="primary"
                                >
                                    <Typography>Submit</Typography>
                                </Button>
                            </Grid>        
                        </Grid>
                            
                        </form>
                        {
                            loginToggle?(
                                <>
                                <Box fontWeight="400">
                                    <Button onClick={handleClickOpenDialog} variant="outlined" color="primary">
                                        Forgot password?
                                    </Button>
                                    <Dialog
                                    open={openDialog}
                                    fullWidth
                                    onClose={handleCloseDialog}
                                    aria-labelledby="dialog-title"
                                    >
                                        <DialogTitle id="dialog-title">Your account Email</DialogTitle>
                                        <DialogContent>
                                            <form
                                            autoComplete="off"
                                            noValidate
                                            >
                                                <Grid container spacing={2}>
                                                    <Grid item sm={12}>
                                                        <TextField
                                                            name="email"
                                                            type="email"
                                                            variant="outlined"
                                                            fullWidth
                                                            label="Enter Your email to reset password link"
                                                            onChange={(e)=>setResetEmail(e.target.value)}
                                                            value={resetEmail}
                                                            className={classes.inputField}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCloseDialog} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleResetEmail} color="primary">
                                                Send
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                                <Box fontWeight="fontWeightMedium" m={2}>
                                    <Typography variant="h6" >
                                        Don't have an Account? <Button color="primary" variant="contained" className={classes.signUpBtn} onClick={toggleLoginButton}>Create One</Button>
                                    </Typography>
                                </Box>
                                </>
                            ):(
                                <Box fontWeight="fontWeightMedium" m={2}>
                                    <Typography variant="h6" >
                                        Already have an Account? <Button color="primary" variant="contained" className={classes.signUpBtn} onClick={toggleLoginButton}>Sign In</Button>
                                    </Typography>
                                </Box>
                                
                            )
                        }         
                            {/* </Paper> */}
                        </Grid>
                    </Grid>
                      
                </Paper>
            </Container>
        </Grow>
        
    )
}

export default LoginPage