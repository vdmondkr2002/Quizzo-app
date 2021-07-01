import React, { useState } from 'react'
import clsx from 'clsx'
import {Container,Paper,Typography,Button,Box,makeStyles,Grid,FormControl,InputLabel,OutlinedInput,FormHelperText,InputAdornment,IconButton} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../actions/auth';
import Alert from './Alert';
import { useHistory } from 'react-router-dom';

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
const initialState = {
    password:"",confirmPassword:""
}
const ResetPassword = ({match}) => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

    const [formData,setFormData] = useState(initialState)
    const [showPassword1,setshowPassword1] = useState(false);
    const [showPassword2,setshowPassword2] = useState(false);


    const code = match.params.code


    const handleClickShowPassword1 = ()=>{
        setshowPassword1(prevState=>!prevState)

    }

    const handleClickShowPassword2 = ()=>{
        setshowPassword2(prevState=>!prevState)
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };


    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(resetPassword({...formData,code:code},history))
    }

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    return (
        <Container className={classes.outerCont}>
            <Alert/>
            <Box marginTop="10%">
                <Paper className={classes.paperCont}>
                    <Typography variant="h5">Reset Password</Typography>
                    <form
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
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
                            <Grid item sm={12}>
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
                        </Grid>
                        <Button type="submit" variant="contained" color="primary">
                            Reset Password
                        </Button>
                    </form>
                    
                </Paper>
            </Box> 
        </Container>
    )
}

export default ResetPassword
