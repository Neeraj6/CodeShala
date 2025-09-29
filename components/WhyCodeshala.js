/*
 * @author Gaurav Kumar
 */

import React from "react";
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ReactPlayer from 'react-player/youtube';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const useStyles = makeStyles(theme=>({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column",
        backgroundImage:"url(/assets/pattern-2.svg)",
        backgroundSize:"contain",
        padding:"36rem 0rem 6rem",
        [theme.breakpoints.down('xs')]: {
           padding:"1rem 0rem"
        }
    },
    title: {
        color: "#545469",
        fontFamily: "Raleway",
        fontWeight: "600",
        maxWidth: "30rem",
        textAlign:"center",
        [theme.breakpoints.down('xs')]: {
            fontSize:"3em"
        },
    },
    videoWrapper:{
        padding: 18,
        borderRadius:10,
        backgroundColor:"#ffe9a9",
        margin:"6rem",
        position:'relative',
        [theme.breakpoints.down('md')]: {
            display: "flex !important",
        },
        "&:after":{
            position:"absolute",
            content:'""',
            left:"5%",
            right:0,
            bottom:"-1.4rem",
            width:"90%",
            height:"2rem",
            borderRadius:40,
            backgroundColor:"#C2F8E6",
            zIndex:-1
        },
        "&:before":{
            position:"absolute",
            content:'""',
            left:"10%",
            right:0,
            bottom:"-2.5rem",
            width:"80%",
            height:"2rem",
            borderRadius:30,
            backgroundColor:"#88F0CE",
            zIndex:-1
        },
        "& div":{
            [theme.breakpoints.down('md')]: {
                width: "20rem !important",
                height:"12rem !important",
                margin:"auto"
            },
        }
    },
    socialLink:{
        color:"black",
        margin:" 0px 7px",
        textDecoration:"none",
        "&:hover":{
            color:"black",
            opacity:"0.9"
        }
    }
}));
const WhyCodeshala = () => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Box>
                <Typography variant={"h2"} className={classes.title}>Why </Typography>
                <Typography variant={"h2"} className={classes.title}>CODESHALA</Typography>
            </Box>
            <Box className={classes.videoWrapper}>
                <ReactPlayer url='https://youtu.be/Lm2BRrhmg68'  />
            </Box>
            <Box display={"flex"}>
                <a href={"https://www.facebook.com/CodeShala.in/"} target={"_blank"}>
                    <FacebookIcon className={classes.socialLink}/>
                </a>
                <a href={"https://twitter.com/codeshala_in/"} target={"_blank"}>
                    <TwitterIcon className={classes.socialLink}/>
                </a>
                <a href={"https://www.instagram.com/codeshala/"} target={"_blank"}>
                    <InstagramIcon className={classes.socialLink}/>
                </a>
                <a href={"https://www.youtube.com/channel/UCVPGcbbQTmotnLbA6FpZ8iw/"} target={"_blank"}>
                    <YouTubeIcon className={classes.socialLink}/>
                </a>
                <a href={"https://lu.linkedin.com/company/codeshala/"} target={"_blank"}>
                    <LinkedInIcon className={classes.socialLink}/>
                </a>
            </Box>
        </Box>
    )
};

export default WhyCodeshala;
