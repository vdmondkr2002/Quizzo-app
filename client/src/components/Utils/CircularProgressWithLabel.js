import React from 'react'
import {Box,CircularProgress,Typography} from '@material-ui/core'

const CircularProgressWithLabel = (props) => {
    return(
        <Box position="relative" style={props.style} display="inline-flex">
            <CircularProgress color="inherit" variant="determinate" size={100} value={props.value}/>
            <Box position="absolute" top={0} left={0} bottom={0} right={0} display="flex" justifyContent="center" alignItems="center">
                <Typography color="inherit" style={{fontWeight:600,fontSize:"1.2em"}} component="div">
                   {Math.round(props.value*props.noOfqs/100)}
                </Typography>
            </Box>
        </Box>
    )
}

export default CircularProgressWithLabel
