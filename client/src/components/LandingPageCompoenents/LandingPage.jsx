import React,{useEffect} from 'react'
import {Link as RouterLink,useHistory} from 'react-router-dom'

import {makeStyles,Paper,Grid,Button,CardMedia, Typography,useTheme} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import mainImage from '../../images/Quiz-image-1.jpg'
import computerQuiz from '../../images/computer-quiz.svg'
import contribute from '../../images/Questions-rafiki.svg'
import logo from '../../images/quizzo.jpg'

const useStyles = makeStyles((theme)=>({
    paper:{
        paddingTop:"4em",
        display:"flex",
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center",
        height:"100vw",
        // position:"relative",
    },
    bgImg:{
        paddingTop:"4em",
        textAlign:"center",
        // maxHeight:"100vh",
        backgroundImage: `url(${mainImage})`,
        backgroundSize: "cover",
        backgroundColor: "#777",
        backgroundBlendMode: "multiply",
        
    },
    // imageContainer:{
    //     // position:"relative",
    //     // position:"absolute",
    //     height:"100vh",
    //     width:"100%",
    //     filter:"brightness(70%)"
    // },
    loginButton:{
        // position:"relative",
        padding:"1em",
        color:"#334257",
        fontWeight:"500",
        "&:hover":{
            color:"#334257"
        }
    },
    innerPaperContainer:{
        display:"flex",
        justifyContent:"center"
    },
    innerGrid:{
        // position:"absolute",
        alignItems:"center"
    },
    innerPaper:{
        // position:"relative",
        height:"auto",
        width:"80%",
        padding:"1em",
        margin:"1em 0 1em 0",
        backgroundColor:"#BEDCFA"
        // filter:"brightness(100%)"
    },
    computerQuiz:{
        maxWidth:"100%"
    },
    logoImage:{
        maxWidth: "6rem"
    },
    line1:{
        color:"#334257",
        padding:"0.5em",
        fontWeight:"600"
    },
    line2:{
        color:"#476072",
        padding:"0.5em",
        fontWeight:"600"
    },
    carouselText:{
        color:"#334257",
        padding:"0.5em",
        fontWeight:"600"
    }
}))
const LandingPage = ()=>{
    const history = useHistory()
    const theme = useTheme()
    const classes = useStyles()

    useEffect(() => {
        const token=JSON.parse(localStorage.getItem('quizToken'))
        if(token)
            history.push('/dashboard')
    },[history])

    const images = [{image:computerQuiz,info:"Take quizzes on various categories"},{image:contribute,info:"Contribute Questions on various categories"}]
    return (
        <div className={classes.bgImg}> 
                    {/* <CardMedia
                        className={classes.imageContainer}
                        image={mainImage}
                        title="Contemplative Reptile"
                    /> */}
                    <Grid container className={classes.innerGrid}>
                        <Grid item sm={6} xs={12} className={classes.btnContainer}>
                            <Button component={RouterLink} to="/login" variant="contained" color="primary" className={classes.loginButton}>
                                Sign Up To Have Fun
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.innerPaperContainer}>                    
                            <Paper className={classes.innerPaper}>
                                <img src={logo} alt="logo" className={classes.logoImage}/>
                                <Typography variant="h5" className={classes.line1}>
                                    Your own destination for fun quizzes
                                </Typography>
                                <Typography variant="h6" className={classes.line2}>
                                    Unlocking knowledge at the speed of thought.
                                    Increase Your GK by taking quizzes on Categories.
                                </Typography>
                                <Carousel
                                indicators={false}
                                animation="fade"
                                autoPlay={true}
                                interval={3000}
                                navButtonsAlwaysInvisible={true}
                                >
                                            <div key={1}>
                                                <img src={images[0].image} height="400em" className={classes.computerQuiz} alt="quiz1"/>
                                                <Typography variant="h6" className={classes.carouselText}>
                                                    {images[0].info}
                                                </Typography>
                                            </div>
                                            <div key={2}>
                                                <img src={images[1].image} height="400em" className={classes.computerQuiz} alt="quiz2"/>
                                                <Typography variant="h6" className={classes.carouselText}>
                                                    {images[1].info}
                                                </Typography>
                                            </div>
                                    
                                </Carousel>
                                
                            </Paper>
                        </Grid>
                    </Grid>
        </div>
    )
}

export default LandingPage

