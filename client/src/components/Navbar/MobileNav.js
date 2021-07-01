import React,{useState,useEffect} from 'react'


import {Link as RouterLink,useHistory, useLocation} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";

import {Link,Toolbar,Button,Menu,MenuItem,Avatar,Typography,IconButton,Drawer} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {makeStyles} from '@material-ui/core/styles'


import logo from '../../images/quizzo.jpg'
import {logOut} from '../../actions/auth'


const useStyles = makeStyles((theme)=>({
    menuButton:{
        marginRight: theme.spacing(2),
        // color:"white !important"
    },
    logoCont:{
        marginRight:"auto"
    },
    drawerContainer:{
        padding:"0.6em",
        backgroundColor:"rgb(63,81,181)",
        margin:"0.5em",
        fontWeight:"500",
        borderRadius:"0.7em",
        flexGrow:1
    },
    logo:{
        maxWidth: "4em",
        transition:"500ms",
        "&:hover":{
          transform:"scale(1.1)"
        }
    },
    AvatarButton:{
        position:"static",
        marginLeft:"auto",
    },
    menuitemText:{
        fontWeight:"500",
        fontSize:"1rem"
    }
}))
const MobileNav = ({mobileDrawer,setMobileDrawer}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl,setAnchorEl] = useState(null);
    const user = useSelector(state=>state.authData)





    const logout = () => {
        dispatch(logOut(history))
    };
    
    

    const handleDrawerOpen = ()=>{
        setMobileDrawer((prevState)=>({...prevState,drawerOpen:true}))
    }

    const handleDrawerClose = ()=>{
        setMobileDrawer((prevState)=>({...prevState,drawerOpen:false}))
    }

    const handleClickAvatar = (e)=>{
        setAnchorEl(e.currentTarget)
    }
    
    const handleAvatarMenuClose = ()=>{
        setAnchorEl(null)
    }


    return (
        <>
            <Toolbar>
                <IconButton aria-label="menu" aria-haspopup={true} onClick={handleDrawerOpen} edge="start" className={classes.menuButton} color="inherit">
                    <MenuIcon />
                </IconButton>
                <Drawer
                anchor="left"
                open={mobileDrawer.drawerOpen}
                onClose={handleDrawerClose}
                >
                    <div className={classes.drawerContainer}>
                        <Link
                        to="/"
                        component={RouterLink}
                        color="white"
                        key="Home"
                        className={classes.menuButton}
                        >
                            <MenuItem>Home</MenuItem>    
                        </Link>
                        <Link
                        to="/about"
                        component={RouterLink}
                        color="white"
                        key="About us"
                        className={classes.menuButton}
                        >
                            <MenuItem>About Us</MenuItem> 
                        </Link>
                    </div>
                </Drawer>
                <Link href="#" color="inherit" className={classes.logoCont}>
                    <img src={logo} className={classes.logo} alt="Logo"/>
                </Link>
                {
                user._id?(
                    <>
                        {/* specify the id of menu in the aria-controls */}
                        <Button 
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClickAvatar}
                       
                        >
                            <Avatar src={user.profilePic} alt={user.firstName}>
                            {user.firstName.charAt(0)} {user.lastName.charAt(0)}
                            </Avatar>
                        </Button>
                        <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleAvatarMenuClose}
                        >
                            <MenuItem onClick={handleAvatarMenuClose}>
                            <Button component={RouterLink} color="inherit" to="/profile" className={classes.menuButton}>
                                <Typography variant="h6" className={classes.menuitemText}>
                                    Profile
                                </Typography>
                                
                            </Button>
                            </MenuItem>
                            <MenuItem onClick={handleAvatarMenuClose}>
                            <Button component={RouterLink} color="inherit" to="/auth" className={classes.menuButton} onClick={logout}>
                                <Typography variant="h6" className={classes.menuitemText}>
                                    Logout
                                </Typography>
                            </Button>
                            </MenuItem>
                        </Menu>
                    </>
                ):(
                    <>
                    <Button component={RouterLink} to="/login" color="inherit" className={classes.menuButton}>
                        Sign Up/Login
                    </Button>
                    </>
                )
        }
            </Toolbar>
            
        </>
    )
}

export default MobileNav
