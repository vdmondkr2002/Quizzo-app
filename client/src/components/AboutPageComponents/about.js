import React from 'react'
import {Link} from 'react-router-dom'
import {makeStyles,Paper,Box,Grow,Divider,Grid,Container,TextField,FormHelperText,Snackbar,Typography,Button,FormControl,OutlinedInput,InputAdornment,InputLabel,IconButton, ThemeProvider} from '@material-ui/core'
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";

import laptopImg from '../../images/Nerd-amico.svg'
import takeQuizImg from '../../images/Questions-amico.svg'
import contributeImg from '../../images/Questions-cuate.svg'
import knowledgeImg from '../../images/Learning-rafiki.svg'
const useStyles = makeStyles((theme)=>({
    formCont:{
        marginTop:"5em",
        width:"auto",
        position:"relative"
    },
    paper:{
        display:"flex",
        flexDirection:"column",
        textAlign:"center",
        alignItems:"center",
        position:"relative",
        height:"auto",
        backgroundColor:"rgb(288,30,21)",
        padding:"0.5em 0 0.2em 0",
    },
    title:{
        display:"flex",
        alignItems:"center",
        fontWeight:"600",
        color:"white"
    },
    mainPaper:{
        padding:"2em",
        backgroundColor:"rgba(255,230,2,0.3)"
    },
    descCont:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start"
    },
    boldText:{
        fontWeight:600
    },
    middlePaper:{
        padding:"0.3em"
    },
    descPaper:{
        padding:"0.3em",
        backgroundColor:"rgba(255,230,2,0.3)",
        textAlign:"center"
    },
    link:{
        textDecoration:"none",
        marginTop:"0.2em"
    }
}))
const About=()=> {
    const classes = useStyles()
    return (
        <Container className={classes.formCont}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Box>
                            <Typography variant="h6" className={classes.title}>
                               About Us
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                        <Paper className={classes.mainPaper}>
                            <Grid container>
                                <Grid item sm={8} xs={12} className={classes.descCont}>
                                    <Typography variant="h2" className={classes.boldText}>
                                        Quizzo
                                    </Typography>
                                    <Typography variant="h5" color="textSecondary">
                                        A Fun Website where you can take quizzes, save your progress and even contribute questions
                                    </Typography>
                                    <Typography variant="h6" className={classes.boldText}>Developed By: Vedant Mondkar</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Typography variant="h6" className={classes.boldText}>Follow him On:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                <a
                                                    href="https://github.com/vdmondkr2002/"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    color="inherit"
                                                >
                                                    <GitHubIcon className={classes.Icon} />
                                                </a>
                                                </Grid>
                                                <Grid item>
                                                    <a rel="noreferrer"  href="https://www.linkedin.com/in/vedant-mondkar-9349451b3/" target="_blank" color="inherit">
                                                        <LinkedInIcon className={classes.Icon} />
                                                    </a>
                                                </Grid>
                                                <Grid item>
                                                <a
                                                    rel="noreferrer"
                                                    href="https://www.instagram.com/vd_mondkr56/"
                                                    target="_blank"
                                                    color="inherit"
                                                >
                                                    <InstagramIcon className={classes.Icon} />
                                                </a>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                   
                                    
                                    
                                    
                                    <a className={classes.link} target="_blank" rel="noreferrer" href="https://github.com/vdmondkr2002/Quizzo-app">
                                        <Button variant="outlined">Github link of Project</Button>
                                    </a>
                                    
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <img width="100%" src={laptopImg} alt="Laptop"/>
                                </Grid>
                            </Grid>
                        </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item sm={4} xs={12}>
                            <Paper className={classes.middlePaper}>
                                <img src={takeQuizImg} alt="takequiz"/>
                                <Box>
                                    <Paper className={classes.descPaper}>
                                        <Typography variant="h6">
                                            Take a Quiz based on Category
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Paper className={classes.middlePaper}>
                                <img src={contributeImg} alt="contribute questions"/>
                                <Box>
                                    <Paper className={classes.descPaper}>
                                        <Typography variant="h6">
                                            Contribute a question for quizzes
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Paper className={classes.middlePaper}>
                                <img src={knowledgeImg} alt="knowledge"/>
                                <Box>
                                    <Paper className={classes.descPaper}>
                                        <Typography variant="h6">
                                            Gain knowledge and build your profile
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}



export default About;
