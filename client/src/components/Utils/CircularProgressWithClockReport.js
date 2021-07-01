import React from 'react'
import {Box,CircularProgress,Typography} from '@material-ui/core'

const CircularProgressWithClockReport = (props) => {
    const timeMinutes = Math.floor(Math.round(props.timeTaken)/60)
    const timeSeconds = Math.round(props.timeTaken)%60
    return(
        <Box position="relative" style={props.style} display="inline-flex">
            <CircularProgress color="inherit" variant="determinate" size={100} value={props.value}/>
            <Box position="absolute" top={0} left={0} bottom={0} right={0} display="flex" justifyContent="center" alignItems="center">
                <Typography color="inherit" style={{fontWeight:600}} component="div">
                {timeMinutes<10?"0"+timeMinutes:timeMinutes}:{timeSeconds<10?"0"+timeSeconds:timeSeconds} 
                </Typography>
            </Box>
        </Box>
    )
}

export default CircularProgressWithClockReport
