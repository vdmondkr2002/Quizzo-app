import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'


import { Grid, Button, Paper, Typography, makeStyles } from '@material-ui/core'
import { getReport } from '../../actions/reports'


const useStyles = makeStyles(() => ({
    outerButton: {
        flexGrow: 1,
        padding: 0,
        width: "100%",
        display: "inline-block",
        height: "100%"
    },
    quizPaper: {
        backgroundColor: "rgba(255,255,100,0.9)",
        padding: "0.7em"
    },
    repDetails: {
        padding: "0.4em"
    },
}))

const PastQuizzes = () => {
    const classes = useStyles()
    const reports = useSelector(state => state.reports)

    useEffect(() => {
        getReport()
    }, [])

    return (
        <>
            {
                reports.length !== 0 ? (
                    <Grid container spacing={2}>
                        {reports.map((report, index) => (
                            <Grid key={index} item sm={12}>
                                <Button className={classes.outerButton}>
                                    <Paper className={classes.quizPaper}>
                                        <Grid container spacing={1}>
                                            <Grid item sm={6}>
                                                <Typography style={{ textAlign: "left" }} className={classes.repDetails}>Quiz taken: {moment(report.createdAt).fromNow()}</Typography>
                                            </Grid>
                                            <Grid item sm={6}><Typography style={{ textAlign: "right" }} className={classes.repDetails}>Category: {report.category ? report.category : "Random"}</Typography></Grid>
                                            <Grid item sm={6}><Typography style={{ textAlign: "left" }} className={classes.repDetails}>Total Questions: {report.questions.length}</Typography></Grid>
                                            <Grid item sm={6}><Typography style={{ textAlign: "right" }} className={classes.repDetails}>Score: {report.score}</Typography></Grid>
                                            <Grid item sm={12}>
                                                <Button component={Link} to={`/report/${report._id}`} variant="contained" fullWidth color="primary">
                                                    See full report
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Button>

                            </Grid>
                        ))}
                    </Grid>
                ) : (
                <Typography>
                    No quizzes Attempted Yet
                </Typography>
                    )
            }
        </>
    )
}

export default PastQuizzes
