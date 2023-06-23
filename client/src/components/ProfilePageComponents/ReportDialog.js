import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'


import { CardMedia, Container, Grid, Snackbar, withStyles, AppBar, Tabs, useTheme, Tab, makeStyles, Paper, Typography, Box, CircularProgress, rgbToHex, Button, IconButton } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Pagination from '@material-ui/lab/Pagination';
import Radio from '@material-ui/core/Radio';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SwipeableViews from 'react-swipeable-views';

import clsx from 'clsx'
import reportImg from '../../images/undraw_Report.svg'
import { getReportById } from '../../actions/reports'
import CircularProgressWithLabel from '../Utils/CircularProgressWithLabel'
import CircularProgressWithClockReport from '../Utils/CircularProgressWithClockReport'

const useStyles = makeStyles((theme) => ({
    formCont: {
        marginTop: "5em",
        width: "auto"
    },
    paper: {
        padding: "1em",
        height: "auto"
        // position:"relative"
    },
    parent: {
        height: "100%",
    },
    title: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        position: "relative",
        height: "auto",
        backgroundColor: theme.palette.primary.dark,
        padding: "0.5em 0 0.5em 0",
        color: "white",
        fontWeight: 600
    },
    totalQuestions: {
        display: "flex",
        backgroundColor: "#DBE6FD",
        padding: "0.5em",
        textAlign: "center",

        color: "rgba(0,80,200,0.6)",

    },
    totals: {
        fontWeight: 600,
        fontSize: "1.2em",
        flexGrow: 1
    },
    circleCont: {
        display: "flex"
    },
    outerButton: {
        flexGrow: 1,
        padding: 0
    },
    circlePaper: {
        backgroundColor: "#DBE6FD",
        textTransform: "uppercase",
        padding: "0.5em",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    circleTitle1: {
        color: "rgb(200,100,10)",
        fontWeight: 600
    },
    circleTitle2: {
        color: "rgb(20,250,20)",
        fontWeight: 600
    },
    circleTitle3: {
        color: "rgb(250,20,30)",
        fontWeight: 600
    },
    circleTitle4: {
        color: "rgb(20,50,230)",
        fontWeight: 600
    },
    summaryBox: {
        textAlign: "center"
    },
    quizCont: {
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        zIndex: 1,
        padding: "1em"
    },
    question: {
        textAlign: "center",
        fontWeight: "600"
    },
    questionCont: {
        padding: "0.5em"
    },
    options: {
        textAlign: "center",
        padding: "0.5em 1em",
        width: "fit-content",
        backgroundColor: "#DBE6FD",
        borderRadius: "10px",
        flexGrow: 1
    },
    correctAns: {
        color: "rgb(130,250,100)"
    },
    notAttempt: {
        color: "rgb(100,100,250)"
    },
    inCorrectAns: {
        color: "rgb(250,100,100)"
    },
    correctOpt: {
        textAlign: "center",
        padding: "0.5em 1em",
        width: "fit-content",
        backgroundColor: "rgba(100,250,50,0.3)",
        borderRadius: "10px",
        flexGrow: 1
    },
    optionInnerCont: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    pagination: {
        display: "flex",
        justifyContent: "center"
    },
    boxPadding:{
        "@media (max-width : 500px)":{
            padding:"0.2em",
        }
    }
}))



const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    const classes = useStyles()
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} className={classes.boxPadding}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

const parseInputString = (input)=>{
    const m = {}
    m['&nbsp;'] = " ";
    m['&quot;']='"';
    m["&amp;"] = "&";
    m["&gt;"] = ">";
    m["&lt;"] = "<";
    m["&apos;"] = "‘";
    m["&quot;"] = "“";
    m["&reg;"] = "®";
    m["&copy;"] = "©";
    m["&frasl;"] = "⁄";
    m["&#39;"] = "'"
    // Output string
    let output = "";
 
    // Traverse the string
    let i = 0;
    while (i < input.length) {
      // If any ampersand is occurred
      if (input[i] === '&') {
        let buffer = "";
 
        while (i < input.length) {
          buffer += input[i];
 
          // If any semicolon is occurred
          if (input[i] === ';' && m[buffer]) {
            // Append the parsed character
            output += m[buffer];
 
            // Clear the buffer
            buffer = "";
            i++;
            break;
          } else {
            i++;
          }
        }
 
        if (i >= input.length) {
          output += buffer;
          break;
        }
 
        i--;
      } else {
        output += input[i];
      }
 
      i++;
    }
 
    // Return the parsed string
    return output;
  }

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

const ReportDialog = ({ match }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const location = useLocation()
    const theme = useTheme();
    const quizqs = useSelector(state => state.quizqs)

    const qId = match.params.reportId

    const [questions, setQuestions] = useState([])
    const [noOfqs, setNoOfqs] = useState(0);
    const [page, setPage] = useState(1);
    const [noOfCorrect, setNoOfCorrect] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0)
    const [attempted, setAttempted] = useState(0)
    const [selectedOption, setSelectedOption] = useState('');
    const [tabValue, setTabValue] = useState(0)

    useEffect(() => {
        dispatch(getReportById(qId))
        
    }, [location])

    useEffect(() => {
        if (quizqs.questions) {
            setQuestions(quizqs.questions.map(q =>{
                return {...q,question:parseInputString(q.question)}
            }
            ))
            setNoOfqs(quizqs.questions.length)
            setNoOfCorrect(quizqs.questions.filter((item) => item.correct_answer === item.selected_answer).length)
            setTimeTaken(quizqs.time_taken)
            setAttempted(quizqs.attempted)
        }
        console.log(quizqs)
    }, [quizqs])

    useEffect(() => {
        if (questions.length !== 0)
            setSelectedOption(questions[page - 1].selected_answer)
    }, [questions])

    useEffect(() => {
        if (questions.length !== 0)
            setSelectedOption(questions[page - 1].selected_answer)
    }, [page])




    const handleChangePage = (event, value) => {
        setPage(value);

    };

    const handleChangeTabs = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setTabValue(index);
    };
    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    return (
        <Container className={classes.formCont}>
            <Paper className={classes.paper}>
                <Grid className={classes.parent} container spacing={2}>
                    <Grid item xs={12} className={classes.paperOuterGrid}>
                        <Paper className={classes.title}>
                            <Typography variant="h6">
                                Quiz Report
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={4} xs={12} className={classes.reportImgCont}>
                        <img width="100%" src={reportImg} alt="Quiz Report"/>
                        {/* <CardMedia
                            component="img"
                            alt="Create quiz"
                            image={reportImg}
                            title="Create quiz"
                            className={classes.cardImg}
                        /> */}
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Paper className={classes.totalQuestions}>
                                    <Typography className={classes.totals}>Total Questions: {noOfqs}</Typography>
                                    <Typography className={classes.totals}>Total Time: {Math.floor(noOfqs * 20 / 60) < 10 ? "0" + Math.floor(noOfqs * 20 / 60) : Math.floor(noOfqs * 20 / 60)}:{(noOfqs * 20) % 60 < 10 ? "0" + (noOfqs * 20) % 60 : (noOfqs * 20) % 60}</Typography>
                                </Paper>

                            </Grid>
                            <Grid item xs={12}>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={tabValue}
                                        onChange={handleChangeTabs}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab style={{ overflow: "visible" }} label="View Summary" {...a11yProps(0)} />
                                        <Tab style={{ overflow: "visible" }} label="View Full Report" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={tabValue}
                                    onChangeIndex={handleChangeIndex}
                                    style={{ overflow: "visible!important" }}
                                >
                                    <TabPanel value={tabValue} index={0} dir={theme.direction}>
                                        <Grid container spacing={2}>
                                            <Grid className={classes.circleCont} item sm={4} xs={12}>
                                                <Button className={classes.outerButton}>
                                                    <Paper className={classes.circlePaper}>
                                                        <Typography className={classes.circleTitle1}>Attempted: {attempted}</Typography>
                                                        <CircularProgressWithLabel style={{ color: "rgb(200,100,10)" }} noOfqs={Number(noOfqs)} value={Math.floor(attempted / noOfqs * 100)} />
                                                    </Paper>
                                                </Button>
                                            </Grid>
                                            <Grid className={classes.circleCont} item sm={4} xs={12}>
                                                <Button className={classes.outerButton}>
                                                    <Paper className={classes.circlePaper}>
                                                        <Typography className={classes.circleTitle2}>Correct: {noOfCorrect}</Typography>
                                                        <CircularProgressWithLabel style={{ color: "rgb(20,250,20)" }} noOfqs={Number(noOfqs)} value={Math.floor(noOfCorrect / noOfqs * 100)} />
                                                    </Paper>
                                                </Button>

                                            </Grid>
                                            <Grid className={classes.circleCont} item sm={4} xs={12}>
                                                <Button className={classes.outerButton}>
                                                    <Paper className={classes.circlePaper}>
                                                        <Typography className={classes.circleTitle3}>Incorrect: {attempted - noOfCorrect}</Typography>
                                                        <CircularProgressWithLabel style={{ color: "rgb(250,20,50)" }} noOfqs={Number(noOfqs)} value={Math.floor((attempted - noOfCorrect) / noOfqs * 100)} />
                                                    </Paper>
                                                </Button>
                                            </Grid>
                                            <Grid className={classes.circleCont} item sm={4} xs={12}>
                                                <Button className={classes.outerButton}>
                                                    <Paper className={classes.circlePaper}>
                                                        <Typography className={classes.circleTitle4}>Time taken: {Math.floor(Math.round(timeTaken) / 60) < 10 ? "0" + Math.floor(Math.round(timeTaken) / 60) : Math.floor(Math.round(timeTaken) / 60)}:{Math.round(timeTaken) % 60 < 10 ? "0" + Math.round(timeTaken) % 60 : Math.round(timeTaken) % 60}  mins</Typography>
                                                        <CircularProgressWithClockReport style={{ color: "rgb(20,50,230)" }} timeTaken={timeTaken} value={Math.floor(timeTaken / noOfqs / 20 * 100)} />
                                                    </Paper>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={tabValue} index={1} dir={theme.direction}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                {
                                                    questions.length !== 0 ? (
                                                        <Pagination className={classes.pagination} count={questions.length} page={page} onChange={handleChangePage} />
                                                    ) : null
                                                }
                                            </Grid>
                                            <Grid item xs={12}>
                                                {
                                                    questions.length !== 0 ? (
                                                        <Paper className={classes.quizCont}>
                                                            <Grid className={classes.qInnerContainer} container spacing={2}>
                                                                <Grid item xs={12} className={classes.questionCont}>

                                                                    {selectedOption === questions[page - 1].correct_answer && questions[page - 1].marked_done ? <Typography variant="h6" className={clsx(classes.question, classes.correctAns)}>Correct Answer</Typography> : null}
                                                                    {!questions[page - 1].marked_done ? <Typography variant="h6" className={clsx(classes.question, classes.notAttempt)}>Not attempted</Typography> : null}
                                                                    {selectedOption !== questions[page - 1].correct_answer && questions[page - 1].marked_done ? <Typography variant="h6" className={clsx(classes.question, classes.inCorrectAns)}>Inorrect Answer</Typography> : null}
                                                                </Grid>
                                                                <Grid item xs={12} className={classes.questionCont}>
                                                                    <Typography variant="h6" className={classes.question}>
                                                                        {questions[page - 1].question}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>

                                                                    <Grid container spacing={2}>
                                                                        {
                                                                            questions.length !== 0 ? (
                                                                                questions[page - 1].options.map((option) => (
                                                                                    <Grid item sm={6} xs={12} className={classes.optionInnerCont}>
                                                                                        <OptionRadio
                                                                                            disabled={true}
                                                                                            checked={(selectedOption === option) && (questions[page - 1].marked_done)}
                                                                                            value={option}
                                                                                            name="radio-button-demo"
                                                                                            inputProps={{ 'aria-label': 'A' }}
                                                                                            checkedIcon={<CheckCircleIcon />}
                                                                                        />
                                                                                        <Typography className={questions[page - 1].correct_answer === option ? classes.correctOpt : classes.options}>
                                                                                            {option}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                ))
                                                                            ) : null

                                                                        }

                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={12} className={classes.btnContainer}>
                                                                    <Button onClick={() => setPage(prev => prev === 1 ? 1 : prev - 1)} color="primary" variant="contained">
                                                                        Prev
                                                                    </Button>

                                                                    <Button onClick={() => setPage(prev => prev === Number(noOfqs) ? Number(noOfqs) : prev + 1)} color="primary" variant="contained">
                                                                        Next
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Paper>
                                                    ) : null
                                                }
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                </SwipeableViews>
                            </Grid>


                        </Grid>


                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default ReportDialog
