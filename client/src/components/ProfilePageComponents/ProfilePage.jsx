import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link as RouterLink, useHistory,useLocation } from 'react-router-dom'
import moment from 'moment'
import clsx from 'clsx'

import { Container, Grid,AppBar,Tabs,useTheme,Tab, makeStyles, Paper, Typography,Box} from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';

import {getUserData} from '../../actions/user'
import { getMonthlyReport, getReport} from '../../actions/reports'
import Alert from '../Utils/Alert'
import UserDashboard from './UserDashboard'
import PastQuizzes from './PastQuizzes'
import ReportCharts from './ReportCharts'
import ProfileSideBar from './ProfileSideBar'
import { checkLoggedIn} from '../../actions/auth.js'

const useStyles = makeStyles((theme)=>({
    mainCont:{
        marginTop:"5em",
        width:"auto"
    },
    paper:{
        padding:"1em",
        height:"auto"
        // position:"relative"
    },
    parent:{
        height:"100%",
    },
    title:{
        display:"flex",
        flexDirection:"column",
        textAlign:"center",
        alignItems:"center",
        position:"relative",
        height:"auto",
        backgroundColor:"rgb(288,30,21)",
        padding:"0.5em 0 0.5em 0",
        color:"white",
        fontWeight:600,
        textTransform:"uppercase"
    },
    mainProfile:{
        display:"flex"
    },
    sidebarPaper:{
        flexGrow:1,
        padding:"1em",
        backgroundColor:"rgba(255,255,100,0.3)"
    },
    sidebarInnerGrid:{
        height:"30em"
    },
    AvatarCont:{
        position:"relative"
    },
    largeAvatar:{
        margin:"auto",
        width:"150px",
        height:"150px"
    },
    camIcon:{
        padding:"8px"
    },
    label:{
        display:"flex",
        justifyContent:"center",
    },
    input: {
        display: 'none',
    },
    fullNameCont:{
        fontWeight:700,
        fontSize:"1.2em",
        textAlign:"center"
    },
    bioCont:{
        fontWeight:700,
        fontSize:"1.2em"
    },
    userNameCont:{
        color:"blue",
        fontWeight:600
    },
    editButtonCont:{
        textAlign:"center",
        margin:theme.spacing(1)
    },
    editButton:{
        borderColor:"black"
    },
    scoreBoardPaper:{
        backgroundColor:"rgba(255,255,2,0.1)",
        padding:"0.5em",
    },
    firstPaper:{
        backgroundColor:"rgba(255,255,2,0.3)",
        padding:"0.7em"
    },
    outerButton:{
        flexGrow:1,
        padding:0,
        width:"100%",
        display:"inline-block",
        height:"100%"
    },
    pointsAndquizes:{
        backgroundColor:"rgba(255,255,100,0.9)",
        padding:"0.7em"
    },
    firstPaperGrid:{
        textAlign:"center"
    },
    points:{
        fontWeight:700,
        lineHeight:"2em"
    },
    quizPaper:{
        backgroundColor:"rgba(255,255,100,0.9)",
        padding:"0.7em"
    },
    repDetails:{
        padding:"0.4em"
    },
    graphPaper:{
        padding:"0.5em",
        textAlign:"center"
    }
}))


const TabPanel = (props)=>{
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
            <div>{children}</div>
            </Box>
        )}
        </div>
    );
}

const initialState = {
    userName:'',email:'',firstName:'',lastName:'',bio:''
}

const ProfilePage = ()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const theme = useTheme()
    const location = useLocation()

    const user = useSelector(state=>state.userData)
    const topscorers = useSelector(state=>state.toppers)
    const topcontributors = useSelector(state=>state.contributors)

    const [tabValue,setTabValue] = useState(0)
    
    

    useEffect(()=>{
        if(localStorage.getItem('quizToken')){
            dispatch(getUserData())
            // dispatch(getTopScorers())
            dispatch(getReport())
            dispatch(getMonthlyReport())
        }
        
    },[dispatch,location])
   

    const a11yProps = (index)=>{
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }


    const handleChangeTabs = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setTabValue(index);
    };

   
    return (
        <Container className={classes.mainCont}>
            <Alert/>
            <Paper className={classes.paper}>
                <Grid className={classes.parent} container spacing={2}>
                    <Grid item sm={12} className={classes.paperOuterGrid}>
                        <Paper className={classes.title}>
                            <Typography variant="h6">
                                Hello, {user.userName}
                            </Typography>      
                        </Paper>
                    </Grid>
                    <Grid item sm={3} className={classes.mainProfile}>
                        <ProfileSideBar/>
                    </Grid>
                    <Grid item sm={9}>
                        <Paper className={classes.scoreBoardPaper}>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={tabValue}
                                    onChange={handleChangeTabs}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab style={{overflow:"visible"}} label="Dashboard" {...a11yProps(0)} />
                                    <Tab style={{overflow:"visible"}} label="Past Quizzes" {...a11yProps(1)} />
                                    <Tab style={{overflow:"visible"}} label="Quiz Stats" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={tabValue}
                                onChangeIndex={handleChangeIndex}
                                style={{overflow:"visible!important"}}
                            >
                                <TabPanel value={tabValue} index={0} dir={theme.direction}>
                                        <UserDashboard/>
                                </TabPanel>
                                <TabPanel value={tabValue} index={1} dir={theme.direction}>
                                    <PastQuizzes/>  
                                </TabPanel>
                                <TabPanel value={tabValue} index={2} dir={theme.direction}>
                                    <ReportCharts/>
                                </TabPanel>
                            </SwipeableViews>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default ProfilePage;