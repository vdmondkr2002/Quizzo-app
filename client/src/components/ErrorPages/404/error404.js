import React from 'react'
import {Link} from 'react-router-dom'
import {Container,Paper,Box,Button,Typography, makeStyles} from '@material-ui/core'

import Image404 from '../../../images/404 Error-pana.svg'

const useStyles = makeStyles((theme)=>({
    mainCont:{
        marginTop:"5em",
        width:"auto"
    }
}))

const Error404 = () => {
    const classes = useStyles()
    return (
        <Container>
            <Paper className={classes.mainCont}>
                <Box display="block" textAlign="center">
                    <Button component={Link} to="/" variant="contained" color="primary">
                        <Typography>
                            Go To Home Page
                        </Typography>
                    </Button>
                </Box>
                <img src={Image404} alt="404 Error"/>
            </Paper>
        </Container>
    )
}

export default Error404
