import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getContrQs } from '../../actions/user'
import {Link, useHistory} from 'react-router-dom'
import { CardMedia, Container, Grid, Snackbar, withStyles, AppBar, Tabs, useTheme, Tab, makeStyles, Paper, Typography, Box, CircularProgress, rgbToHex, Button, IconButton } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import Radio from '@material-ui/core/Radio';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import contriImg from '../../images/questions-contri.svg'
import { checkLoggedIn } from '../../actions/auth'

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
        backgroundColor: "rgb(288,30,21)",
        padding: "0.5em 0 0.5em 0",
        color: "white",
        fontWeight: 600
    },
    totalQuestions: {
        display: "flex",
        backgroundColor: "rgba(255,255,2,0.3)",
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
        backgroundColor: "rgba(255,255,2,0.3)",
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
        backgroundColor: "rgba(255,255,2,0.3)",
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
    }
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


const Contributed = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const qs = useSelector(state => state.questionData)
    const userName = useSelector(state => state.authData.userName)

    const [page, setPage] = useState(1);
    const [questions, setQuestions] = useState([])
    const [noOfqs, setNoOfqs] = useState(0);

    // useEffect(()=>{
    //     dispatch(checkLoggedIn(history))
    // },[])

    useEffect(() => {
        console.log("Hello")
        dispatch(getContrQs())
    }, [])

    useEffect(() => {
        if (qs !== undefined) {
            setQuestions(qs);
            setNoOfqs(qs.length)
        }
    }, [qs])

    const handleChangePage = (event, value) => {
        setPage(value);

    };

    return (
        <Container className={classes.formCont}>
            <Paper className={classes.paper}>
                <Grid className={classes.parent} container spacing={2}>
                    <Grid item sm={12} className={classes.paperOuterGrid}>
                        <Paper className={classes.title}>
                            <Typography variant="h6">
                                {userName}'s Contributed Questions
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={4} className={classes.reportImgCont}>
                        <CardMedia
                            component="img"
                            alt="Create quiz"
                            image={contriImg}
                            title="Create quiz"
                            className={classes.cardImg}
                        />
                    </Grid>
                    <Grid item sm={8}>
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                <Paper className={classes.totalQuestions}>
                                    <Typography className={classes.totals}>Total Questions: {noOfqs}</Typography>
                                </Paper>

                            </Grid>
                            <Grid item sm={12}>
                                <Grid container spacing={2}>
                                    <Grid item sm={12}>
                                        {
                                            questions.length !== 0 ? (
                                                <Pagination className={classes.pagination} count={questions.length} page={page} onChange={handleChangePage} />
                                            ) : null
                                        }
                                    </Grid>
                                    <Grid item sm={12}>
                                        {
                                            questions.length !== 0 ? (
                                                <Paper className={classes.quizCont}>
                                                    <Grid className={classes.qInnerContainer} container spacing={2}>

                                                        <Grid item sm={12} className={classes.questionCont}>
                                                            <Typography variant="h6" className={classes.question}>
                                                                {questions[page - 1].question}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item sm={12}>

                                                            <Grid container spacing={2}>
                                                                {
                                                                    questions.length !== 0 ? (
                                                                        questions[page - 1].options.map((option) => (
                                                                            <Grid item sm={6} className={classes.optionInnerCont}>
                                                                                <Typography className={questions[page - 1].correct_answer === option ? classes.correctOpt : classes.options}>
                                                                                    {option}
                                                                                </Typography>
                                                                            </Grid>
                                                                        ))
                                                                    ) : null

                                                                }

                                                            </Grid>
                                                        </Grid>
                                                        <Grid item sm={12} className={classes.btnContainer}>
                                                            <Button onClick={() => setPage(prev => prev === 1 ? 1 : prev - 1)} color="primary" variant="contained">
                                                                Prev
                                                            </Button>

                                                            <Button onClick={() => setPage(prev => prev === Number(noOfqs) ? Number(noOfqs) : prev + 1)} color="primary" variant="contained">
                                                                Next
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            ) : (
                                                <Button color="primary" variant="contained" to="/createquestion" component={Link}>
                                                    Contriute a Question Now
                                                </Button>
                                            )
                                        }
                                    </Grid>
                                </Grid>

                            </Grid>


                        </Grid>


                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Contributed
