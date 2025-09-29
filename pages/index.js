import Head from 'next/head';
import Header from '../components/Header';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';
import Image from "material-ui-image"
import React, {useState} from "react";
import Link from 'next/link';
import WhyCodeshala from "../components/WhyCodeshala";
import OurCenters from "../components/OurCenters";
import StudentAchievers from "../components/StudentAchievers";
import Testimony from "../components/Testimony";
import Footer from "../components/Footer";
import BookFreeClass from "../components/BookFreeClass";
import RequestDemoClass from "../components/RequestDemoClass";
import Success from "../components/Success";
import Error from "../components/Error";

const useStyles = makeStyles(theme => ({
    container: {
        fontFamily: "Raleway, Poppins, sans-serif",
    },
    heroContainer: {
        minHeight: "32rem",
        display: "flex",
        alignItems: "center",
        paddingTop: "6rem",
        position: "relative",
        flexDirection: "column",
        "&:before": {
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "54%",
            content: '""',
            width: "11%",
            backgroundImage: "url(/assets/blue-box.svg)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
        },
        "&:after": {
            position: "absolute",
            top: "-21%",
            right: 0,
            width: "16%",
            content: '""',
            height: "60%",
            backgroundImage: "url(/assets/bg-yellow-box.svg)",
            backgroundSize: "contain",
            // transform:"rotate(10deg)",
            backgroundRepeat: "no-repeat"
        }
    },
    curveBox: {
        width: "100%",
        height: "6.45rem",
        backgroundImage: "url(/assets/courses-top-curve.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        marginBottom: "-3rem",
        // backgroundColor:"#0CE49F"
    },
    leftBoxHero: {
        paddingLeft: "6rem",
        [theme.breakpoints.down("md")]: {
            paddingLeft: "1.5rem"
        }
    },
    heroTitle: {
        color: "#545469",
        fontWeight: 600,
        fontSize: "3.25em",
        marginTop: "5rem",
        fontFamily: "Raleway, Poppins, sans-serif",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center",
            marginTop: "3rem",
            fontSize: "4.0em"
        },
    },
    heroSubTitle: {
        color: "#8B8B9C",
        fontSize: "1.3em",
        fontWeight: 400,
        fontFamily: "Poppins, Raleway, sans-serif",
        margin: "2rem 0rem 2.5rem",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center"
        },
    },
    heroBtn: {
        borderRadius: 15,
        fontWeight: 500,
        marginRight: "1rem",
        marginBottom: "1rem",
        padding: "0.8rem 1.6rem",
        textTransform: "none",
        fontFamily: "Poppins, Raleway, sans-serif"
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
        transform: "translateY(13%)",
        zIndex: 2,
        borderRadius: 10,
        boxShadow: "0 8px 6px -6px black"
    },
    secondaryWrapper: {
        position: "relative",
        paddingBottom: "1rem",
        [theme.breakpoints.down('xs')]: {
            marginBottom: "10rem"
        },
        "&:after": {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "-30rem",
            content: '""',
            backgroundImage: "url(/assets/courses-bottom-curve.svg)",
            backgroundSize: "cover",
            height: "30rem",
            [theme.breakpoints.down('xs')]: {
                height: "7rem",
                bottom: "-7rem"
            }
        }
    },
    secondaryContainer: {
        backgroundColor: "#0CE49F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 0rem",
        marginBottom: "8rem",
        [theme.breakpoints.down('md')]: {
            padding: "2rem 1rem",
        },
    },
    secondaryTitle: {
        fontSize: "2.7em",
        fontWeight: 500,
        color: "white",
        maxWidth: "27rem",
        textAlign: "center",
        fontFamily: "Raleway",
        margin: "5rem 0rem",
        [theme.breakpoints.down('xs')]: {
            fontSize: "2em",
            margin: "3rem 0rem"
        }
    },
    courseItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "3rem"
    },
    courseImageWrapper: {
        width: "5.5rem",
        height: "5.5rem",
        borderRadius: 10,
        overflow: "hidden",
        // boxShadow: "0 2px 6px 0px #00000070",
        transition: "box-shadow scale 0.4s ease",
        "&:hover": {
            boxShadow: "none",
            transform:"scale(1.2)"
        }
    },
    courseTitle: {
        color: "white",
        fontSize: "1.2em",
        margin: "1rem 0rem 0rem",
        textAlign: "center",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
    },
    courseSubtitle: {
        color: "white",
        fontSize: "1.2em",
        margin: "0rem 0rem 1rem",
        textAlign: "center",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
    },
    primaryTitle: {
        color: "white",
        fontSize: "2.37em",
        maxWidth: "30rem",
        fontFamily: "Raleway",
        fontWeight: 600,
        margin: "1rem 0rem",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center"
        }
    },
    primarySubtitle: {
        color: "white",
        fontSize: "1em",
        maxWidth: "31rem",
        fontWeight: 400,
        fontFamily: "Poppins, Raleway",
        margin: "2rem 0rem",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center"
        }
    }
}));

const Index = () => {
    const classes = useStyles();
    const [demoClass, setDemoClass] = useState(false);
    return (
        <div className={classes.container}>
            <Head>
                <title>Codeshala </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main>
                <Success/>
                <Error/>
                <Box className={classes.heroContainer}>
                    <Container>
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={6}>
                                <Box className={classes.leftBoxHero}>
                                    <Typography variant={"h1"} className={classes.heroTitle}>1:1 Live online coding
                                        classes for kids
                                    </Typography>
                                    <Typography variant={"h3"} className={classes.heroSubTitle}>Online and Offline
                                        coding classes that ensure a fun and productive environment for your kid to
                                        learn to code.</Typography>
                                    <Box>
                                        <Button className={classes.heroBtn} style={{backgroundColor: "#FFBF00"}}
                                                onClick={() => setDemoClass(true)}>
                                            Book A Free Class
                                        </Button>
                                        <Button className={classes.heroBtn} style={{backgroundColor: "#E4E9EA"}}>
                                            <Link href={"/contact"}>
                                                <a style={{
                                                    textDecoration: "none",
                                                    color: "#000000",
                                                    fontWeight: 500,
                                                    textTransform: "none"
                                                }}>Contact us</a>
                                            </Link>
                                        </Button>
                                    </Box>
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
                    <Box className={classes.curveBox}/>
                    {demoClass && <RequestDemoClass open={demoClass} setOpen={setDemoClass}/>}
                </Box>
                <Box style={{backgroundColor: "#0CE49F"}} className={classes.secondaryWrapper}>
                    <Container className={classes.secondaryContainer}>
                        <Typography variant={"h3"} className={classes.secondaryTitle}>
                            Our Courses
                        </Typography>
                        <Grid container spacing={3} style={{justifyContent: "center"}}>
                            <Grid item xs={4} md={2}>
                                <Link href={"/courses"}>
                                    <a style={{textDecoration: "none"}}>
                                        <Box className={classes.courseItem}>
                                            <Box className={classes.courseImageWrapper}>
                                                <Image src={"/assets/courses/Foundation.png"} color={"rgb(0,0,0,0)"}
                                                       imageStyle={{borderRadius: "50%"}}/>
                                            </Box>
                                            <Typography variant={"h3"} className={classes.courseTitle}>Foundation
                                            </Typography>
                                            {/*<Typography variant={"h5"} className={classes.courseSubtitle}>Age 5 -*/}
                                            {/*    7</Typography>*/}
                                        </Box>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Link href={"/courses"}>
                                    <a style={{textDecoration: "none"}}>
                                        <Box className={classes.courseItem}>
                                            <Box className={classes.courseImageWrapper}>
                                                <Image src={"/assets/courses/Scratch.png"} color={"rgb(0,0,0,0)"}
                                                       imageStyle={{borderRadius: "50%"}}/>
                                            </Box>
                                            <Typography variant={"h3"}
                                                        className={classes.courseTitle}>Scratch </Typography>
                                            {/*<Typography variant={"h5"} className={classes.courseSubtitle}> Age 7+*/}
                                            {/*   </Typography>*/}
                                        </Box>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Link href={"/courses"}>
                                    <a style={{textDecoration: "none"}}>
                                        <Box className={classes.courseItem}>
                                            <Box className={classes.courseImageWrapper}>
                                                <Image src={"/assets/courses/App.png"} color={"rgb(0,0,0,0)"}
                                                       imageStyle={{borderRadius: "50%"}}/>
                                            </Box>
                                            <Typography variant={"h3"} className={classes.courseTitle}>App
                                                Development </Typography>
                                            {/*<Typography variant={"h5"} className={classes.courseSubtitle}>Age 8+*/}
                                            {/*</Typography>*/}
                                        </Box>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Link href={"/courses"}>
                                    <a style={{textDecoration: "none"}}>
                                        <Box className={classes.courseItem}>
                                            <Box className={classes.courseImageWrapper}>
                                                <Image src={"/assets/courses/HTML.png"} color={"rgb(0,0,0,0)"}
                                                       imageStyle={{borderRadius: "50%"}}/>
                                            </Box>
                                            <Typography variant={"h3"} className={classes.courseTitle}>HTML
                                            </Typography>
                                            {/*<Typography variant={"h5"} className={classes.courseSubtitle}> Age 9+*/}
                                            {/*</Typography>*/}
                                        </Box>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Link href={"/courses"}>
                                    <a style={{textDecoration: "none"}}>
                                        <Box className={classes.courseItem}>
                                            <Box className={classes.courseImageWrapper}>
                                                <Image src={"/assets/courses/Python.png"} color={"rgb(0,0,0,0)"}
                                                       imageStyle={{borderRadius: "50%"}}/>
                                            </Box>
                                            <Typography variant={"h3"}
                                                        className={classes.courseTitle}>Python</Typography>
                                            {/*<Typography variant={"h5"} className={classes.courseSubtitle}> Age*/}
                                            {/*    9+</Typography>*/}
                                        </Box>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Link href={"/courses"}>
                                    <a style={{textDecoration: "none"}}>
                                        <Box className={classes.courseItem}>
                                            <Box className={classes.courseImageWrapper}>
                                                <Image src={"/assets/courses/Java.png"} color={"rgb(0,0,0,0)"}
                                                       imageStyle={{borderRadius: "50%"}}/>
                                            </Box>
                                            <Typography variant={"h3"} className={classes.courseTitle}>Java
                                            </Typography>
                                            {/*<Typography variant={"h5"} className={classes.courseSubtitle}> Age 9+*/}
                                            {/*</Typography>*/}
                                        </Box>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Link href={"/courses"}>
                                    <a style={{textDecoration: "none"}}>
                                        <Box className={classes.courseItem}>
                                            <Box className={classes.courseImageWrapper}>
                                                <Image src={"/assets/courses/js.png"} color={"rgb(0,0,0,0)"}
                                                       imageStyle={{borderRadius: "50%"}}/>
                                            </Box>
                                            <Typography variant={"h3"} className={classes.courseTitle}>Java Script
                                            </Typography>
                                            {/*<Typography variant={"h5"} className={classes.courseSubtitle}> Age 9+*/}

                                            {/*</Typography>*/}
                                        </Box>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Link href={"/courses"}>
                                    <a style={{textDecoration: "none"}}>
                                        <Box className={classes.courseItem}>
                                            <Box className={classes.courseImageWrapper}>
                                                <Image src={"/assets/courses/C.png"} color={"rgb(0,0,0,0)"}
                                                       imageStyle={{borderRadius: "50%"}}/>
                                            </Box>
                                            <Typography variant={"h3"} className={classes.courseTitle}>C
                                            </Typography>
                                            {/*<Typography variant={"h5"} className={classes.courseSubtitle}> Age 10 +*/}


                                            {/*</Typography>*/}
                                        </Box>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Link href={"/courses"}>
                                    <a style={{textDecoration: "none"}}>
                                        <Box className={classes.courseItem}>
                                            <Box className={classes.courseImageWrapper}>
                                                <Image src={"/assets/courses/C++.png"} color={"rgb(0,0,0,0)"}
                                                       imageStyle={{borderRadius: "50%"}}/>
                                            </Box>
                                            <Typography variant={"h3"} className={classes.courseTitle}>C++
                                            </Typography>
                                            {/*<Typography variant={"h5"} className={classes.courseSubtitle}> Age 10 +*/}
                                            {/*</Typography>*/}
                                        </Box>
                                    </a>
                                </Link>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container className={classes.secondaryContainer}>
                        <Grid container>
                            <Grid item xs={12} md={6}
                                  style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <Box>
                                    <Typography variant={"h2"} className={classes.primaryTitle}>Why coding is important
                                        for kids?</Typography>
                                    <Typography variant={"body2"} className={classes.primarySubtitle}>Computer science
                                        is essential in building skills in several corollary areas, including math,
                                        science, problem-solving, teamwork, project-based learning, creative arts, and
                                        more. As Steve Jobs famously stated, “Coding teaches you how to think.” Learning
                                        a computer program is just like learning a foreign language. The earlier you
                                        start, the easier it is.
                                        <br/>
                                        <br/>
                                        Computer-related occupations make up over 60% of projected new job positions in
                                        STEM (Science, Technology, Engineering, and Math). Computer programming teaches
                                        skills that are instantly relevant in today’s job market. Computing powers
                                        nearly every industry, from education to farming, from law to business, and from
                                        construction to medicine. Computer engineering jobs rank among the
                                        highest-paying for new graduates.
                                        {/*<Link href={"/aboutus"}><a>READ MORE</a></Link>*/}
                                    </Typography>
                                    <Button style={{
                                        color: "white",
                                        boxShadow: "0px 20px 20px #656D7441",
                                        textTransform: "none",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        textDecoration: "none",
                                        margin: "1rem 0rem",
                                        backgroundColor: "#FFBF00",
                                        padding: "0.5rem 1rem",
                                        fontFamily: "Poppins, Raleway, sans-serif"
                                    }}
                                            onClick={() => setDemoClass(true)}>
                                        Book A Free Class
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <img src={"/assets/why-coding.png"} style={{width: "100%"}}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box>
                    <WhyCodeshala/>
                    <OurCenters/>
                    <StudentAchievers/>
                    <Testimony/>
                </Box>
            </main>
            <BookFreeClass/>
            <Footer/>
        </div>
    )
};

export default Index;
