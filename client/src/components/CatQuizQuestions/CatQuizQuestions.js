import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';

import {Typography,Container,IconButton,Snackbar,Grid,Box,Paper,makeStyles,withStyles,CircularProgress, Button, CardMedia} from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import { green } from '@material-ui/core/colors';
import Pagination from '@material-ui/lab/Pagination';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import creativeThinkImg from '../../images/undraw_creative_thinking.svg'


import {getCategoryQuizqs, postQuizReport} from '../../actions/quizqs'
import {CLEAR_ALERT, MARK_DONE, SET_ALERT, UPDATE_ATTEMPT, UPDATE_SCORE, UPDATE_SELECTED, UPDATE_TIME} from '../../constants/actions'
import Alert from '../Utils/Alert'
import CircularProgressWithLabel from '../Utils/CircularProgressWithLabel';
import CircularProgressWithClockQuiz from '../Utils/CircularProgressWithClockQuiz';
import { checkLoggedIn } from '../../actions/auth';

const useStyles = makeStyles((theme)=>({
    formCont:{
        marginTop:"5em",
        width:"auto"
    },
    paper:{
        padding:"1em",
        height:"30em"
        // position:"relative"
    },
    paperOuterGrid:{
        display:"flex"
    },
    sidebarPaper:{
        flexGrow:1,
        padding:"1em",
        backgroundImage:"linear-gradient(180deg, rgb(108,99,255), rgb(102,37,131))"
    },
    sidebarInnerGrid:{
        height:"100%"
    },
    dashboardTitleCont:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"fit-content"
    },
    dashboardTitle:{
        padding:"0.5em",
        backgroundColor:theme.palette.primary.dark,
        borderRadius:"5px",
        fontWeight:"600",
        color:"white"
    },
    dashboardItems:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        flexGrow:"1"
    },
    circlePaper:{
        padding:"1em 2em",
        backgroundColor:"lightblue"
    },
    circleTitle:{
        fontWeight:"600",
        textAlign:"center"
    },
    cardImg:{
        width:"max-content",
        height:"max-content",
        bottom:0,
        left:0,
        zIndex:2
    },
    parent:{
        height:"100%",
    },
    quizCont:{
        height:"100%",
        display:"flex",
        alignItems:"flex-start",
        zIndex:1,
        padding:"1em"
    },
    question:{
        textAlign:"center",
        fontWeight:"600"
    },
    questionCont:{
        padding:"0.5em"
    },
    options:{
        textAlign:"center",
        padding:"0.5em 1em",
        width:"fit-content",
        backgroundColor:"rgba(255,255,2,0.3)",
        borderRadius:"10px",
        flexGrow:1
    },
    optionInnerCont:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    btnContainer:{
        display:"flex",
        justifyContent:"space-between"
    },
    btnContainer2:{
        display: "flex",
        justifyContent: "center",
        "@media (max-width : 500px)":{
            flexGrow:1
        }
    },
    qInnerContainer:{
        zIndex:3
    },
    checkIcon:{
        margin:"0.4em"
    },
    submittedColor:{
        backgroundColor:"green"
    },
    endQuizBtn:{
        width: "60%",
        marginTop: "1.5em",
        "@media (max-width : 500px)":{
            width:"100%"
        }
    },
    btn:{
        "@media (max-width : 500px)":{
            padding:"2px 5px !important",
            margin:"1px !important"
        }
    }
    // paper:{
    //     display:"flex",
    //     flexDirection:"column",
    //     textAlign:"center",
    //     alignItems:"center",
    //     position:"relative",
    //     height:"auto",
    //     backgroundColor:"rgb(288,30,21)",
    //     padding:"0.5em 0 0.5em 0",
    // }
}))



const OptionRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {
        icon: CheckCircleIcon
    },
  })((props) => <Radio color="default" {...props} />);



const CatQuizQuestions = ({match}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const quizqs = useSelector(state=>state.quizqs)

    const [progress,setProgress] = useState(0)
    const [selectedOption,setSelectedOption] = useState('');
    const [solved,setSolved] = useState(0)
    const [page,setPage] = useState(1);
    const [score,setScore] = useState(0);
    const [questions,setQuestions] = useState([])

   
    const noOfqs = match.params.noOfqs
    const category = match.params.cat
    console.log(noOfqs,category)
    
    // useEffect(()=>{
    //     dispatch(checkLoggedIn(history))
    // },[])

    useEffect(()=>{
        const timer = setInterval(()=>{
            setProgress(prevProgress=>(prevProgress+100/noOfqs/20))
        },1000)
        return ()=>{
            clearInterval(timer)
        }
    },[])

    useEffect(()=>{
        dispatch({type:UPDATE_TIME,payload:Math.round(progress*Number(noOfqs)*20/100)})
    },[progress])

  
    useEffect(()=>{
        if(progress>=100){
            dispatch({type:SET_ALERT,payload:{msg:"The time is up! Answers submitted!",type:"info"}})
            history.push('/score')
        }
    },[progress])

    useEffect(()=>{
        if(questions.length!==0)
            setSelectedOption(questions[page-1].selected_answer)
    },[page])

    useEffect(()=>{
        dispatch(getCategoryQuizqs(Number(noOfqs),category))
        console.log(questions)
    },[])

    useEffect(()=>{
        if(quizqs.data!==undefined)
            setQuestions(quizqs.data)
    },[quizqs])

    useEffect(()=>{
        dispatch({type:UPDATE_SCORE,payload:score})
    },[score])

  
    const handleClick = ()=>{
        setSolved(prev=>(prev>=noOfqs?0:prev+1))
        dispatch({type:MARK_DONE,payload:page-1})
        const attempted = quizqs.attempted;
        dispatch({type:UPDATE_ATTEMPT,payload:attempted+1});
        if(questions[page-1].correct_answer===selectedOption){
            setScore(prev=>prev+1)
        }
        // dispatch({type:UPDATE_SCORE,payload:score})
    }
    const handleSelectOption = (e)=>{
        setSelectedOption(e.target.value)
        const question = questions[page-1];
        question.selected_answer = e.target.value
        console.log(question)
        dispatch({type:UPDATE_SELECTED,payload:{id:page-1,question:question}})
    }

    const handleChangePage = (event, value) => {
        setPage(value);

    };


    const handleEndQuiz = ()=>{
        // history.push('/score')
        dispatch(postQuizReport(quizqs,history))
    }

    return (
        <Container className={classes.formCont}>
            <Alert/>
            <Box className={classes.box}>
                <Paper className={classes.paper}>                  
                    <Grid className={classes.parent} container spacing={2}>
                        <Grid item sm={3} xs={12} className={classes.paperOuterGrid}>
                            <Paper className={classes.sidebarPaper}>
                                <Grid container className={classes.sidebarInnerGrid} spacing={2}>
                                    <Grid item xs={12} className={classes.dashboardTitleCont}>
                                        <Typography className={classes.dashboardTitle}>Quiz Dashboard</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={classes.dashboardItems}>
                                        <Paper className={classes.circlePaper}>
                                            <Typography className={classes.circleTitle}>Solved</Typography>
                                            <CircularProgressWithLabel style={{color:"#52006A"}} noOfqs={Number(noOfqs)} value={solved*100/noOfqs}/>
                                        </Paper>
                                        
                                    </Grid>
                                    <Grid item xs={12} className={classes.dashboardItems}>
                                        <Paper className={classes.circlePaper}>
                                            <Typography className={classes.circleTitle}>Timer</Typography>
                                            <CircularProgressWithClockQuiz style={{color:"#52006A"}} noOfqs={Number(noOfqs)} value={progress}/>
                                        </Paper>
                                        
                                    </Grid>
                                </Grid>
                            </Paper>
                            
                        </Grid>
                        <Grid className={classes.qContainer} item sm={9} xs={12}>
                                    {/* <CardMedia 
                                        component="img"
                                        alt="Create quiz"
                                        image={creativeThinkImg}
                                        title="Create quiz"
                                        className={classes.cardImg}
                                    /> */}
                                    {
                                        questions.length!==0?(
                                            <Pagination count={questions.length} page={page} onChange={handleChangePage} />
                                        ):null
                                    }
                                    {
                                        questions.length!==0?(
                                            <Paper className={classes.quizCont}>
                                           <Grid className={classes.qInnerContainer} container spacing={2}>
                                            <Grid item xs={12} className={classes.questionCont}>
                                                <Typography variant="h6" className={classes.question}>
                                                    {questions[page-1].question}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                
                                                <Grid container spacing={2}>
                                                    {
                                                        questions[page-1].options.map((option)=>(
                                                            <Grid item sm={6} xs={12} className={classes.optionInnerCont}>
                                                                <OptionRadio
                                                                    disabled={questions[page-1].marked_done?true:false}
                                                                    checked={selectedOption===option}
                                                                    onChange={handleSelectOption}
                                                                    value={option}
                                                                    name="radio-button-demo"
                                                                    inputProps={{ 'aria-label': 'A' }}
                                                                    checkedIcon={<CheckCircleIcon/>}
                                                                />
                                                                
                                                                <Typography className={classes.options}>
                                                                {option}
                                                                </Typography>
                                                            </Grid>
                                                        ))
                                                    }
                                                    
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} className={classes.btnContainer}>
                                                <Button onClick={()=>setPage(prev=>prev===1?1:prev-1)} color="primary" variant="contained">
                                                    Prev
                                                </Button>
                                                {
                                                    questions[page-1].marked_done?(
                                                        <Button className={classes.submittedColor} variant="contained">
                                                            Submitted
                                                        </Button>
                                                    ):(
                                                        <Button color="primary" onClick={handleClick} variant="contained">
                                                            Submit Question
                                                        </Button>
                                                    )
                                                }
                                                
                                                <Button onClick={()=>setPage(prev=>prev===Number(noOfqs)?Number(noOfqs):prev+1)} color="primary" variant="contained">
                                                    Next
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} className={classes.btnContainer2}>
                                                <Button onClick={handleEndQuiz} className={classes.endQuizBtn} variant="contained" color="primary">
                                                    End Quiz
                                                </Button>
                                            </Grid>
                                        </Grid>
                                                     
                                        
                                        
                        
                                    </Paper>
                                        ):null
                                    }
                                    
                                
                               
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    )
}

export default CatQuizQuestions
