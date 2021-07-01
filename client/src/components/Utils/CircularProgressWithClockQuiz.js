import React from 'react'
import {Box,CircularProgress,Typography} from '@material-ui/core'
const CircularProgressWithClockQuiz = (props) => {
    const timeMinutes = Math.floor(Math.round(props.value*props.noOfqs*20/100)/60)
    const timeSeconds = Math.round(props.value*props.noOfqs*20/100)%60
    // console.log()
    return(
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" size={100} value={props.value}/>
            <Box position="absolute" top={0} left={0} bottom={0} right={0} display="flex" justifyContent="center" alignItems="center">
                <Typography color="textSecondary" component="div">
                   {timeMinutes<10?"0"+timeMinutes:timeMinutes}:{timeSeconds<10?"0"+timeSeconds:timeSeconds} 
                </Typography>
            </Box>
        </Box>
    )
}

export default CircularProgressWithClockQuiz
