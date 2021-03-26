import React from 'react'

const styles = {
    clockContainer:{
        textAlign:"center",
        background:"#00ECB9",
        fontFamily:"sans-serif",
        fontWeight:"100"
    },
    styleh1:{
        color:"#396",
        fontWeight:"100",
        fontSize:"40px",
        margin:"40px 0px 20px"
    },
    clockdiv:{
        fontFamily:"sans-serif",
        color:"#fff",
        display:"inline-block",
        fontWeight:"100",
        textAlign:"center",
        fontSize:"30px"
    },
    clockdivInside:{
        padding:"10px",
        borderRadius:"3px",
        background:"#00BF96",
        display:"inline-block"
    },
    clockdivSpan:{
        padding:"15px",
        borderRadius:"3px",
        background:"#00816A",
        display:"inline-block"
    },
    smallText:{
        paddingTop:"5px",
        fontSize:"16px"
    }
}
const Clock = () => {
    return (
        <div style={styles.clockContainer}>
            <h1 style={styles.styleh1}>Time remaining</h1>
            <div style={styles.clockdiv}>
                <div style={styles.clockdivInside}>
                    <span style={styles.clockdivSpan}>9</span>
                    <div style={styles.smallText}>Minutes</div>
                </div>
                <div style={styles.clockdivInside}>
                    <span style={styles.clockdivSpan}>46</span>
                    <div style={styles.smallText}>Seconds</div>
                </div>
            </div>
            
        </div>
    )
}

export default Clock
