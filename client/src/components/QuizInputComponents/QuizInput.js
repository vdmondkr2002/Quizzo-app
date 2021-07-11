import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Container, Grid, makeStyles, Paper, Box, FormControl, InputLabel, OutlinedInput, Typography, CardMedia, TextField, Button } from '@material-ui/core'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import clsx from 'clsx'
import thinkingImg from '../../images/man-1.jpg'

import { getCategoryQuizqs } from '../../actions/quizqs'
import { checkLoggedIn } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
    formCont: {
        marginTop: "5em",
        width: "auto"
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        position: "relative",
        height: "auto",
        backgroundColor: "rgb(288,30,21)",
        padding: "0.5em 0 0.5em 0",
    },
    title: {
        display: "flex",
        alignItems: "center",
        fontWeight: "600",
        color: "white"
    },
    outerPaper: {
        backgroundColor: theme.palette.primary.dark,
        padding: "1em"
    },
    formPaper: {
        // backgroundColor:theme.palette.primary.dark,
        backgroundColor: "#9F7FFD",
        padding: "1em"
    },
    questionsTitle: {
        color: theme.palette.primary.contrastText,
        fontSize: "2em",
        lineHeight: "1.2em",
        fontWeight: "600"
    },
    formContainer: {
        display: "flex",
        alignItems: "flex-start"
    },
    inputField: {
        color: '#fff'
    },
    MuiFocused: {
        color: "#fff"
    },
    instrTitle:{
        fontWeight: 600
    },
    instrPaper:{
        padding:"0.4em",
        color:"white",
        backgroundColor:"#9F7FFD"
    }
}))
const QuizInput = () => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [noOfqs, setNoofqs] = useState(0)

    // useEffect(()=>{
    //     dispatch(checkLoggedIn(history))
    // },[])


    return (
        <Container className={classes.formCont}>
            <Paper className={classes.outerPaper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Box>
                                <Typography variant="h6" className={classes.title}>
                                    Take a quiz which has mixture of questions on GK!
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <img src={thinkingImg} width="85%" alt="Thinking person"/>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.formContainer}>
                        <Paper color="primary" className={classes.formPaper}>
                            <form
                                autoComplete="off"
                                noValidate
                                className={classes.form}

                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.questionsTitle} variant="h6" component="h2">
                                            Enter the Number of questions with which you want to generate quiz
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl required fullWidth className={clsx(classes.margin, classes.inputField)} variant="outlined">
                                            <InputLabel className={classes.inputField} htmlFor="op4">Enter the Number of questions</InputLabel>
                                            <OutlinedInput
                                                type="number"
                                                id="op4"
                                                name="op4"
                                                value={noOfqs}
                                                onChange={e => setNoofqs(e.target.value)}
                                                labelWidth={230}
                                                className={classes.inputField}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button component={RouterLink} to={`/takequiz/random/${Number(noOfqs)}`} type="submit" color="primary" variant="contained">
                                            Take Quiz
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item sm={4}></Grid>
                    <Grid item xs={12} sm={8} className={classes.formContainer}>
                        <Paper className={classes.instrPaper}>
                            <Typography className={classes.instrTitle}>
                                Instructions For Quiz:
                            </Typography>
                            <ol>
                                <li>
                                    <Typography>
                                        Don't reload page, while you are attempting a quiz!
                                    </Typography>
                                </li>
                                <li>
                                    <Typography >
                                        The question is marked as done only when you click on the submit option for that button, simply marking question and clicking on next will not submit question
                                    </Typography>
                                </li>
                            </ol>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

        </Container>
    )
}

export default QuizInput
