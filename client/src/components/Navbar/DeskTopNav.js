import React,{useState,useEffect } from 'react'

/*react-modules */
import {Link as RouterLink,useHistory} from 'react-router-dom'
import { useDispatch ,useSelector} from "react-redux";
import { useLocation } from "react-router-dom";
/*Material UI */
import {Link,Toolbar,Button,Menu,MenuItem,Avatar,Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

/*components and constants */
import logo from '../../images/quizzo.jpg'
import {logOut} from '../../actions/auth'



const useStyles = makeStyles((theme)=>({
    logo:{
        maxWidth: "5em",
        transition:"500ms",
        "&:hover":{
          transform:"scale(1.1)"
        }
    },
    root:{
        flexGrow:1,
        justifyContent:"space-between"
    },
    menuButton:{
        marginRight: theme.spacing(2),
        "&:hover":{
            color:"white"
        }
        // color:"white !important"
    },
    home:{
        marginLeft:"auto"
    },
    about:{
        marginRight:"auto"
    },
    middle:{
        marginLeft:"auto"
    },
    menuitemText:{
        fontWeight:"500",
        fontSize:"1.1rem"
    },
    name:{
        marginLeft:"auto",
        textTransform:"uppercase",
        padding:"0.5em"
    }
    
}))
const DeskTopNav = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const navUser = useSelector(state=>state.user)
    const [anchorEl,setAnchorEl] = useState(null);
    const user = useSelector(state=>state.authData)


    const logout = () => {
        dispatch(logOut(history))
    };
    
    const handleClickAvatar = (e)=>{
        setAnchorEl(e.currentTarget)
    }
    
    const handleAvatarMenuClose = ()=>{
        setAnchorEl(null)
    }

      
    return (
        <>
            <Toolbar className={classes.root}>
                <Link href="#" color="inherit">
                    <img src={logo} className={classes.logo} alt="Logo"/>
                </Link>
                <div className={classes.middle}>
                    <Button component={RouterLink} to="/" color="inherit" className={classes.home}>
                        Home
                    </Button>
                    <Button component={RouterLink} color="inherit" to="/about" className={classes.about}>
                        About
                    </Button>
                </div>
                {
                user._id?(
                    <>
                        
                        <Typography variant="h6" className={classes.name}>
                            {user.userName} 
                        </Typography>
                        {/* specify the id of menu in the aria-controls */}
                        <Button 
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClickAvatar}
                        >
                            <Avatar src={user?.profilePic} alt={user?.userName}>
                            {user?.firstName?.charAt(0)} {user?.lastName?.charAt(0)}
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
                            <Button color="inherit" className={classes.menuButton} onClick={logout}>
                                <Typography variant="h6" className={classes.menuitemText}>
                                    Logout
                                </Typography>
                            </Button>
                            </MenuItem>
                        </Menu>
                    </>
                ):(
                    <>
                    <Button component={RouterLink} to="/login" color="inherit" className={classes.name}>
                        Sign Up/Login
                    </Button>
                    </>
                )
        }
            </Toolbar>
        </>
    )
}

export default DeskTopNav
