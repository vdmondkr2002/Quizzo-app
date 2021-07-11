import React from 'react'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { CardMedia, Radio, RadioGroup, FormControlLabel, Container, Grid, Snackbar, Avatar, withStyles, TextField, AppBar, Tabs, useTheme, Tab, makeStyles, Paper, Typography, Box, CircularProgress, rgbToHex, Button, IconButton } from '@material-ui/core'

import CircularProgressWithLabel from '../Utils/CircularProgressWithLabel'


const useStyles = makeStyles((theme) => ({

    firstPaper: {
        backgroundColor: "rgba(255,255,2,0.3)",
        padding: "0.7em"
    },
    firstPaperGrid: {
        textAlign: "center"
    },
    outerButton: {
        flexGrow: 1,
        padding: 0,
        width: "100%",
        display: "inline-block",
        height: "100%"
    },
    pointsAndquizes: {
        backgroundColor: "rgba(255,255,100,0.9)",
        padding: "0.7em"
    },
    points: {
        fontWeight: 700,
        lineHeight: "2em"
    },
    contrCont:{
        flexGrow:1
    }

}))
const UserDashboard = () => {
    const classes = useStyles()

    const user = useSelector(state => state.userData)

    return (
        <Grid container spacing={2}>
            <Grid item sm={12}>
                <Paper className={classes.firstPaper}>
                    <Grid container spacing={1}>
                        <Grid item sm={6} xs={12} className={classes.firstPaperGrid}>
                            <Button className={classes.outerButton}>
                                <Paper className={classes.pointsAndquizes}>
                                    <Typography style={{ fontWeight: "700" }}>Points Scored</Typography>
                                    <Typography color="primary" variant="h5" className={classes.points}>{user.totalScore}</Typography>
                                    <Typography variant="body2">points</Typography>
                                </Paper>
                            </Button>
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.firstPaperGrid}>
                            <Button className={classes.outerButton}>
                                <Paper className={classes.pointsAndquizes}>
                                    <Typography style={{ fontWeight: "700" }}>Quizes Taken</Typography>
                                    <Typography color="primary" variant="h5" className={classes.points}>{user.quizesTaken}</Typography>
                                    <Typography variant="body2">quizes</Typography>
                                </Paper>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item sm={12}>
                <Paper className={classes.firstPaper}>
                    <Grid container spacing={1}>
                        <Grid item sm={4} xs={12} className={classes.firstPaperGrid}>
                            <Button className={classes.outerButton}>
                                <Paper className={classes.pointsAndquizes}>
                                    <Typography style={{ fontWeight: "700" }}>Attempted</Typography>
                                    <Typography color="primary" variant="h5" className={classes.points}>{user.questionsAttempted}</Typography>
                                    <Typography variant="body2">questions</Typography>
                                </Paper>
                            </Button>
                        </Grid>
                        <Grid item sm={4} xs={12} className={classes.firstPaperGrid}>
                            <Button className={classes.outerButton}>
                                <Paper className={classes.pointsAndquizes}>
                                    <Typography style={{ fontWeight: "700" }}>Correctly Answered</Typography>
                                    <Typography style={{ color: "rgb(20,250,20)" }} variant="h5" className={classes.points}>{user.correctSolved}</Typography>
                                    <Typography variant="body2">questions</Typography>
                                </Paper>
                            </Button>
                        </Grid>
                        <Grid item sm={4} xs={12} className={classes.firstPaperGrid}>
                            <Button className={classes.outerButton}>
                                <Paper className={classes.pointsAndquizes}>
                                    <Typography style={{ fontWeight: "700" }}>Accuracy</Typography>
                                    <CircularProgressWithLabel noOfqs={100} style={{ color: "rgb(20,250,20)" }} value={user.questionsAttempted===0?0:Math.floor((user.correctSolved) / (user.questionsAttempted) * 100)} />
                                </Paper>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item sm={12} className={classes.contrCont}>
                <Button className={classes.outerButton}>
                    <Paper className={classes.firstPaper}>
                        <Typography style={{ fontWeight: "700" }}>Questions Contributed</Typography>
                        <Typography style={{ color: "rgb(200,100,80)" }} variant="h5" className={classes.points}>{user.questionsContributed}</Typography>
                        <Button component={RouterLink} to="/contributed" variant="contained">
                            View
                        </Button>
                    </Paper>
                </Button>
            </Grid>
        </Grid>
    )
}

export default UserDashboard
