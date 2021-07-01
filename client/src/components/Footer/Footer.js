import React from "react";

import logo from "../../images/quizzo.jpg";
import { Typography, CssBaseline, Link, makeStyles } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(()=>({
    footer: {
        position: "center",
        background: "#7A51F5",
      },
    
      flexContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        background:
          "linear-gradient(90deg, #9F7FFD 10%, #7A51F5 55%)",
        padding: "30px 0px 10px 0px",
        justifyContent: "center",
        alignItems: "ceter",
      },
    
      flexbox: {
        width: "33%",
        "@media (max-width : 700px)": {
          width: "100%",
        },
      },
    
      image1: {
        width: "300px",
        margin: "5px 0px 15px 0px ",
        position: "centre",
        transition: ".5s",
        "&:hover": {
          transform: "scale(1.3)",
        },
      },
    
      link: {
        listStyleType: "none",
        textAlign: "center",
        paddingInlineStart: "0px",
        transition: "1s",
        padding:"0.3em"
      },
    
      linkName: {
        color: "black",
        transition: "0.5s",
        "&:hover": {
          color: "#E2F0F9",
          textShadow: "0 0 5px #E2F0F9",
        },
      },
    
      name: {
        color: "#9F7FFD",
        "&:hover": {
          color: "#E2F0F9",
        },
      },
    
      touch: {
        fontSize: "25px",
        fontWeight: "bold",
        padding: "0 0 30px 0",
        "@media (max-width : 700px)": {
          padding: "10px 0 5px 0",
        },
      },
    
      Icon: {
        margin: "10px 10px 10px 10px",
        fontSize: "40px",
        transform: "scale(.9)",
        zIndex: "-1",
        transition: ".5s",
        "&:hover::before": {
          transform: "scale(1.1)",
        },
    
        "&:hover": {
          color: "#eae7dc",
          textShadow: "0 0 5px #eae7dc",
          transform: "scale(1.3)",
        },
        "@media (max-width : 700px)": {
          margin: "0px 10px 10px 10px",
        },
      },
    
      displayInline:{
        display: 'inline'
      }
}))
const Footer = () => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <div className={classes.footer}>
                <div className={classes.flexContainer} style={{ flexWrap: "wrap" }}>
                    <div
                        className={classes.flexbox}
                        style={{ flexGrow: "1", flex: "auto", flexDirection: "row" }}
                    >
                        <Typography align="center">
                            <Link href="#" color="inherit">
                                <img className={classes.image1} src={logo} alt="BookXchanger" />
                            </Link>
                            <br />
                            <span
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                                align="center"
                            >
                                Fun destination for quizzes
                            </span>
                        </Typography>
                    </div>

                    <div className={classes.flexbox} style={{ flexGrow: "1" }}>
                        <Typography className={classes.touch} align="center">
                            Get in Touch
                            <br />
                        </Typography>
                        <Typography align="center">
                            <Link
                                href="https://www.facebook.com/"
                                target="_blank"
                                color="inherit"
                            >
                                <FacebookIcon className={classes.Icon} />
                            </Link>
                            <Link
                                href="https://www.instagram.com/"
                                target="_blank"
                                color="inherit"
                            >
                                <InstagramIcon className={classes.Icon} />
                            </Link>
                            <Link
                                href="https://github.com/"
                                target="_blank"
                                color="inherit"
                            >
                                <GitHubIcon className={classes.Icon} />
                            </Link>
                            <Link href="http://linkedin.com/" target="_blank" color="inherit">
                                <LinkedInIcon className={classes.Icon} />
                            </Link>
                            <Link
                                href="mailto:bookxchanger@gmail.com"
                                target="_blank"
                                color="inherit"
                            >
                                <EmailIcon className={classes.Icon} />
                            </Link>
                        </Typography>
                    </div>

                    <div className={classes.flexbox} style={{ flexGrow: "1" }}>
                        <Typography
                            style={{ fontSize: "20px", fontWeight: "bold" }}
                            align="center"
                        >
                            Quick Links
                        </Typography>
                        <div align="center">
                            <ul className={classes.displyInline} style={{ listStyleType: "none", textAlign: "center" }}>
                                <li className={classes.link}>
                                    <Link
                                        to="/"
                                        component={RouterLink}
                                        key="Home"
                                        color="inherit"
                                        className={classes.linkName}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className={classes.link}>
                                    <Link
                                        to="/take quiz"
                                        component={RouterLink}
                                        key="Books"
                                        color="inherit"
                                        className={classes.linkName}
                                    >
                                        Take quiz
                                    </Link>
                                </li>
                                <li className={classes.link}>
                                    <Link
                                        to="/about"
                                        component={RouterLink}
                                        key="About Us"
                                        color="inherit"
                                        className={classes.linkName}
                                    >
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <Typography
                        align="center"
                        style={{
                            fontSize: "13px",
                            position: "Centre",
                            padding: "5px 0 5px 0",
                            background: "black",
                            color: "white",
                        }}
                    >
                        {"Copyright © "}
                        <Link
                            color="inherit"
                            to="/"
                            component={RouterLink}
                            key="Home"
                            className={classes.name}
                        >
                            Quizzo
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {". "}
                        {"All Rights Reserved"}
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default Footer;
