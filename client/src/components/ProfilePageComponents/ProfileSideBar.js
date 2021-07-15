import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import Compress from 'compress.js'


import { CardMedia, Radio, RadioGroup, FormControlLabel, Container, Grid, Snackbar,FormHelperText, Avatar, withStyles,FormControl,InputLabel,InputAdornment, TextField,OutlinedInput, AppBar, Tabs, useTheme, Tab, makeStyles, Paper, Typography, Box, CircularProgress, rgbToHex, Button, IconButton } from '@material-ui/core'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


import { setProfilePic, editProfile,editPassword } from '../../actions/user'
import Alert from '../Utils/Alert'


const useStyles = makeStyles((theme) => ({
    sidebarPaper: {
        flexGrow: 1,
        padding: "1em",
        backgroundColor: "#E8F6EF"
    },
    sidebarInnerGrid: {
        height: "30em"
    },
    largeAvatar: {
        margin: "auto",
        width: "150px",
        height: "150px"
    },
    centering:{
        margin:"auto"
    },
    camIcon: {
        padding: "8px"
    },
    label: {
        display: "flex",
        justifyContent: "center",
    },
    input: {
        display: 'none',
    },
    fullNameCont: {
        fontWeight: 700,
        fontSize: "1.2em",
        textAlign: "center"
    },
    bioCont: {
        fontWeight: 700,
        fontSize: "1.2em",
        
    },
    userNameCont: {
        color: "blue",
        fontWeight: 600,
        textAlign:"center"
    },
    editButtonCont: {
        textAlign: "center"
    },
    editButton: {
        borderColor: "black"
    },
}))

const initialState = {
    userName: '', email: '', firstName: '', lastName: '', bio: ''
}

const initialState2 = {
    password:'',confirmPassword:''
}


const ProfileSideBar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.userData)

    const [openDialog, setOpenDialog] = useState(false)
    const [openDialog2,setOpenDialog2] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [passData, setPassData] = useState(initialState2)
    const [showPassword1,setshowPassword1] = useState(false);
    const [showPassword2,setshowPassword2] = useState(false);

    useEffect(() => {
        if (openDialog) {
            setFormData({ ...formData, userName: user.userName, firstName: user.firstName, lastName: user.lastName, email: user.email, bio: user.bio })
        }
    }, [openDialog])


    const compress = new Compress()
    const uploadImgClick = async (e) => {
        const files = [...e.target.files];
        const imageData = await compress.compress(files, {
            quality: 0.5
        })
        const imageFile = imageData[0].prefix + imageData[0].data;
        dispatch(setProfilePic(imageFile));
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


    const handleClickOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleClickOpenDialog2 = () => {
        setOpenDialog2(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleCloseDialog2 = () => {
        setOpenDialog2(false)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleChange2 = (e)=>{
        setPassData({...passData,[e.target.name]:e.target.value})
    }
    const handleEdit = () => {
        dispatch(editProfile(formData))
        setOpenDialog(false)
    }

    const resetPassword = ()=>{
        dispatch(editPassword(passData))
        setOpenDialog2(false)
    }

    return (
        <Paper className={classes.sidebarPaper}>
            
            <Grid container className={classes.sidebarInnerGrid} spacing={1}>
                <Grid item xs={12} className={classes.centering}>
                    <Avatar src={user?.profilePic} className={clsx(classes.largeAvatar)} alt={user?.userName}>
                        {user?.firstName?.charAt(0)} {user?.lastName?.charAt(0)}

                    </Avatar>
                    <input accept="image/*" onChange={uploadImgClick} className={classes.input} id="icon-button-file" type="file" />
                    <label className={classes.label} htmlFor="icon-button-file">
                        <IconButton component="span" className={classes.camIcon} >
                            <PhotoCamera fontSize="large" />
                            {/* <CameraAltIcon fontSize="large"/> */}
                        </IconButton>
                    </label>
                    {/* <IconButton component="span" className={classes.camIcon} >
                                        <PhotoCamera fontSize="large"/>
                                        {/* <CameraAltIcon fontSize="large"/> 
                                    </IconButton> */}

                </Grid>
                <Grid item xs={12} className={clsx(classes.fullNameCont,classes.centering)}>
                    <Typography variant="body1">
                        {user.firstName} {user.lastName}
                    </Typography>
                </Grid>
                <Grid item xs={12} className={clsx(classes.userNameCont,classes.centering)}>

                    <Typography variant="body1">
                        @{user.userName}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" className={classes.bioCont}>
                        Bio
                    </Typography>
                    <Typography variant="body2">
                        {user.bio}
                    </Typography>
                </Grid>
                <Grid item xs={12} className={clsx(classes.editButtonCont,classes.centering)}>
                    <Button onClick={handleClickOpenDialog} variant="outlined" endIcon={<EditIcon />}>
                        Edit Profile
                    </Button>
                    <Dialog
                        fullWidth
                        open={openDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="dialog-title"
                    >
                        <DialogTitle id="dialog-title">Edit Your Profile Info</DialogTitle>
                        <DialogContent>
                            {/* <Grid item xs={12} sm={8} className={classes.formContainer}>
                                                <Paper color="primary" className={classes.formPaper}> */}
                            <form
                                autoComplete="off"
                                noValidate
                                className={classes.form}
                            >
                                <Grid container spacing={2}>
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            name="firstName"
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            label="Edit Your first name"
                                            onChange={handleChange}
                                            value={formData.firstName}
                                            className={classes.inputField}
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            name="lastName"
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            label="Edit Your last name"
                                            onChange={handleChange}
                                            value={formData.lastName}
                                            className={classes.inputField}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="userName"
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            label="Edit Your username"
                                            onChange={handleChange}
                                            value={formData.userName}
                                            className={classes.inputField}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="email"
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            label="Edit email associated with account"
                                            onChange={handleChange}
                                            value={formData.email}
                                            className={classes.inputField}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="bio"
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            label="Want to Change your bio"
                                            onChange={handleChange}
                                            value={formData.bio}
                                            className={classes.inputField}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                            {/* </Paper>
                                            </Grid> */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleEdit} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <Grid item className={classes.centering}>
                    <Button onClick={handleClickOpenDialog2} variant="outlined"  endIcon={<VpnKeyIcon />} >
                        Change Password
                    </Button>
                    <Dialog
                        fullWidth
                        open={openDialog2}
                        onClose={handleCloseDialog2}
                        aria-labelledby="dialog-title"
                    >
                        <DialogTitle id="dialog-title">Change Your Password</DialogTitle>
                        <DialogContent>
                            {/* <Grid item xs={12} sm={8} className={classes.formContainer}>
                                                <Paper color="primary" className={classes.formPaper}> */}
                            <form
                                autoComplete="off"
                                noValidate
                                className={classes.form}
                            >
                                <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl required fullWidth className={clsx(classes.margin, classes.inputField)} variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        name="password"
                                        type={showPassword1 ? 'text' : 'password'}
                                        value={passData.password}
                                        onChange={handleChange2}
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
                            <Grid item xs={12}>
                                    <FormControl required fullWidth className={clsx(classes.margin, classes.inputField)} variant="outlined">
                                        <InputLabel htmlFor="confirmPassword">Confirm Your Password</InputLabel>
                                        <OutlinedInput
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showPassword2 ? 'text' : 'password'}
                                            value={passData.confirmPassword}
                                            onChange={handleChange2}
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
                            </form>
                            {/* </Paper>
                                            </Grid> */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog2} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={resetPassword} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ProfileSideBar
