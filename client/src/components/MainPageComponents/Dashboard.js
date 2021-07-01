import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import {Link as RouterLink,useHistory} from 'react-router-dom'
import clsx from 'clsx'

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import {AddCircleOutline} from '@material-ui/icons';
import {makeStyles,Paper,Box,Grow,Divider,Grid,Container,TextField,FormHelperText,Snackbar,Typography,Button,FormControl,OutlinedInput,InputAdornment,InputLabel,IconButton, ThemeProvider} from '@material-ui/core'
import {Card,CardActionArea,CardActions,CardContent,CardMedia} from '@material-ui/core'

import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";

import {catData,catDesc,cats} from './catData'
import {checkLoggedIn} from '../../actions/auth'
import takeQuizImg from '../../images/Questions-amico.svg'
import contributeImg from '../../images/Questions-cuate.svg'
import knowledgeImg from '../../images/Devices-cuate.svg'
import activeOpImg from '../../images/undraw_active_options.svg'
import laptopImg from '../../images/Nerd-amico.svg'
import Alert from '../Utils/Alert'

const useStyles = makeStyles((theme)=>({
    formCont:{
        marginTop:"5em",
        width:"auto"
    },
    paper:{
        display:"flex",
        flexDirection:"column",
        textAlign:"center",
        alignItems:"center",
        position:"relative",
        height:"auto",
        backgroundColor:"rgb(288,30,21)",
        padding:"0.5em 0 0.5em 0",
    },
    form:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        width:"70%"
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
    inputField:{
        marginBottom:"0.7em"
    },
    margin: {
        margin: theme.spacing(1),
    },
    title:{
        display:"flex",
        alignItems:"center",
        fontWeight:"600",
        color:"white"
    },
    cardCont:{
        marginRight:"0!important"
    },
    flexCenter:{
        justifyContent:"center",
        alignItems:"flex-start"
    },
    cardImg:{
        padding:"0.5em",
        width:"100%",
        height:"100%"
    },
    card:{
        // maxWidth: 350,
        // height:"500px",
        width:"100%",
        backgroundColor:"rgba(255,230,2,0.2)"
    },
    linkButton:{
        "&:hover":{
            color:"white"
        }
    },
    appName:{
        fontWeight:600
    },
    descCont:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start"
    },
    mainPaper:{
        padding:"2em",
        backgroundColor:"rgba(255,230,2,0.3)"
    },
    takeQuizMain:{
        padding:"0.7em 1em",
        marginTop:"1em"
    },
    cardAction:{
        display:"flex",
        justifyContent:"center"
    },
    takeQuizCard:{
        padding:"0.5em 1em"
    },
    cardImage:{
        maxHeight:"300px"
    },
    cardImgCont:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    }
}))

const Dashboard = ()=>{
    const classes =useStyles()
    const history = useHistory()
    const dispatch = useDispatch();


    // useEffect(()=>{
    //     dispatch(checkLoggedIn(history))
    // },[])

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 3,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 460 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 460, min: 0 },
          items: 1,
        },
    };



    return (
            
            <Container className={classes.formCont}>
                <Alert/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Box>
                                <Typography variant="h6" className={classes.title}>
                                    <PlayCircleFilledWhiteIcon/> Start Your Fun Quizzes Now!
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.mainPaper}>
                            <Grid container spacing={2}>
                                <Grid item sm={8} className={classes.descCont}>
                                    <Typography variant="h2" className={classes.appName}>
                                        Quizzo
                                    </Typography>
                                    <Typography variant="h5" color="textSecondary">
                                        A Fun Website where you can take quizzes, save your progress and even contribute questions
                                    </Typography>
                                    <Button  endIcon={<PlayArrowIcon/>} className={clsx(classes.linkButton,classes.takeQuizMain)} component={RouterLink} to={`/takequiz/input/random/`} variant="contained" color="primary">
                                        Take a Quiz
                                    </Button>
                                </Grid>
                                <Grid item sm={4}>
                                    <img width="400px" src={laptopImg} alt="Laptop"/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    {/* <Grid item xs={12} sm={4}>
                        <CardMedia
                        component="img"
                        alt="Enlighten"
                        image={knowledgeImg}

                        />
                        <CardMedia
                        component="img"
                        alt="Enlighten"
                        image={activeOpImg}

                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Grid container spacing={2} className={classes.flexCenter} >
                            <Grid item xs={12} sm={6} className={classes.cardCont} >
                                <Paper>
                                    <Card className={classes.card}>
                                        <CardActionArea className={classes.cardImgCont}>
                                            <img className={classes.cardImage} src={takeQuizImg} alt="Take a quiz"/>
                                            {/* <CardMedia 
                                            component="img"
                                            alt="Create quiz"
                                            
                                            image={takeQuizImg}
                                            title="Create quiz"
                                            className={classes.cardImg}
                                            /> */}
                                            <CardContent>
                                                <Typography color="textSecondary" style={{textAlign:"center"}} gutterBottom variant="h6">
                                                    Want to take a quiz based on random topics and compete with others?
                                                </Typography>
                                            </CardContent>
                                            
                                        </CardActionArea>
                                        <CardActions className={classes.cardAction}>
                                            <Button  endIcon={<PlayArrowIcon/>} className={clsx(classes.linkButton,classes.takeQuizCard)} component={RouterLink} to={`/takequiz/input/random/`} variant="contained" color="primary">
                                                Take a Quiz
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.cardCont}>
                                <Paper>
                                    <Card className={classes.card}>
                                        <CardActionArea className={classes.cardImgCont}>
                                            <img height="300px"  src={contributeImg} alt="Take a quiz"/>
                                            {/* <CardMedia 
                                            component="img"
                                            alt="Create quiz"
                                            height="250"
                                            image={contributeImg}
                                            title="Contribute Question"
                                            className={classes.cardImg}
                                            /> */}
                                            <CardContent>
                                                <Typography color="textSecondary" style={{textAlign:"center"}} gutterBottom variant="h6">
                                                    Contribute a question on your desired category to enrich the quizzes
                                                </Typography>
                                            </CardContent>
                                            
                                        </CardActionArea>
                                        <CardActions className={classes.cardAction}>
                                            <Button endIcon={<AddCircleOutline/>} className={clsx(classes.linkButton,classes.takeQuizCard)} component={RouterLink} to="/createquestion" variant="contained" color="primary">
                                                Contribute a question
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                    <Typography color="textSecondary" style={{fontWeight:"bold"}} variant="h4" component="h2">
                        Popular Categories
                    </Typography>
                    <Divider></Divider>
                    <Carousel
                        responsive={responsive}
                        arrows={false}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={6000}
                    >
                            {
                                cats.map((category)=>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia 
                                            component="img"
                                            alt="Create quiz"
                                            
                                            image={catData[category.category]}
                                            title="Create quiz"
                                            className={classes.cardImg}
                                            />
                                            <CardContent>
                                                <Typography color="textSecondary" style={{textAlign:"center",fontWeight:"bold"}} gutterBottom variant="h6">
                                                    {category.category}
                                                </Typography>
                                                <Typography color="textSecondary" style={{textAlign:"center"}} gutterBottom variant="body2">
                                                    {catDesc[category.category]}
                                                </Typography>
                                            </CardContent>
                                            
                                        </CardActionArea>
                                        <CardActions>
                                            <Button endIcon={<PlayArrowIcon/>}  className={classes.linkButton} component={RouterLink} to={`/takequiz/input/${category.category}`} fullWidth variant="contained" color="primary">
                                                Take a Quiz
                                            </Button>
                                        </CardActions>
                                    </Card>
                                )
                            }
                        </Carousel>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.card}>
                        <img src={knowledgeImg} alt="Category wise"/>
                    </Grid>
                    
                    
                    
                </Grid>
                   
                    
                
            </Container>
    )
}
export default Dashboard;