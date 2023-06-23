import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Line } from 'react-chartjs-2'


import { Grid, Button, Paper, Typography, makeStyles, Radio, RadioGroup, FormControlLabel,useTheme } from '@material-ui/core'


import { getDailyReport, getMonthlyReport, getWeeklyReport } from '../../actions/reports'


const useStyles = makeStyles(() => ({
    graphPaper: {
        padding: "0.5em",
        textAlign: "center"
    },

}))
const ReportCharts = () => {
    const theme = useTheme()
    const classes = useStyles()
    const dispatch = useDispatch()
    const sectionReport = useSelector(state => state.sectionReport)
    const [reportValue, setReportValue] = useState("daily")
    const [chartData, setChartData] = useState({})




    useEffect(() => {
        if (reportValue === "weekly") {
            dispatch(getWeeklyReport())
        } else if (reportValue === "monthly") {
            dispatch(getMonthlyReport())
        } else if (reportValue === "daily") {
            dispatch(getDailyReport())
        }
    }, [reportValue])

    useEffect(() => {
        if (sectionReport.length !== 0) {
            setChartData({
                labels: sectionReport.map(rep => rep.label),
                datasets: [
                    {
                        label: "Your Daily Report",
                        data: sectionReport.map(rep => rep.data),
                        fill: false,
                        backgroundColor: theme.palette.primary.dark,
                        borderColor: theme.palette.primary.light
                    }
                ]
            })
        }
    }, [sectionReport])


    const handleClickReportRadio = (e) => {
        setReportValue(e.target.name)
    }

    return (
        <>
            {
                sectionReport.length !== 0 ? (
                    <Paper className={classes.graphPaper}>
                        <RadioGroup aria-label="gender" name="gender1" value={reportValue} onChange={handleClickReportRadio}>
                            <Grid container>
                                <Grid item sm={3} xs={12}>
                                    <FormControlLabel checked={reportValue === "daily"} name="daily" control={<Radio />} label="Daily Report" />
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <FormControlLabel checked={reportValue === "weekly"} name="weekly" control={<Radio />} label="Weekly Report" />
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <FormControlLabel checked={reportValue === "monthly"} name="monthly" control={<Radio />} label="Monthly Report" />
                                </Grid>
                            </Grid>
                        </RadioGroup>
                        <Line data={chartData} />
                    </Paper>
                ) : null
            }
        </>
    )
}

export default ReportCharts
