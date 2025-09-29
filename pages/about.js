/*
 * @author Gaurav Kumar
 */

import React from "react";
import {Box, Button, Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Head from "next/head";
import Header from "../components/Header";
import OurVision from "../components/OurVision";
import OurTeachers from "../components/OurTeachers";
import WhoAreWe from "../components/WhoAreWe";
import Testimony from "../components/Testimony";
import Footer from "../components/Footer";
import BookFreeClass from "../components/BookFreeClass";

const useStyles = makeStyles(theme => ({
    container: {
        fontFamily: "Raleway, Poppins, sans-serif",
    },
    heroContainer: {
        minHeight: "36rem",
        display: "flex",
        alignItems: "center",
        paddingTop: "6rem",
        position: "relative",
        "&:before": {
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "54%",
            content: '""',
            width: "0%",
            backgroundImage: "url(/assets/blue-box.svg)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
        },
        "&:after": {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "0%",
            content: '""',
            height: "12%",
            backgroundImage: "url(/assets/courses-top-curve.svg)",
            backgroundSize: "cover"
        }
    },
    leftBoxHero: {},
    heroTitle: {
        color: "#545469",
        fontWeight: 600,
        maxWidth:"10rem",
        fontSize: "4.1em",
        fontFamily: "Raleway, Poppins, sans-serif",
        [theme.breakpoints.down('xs')]: {
            textAlign: "left",
            marginTop: "3rem",
            fontSize: "3.5em"
        },
    },
    heroSubTitle: {
        color: "#8B8B9C",
        fontSize: "1.2em",
        fontWeight: 300,
        fontFamily:"Poppins, Raleway",
        margin: "2rem 0rem 2.5rem",
        [theme.breakpoints.down('xs')]: {
            textAlign: "left",
            fontSize: "1em",
        },
    },
    heroBtn: {
        borderRadius: 10,
        marginRight: "1rem",
        marginBottom: "1rem",
        padding: "0.8rem 1.6rem"
    },
    heroImageWrapper: {
        width: "30rem",
        height: "100%",
        margin: "auto 0px 0px auto",
        display: "flex",
        alignItem: "flex-end",
        [theme.breakpoints.down('xs')]: {
            width: "20rem"
        },
    },
    heroImage: {
        width: "100%",
        marginTop: "auto",
        // transform: "translateY(34%)",
        zIndex: 2,
        boxShadow: "0 8px 6px -6px black"
    },
    heroBox: {
        position: "relative",
        "&:after": {
            top: "21%",
            right: 0,
            position: "absolute",
            content: "''",
            width: "73%",
            height: "58%",
            zIndex: -2,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/assets/bg-yellow-box.svg)",
            [theme.breakpoints.down("xs")]: {
                width: "0%",
                left: 0,
                top: 0
            }
        },
        "&:before": {
            left: 0,
            position: "absolute",
            content: "''",
            width: "79%",
            bottom: "-11%",
            height: "56%",
            zIndex: -1,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/assets/bg-blue-box.svg)",
            [theme.breakpoints.down("xs")]: {
                width: "0%",
                bottom: 0,
                backgroundColor: "#FFBF00A6"
            }
        },
        paddingBottom: "5rem"
    },
    ourVisionBox: {
        paddingBottom:"6rem",
        [theme.breakpoints.down("xs")]: {
            backgroundColor: "#FFBF00A6",
            paddingBottom:"0rem",
            paddingTop:"2rem",
        }
    },
    ourTeachersBox:{
        [theme.breakpoints.down("xs")]: {
            backgroundColor: "#38B6FF"
        }
    }
}));

const About = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Head>
                <title>Codeshala About Us </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main>
                <Box className={classes.heroBox}>
                    <Box className={classes.heroContainer}>
                        <Container>
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant={"h1"} className={classes.heroTitle}>About
                                        CODESHALA</Typography>
                                    <Typography variant={"h3"} className={classes.heroSubTitle}>
                                        Founded by a group of teachers in 2016. CodeShala was one of the earliest initiatives to teach kids coding in India. Started as offline coding classes in Delhi/NCR, now Codeshala has more than 15000 students and 20 centres all around the world. and numbers are only growing.
                                        <br/>
                                        <br/>
                                        Our Team is dedicated to our cause of teaching code to the oncoming generations of kids.Our teaching personnel includes highly experienced educators who make coding for kids fun and engaging!

                                    </Typography>
                                    <Box>
                                        {/*<Button className={classes.heroBtn} style={{backgroundColor: "#E4E9EA"}}>*/}
                                        {/*    KNOW MORE*/}
                                        {/*</Button>*/}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box className={classes.heroImageWrapper}>
                                        <img src={"/assets/hero-home-banner.png"} alt={"codeshala"}
                                             className={classes.heroImage}/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                    <Box className={classes.ourVisionBox}>
                        <OurVision/>
                    </Box>
                    <Box className={classes.ourTeachersBox}>
                        <OurTeachers/>
                    </Box>
                </Box>
                <WhoAreWe/>
                <Testimony/>
                <BookFreeClass/>
                <Footer/>
            </main>
        </div>
    );
};
export default About;
