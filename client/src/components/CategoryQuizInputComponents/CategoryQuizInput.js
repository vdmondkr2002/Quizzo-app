import React,{useEffect, useState} from 'react'
import {Link as RouterLink, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {Container, Grid,makeStyles,Paper,Box,FormControl,InputLabel,OutlinedInput,Typography,CardMedia,TextField, Button} from '@material-ui/core'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import clsx from 'clsx'
import {catImgs} from './catImgs'
import { checkLoggedIn } from '../../actions/auth';


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
        backgroundColor:theme.palette.primary.dark,
        padding:"0.5em 0 0.5em 0",
    },
    title:{
        display:"flex",
        alignItems:"center",
        fontWeight:"600",
        color:"white"
    },
    outerPaper:{
        backgroundColor:"#E8F6EF",
        padding:"1em"
    },
    formPaper:{
        // backgroundColor:theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
        padding:"1em"
    },
    questionsTitle:{
        color:theme.palette.primary.contrastText,
        fontSize:"2em",
        lineHeight:"1.2em",
        fontWeight:"600"
    },
    formContainer:{
        display:"flex",
        alignItems:"center"
    },
    inputField: {
        color: '#0A1931'
    },
    MuiFocused: {
        color: "#0A1931"
    },
    instrTitle:{
        fontWeight: 600,
        fontSize: "1.3em"
    },
    instrPaper:{
        padding:"0.4em",
        backgroundColor:theme.palette.primary.main
    }
}))
const CategoryQuizInput = ({match}) => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

    const [noOfqs,setNoofqs] = useState(0)
    const [category,setCategory]=useState(match.params.cat)

    // useEffect(()=>{
    //     dispatch(checkLoggedIn(history))
    // },[])

    return (
        <Container className={classes.formCont}>
            <Paper className={classes.outerPaper}>
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper}>
                                <Box>
                                    <Typography variant="h6" className={classes.title}>
                                        <PlayCircleFilledWhiteIcon/> Take a quiz which has mixture of questions on GK!
                                    </Typography>
                                </Box>
                            </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <img src={catImgs[category]} width="85%"
                            alt="category"/>
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
                                                onChange={e=>setNoofqs(e.target.value)}
                                                labelWidth={230}
                                                className={classes.inputField}
                                            />
                                        </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button component={RouterLink}  to={`/takequiz/${category}/${Number(noOfqs)}`} type="submit" color="primary" variant="contained">
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

export default CategoryQuizInput
