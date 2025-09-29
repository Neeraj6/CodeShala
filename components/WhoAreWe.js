/*
 * @author Gaurav Kumar
 */

import React, {useState} from "react";
import {Box, Button, Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Image from "material-ui-image";
import RequestDemoClass from "./RequestDemoClass";

const useStyles = makeStyles(theme => ({
    title: {
        color: "#707070",
        fontWeight: 600,
        fontFamily: "Raleway",
        fontSize: "3.0em",
        [theme.breakpoints.down('xs')]: {
            textAlign: "left",
            marginTop: "3rem",
            fontSize: "3.5em"
        },
    },
    subTitle: {
        color: "#707070",
        fontSize: "1.0em",
        fontWeight: 300,
        margin: "1rem 0rem",
        fontFamily:"Poppins, Raleway",
        [theme.breakpoints.down('xs')]: {
            textAlign: "left",
            fontSize: "1em",
        },
    },
    laptopSvg: {
        height: "auto",
        width: "82%",
        "& > div": {
            background: "transparent !important"
        },
        [theme.breakpoints.down("xs")]:{
            width:"100%",
            marginTop:"-6rem"
        }
    },
    iphoneSvg: {
        height: "100%",
        width: "50%",
        transform: "translateY(16%)",
        "& > div": {
            background: "transparent !important"
        }
    },
    btn: {
        backgroundColor: "#FFBF00",
        borderRadius: 5,
        boxShadow: "0px 20px 20px #656D7441",
        color: "white",
        margin: "1.5rem 0rem 2rem",
        [theme.breakpoints.down("xs")]: {
            marginTop: "3rem"
        }
    }
}));

const WhoAreWe = () => {
    const classes = useStyles();
    const [demoClass, setDemoClass] = useState(false);
    return (
        <Box>
            <Container>
                <Grid container>
                    <Grid item xs={12} md={5} style={{padding: "5rem 0rem"}}>
                        <Typography variant={"h2"} className={classes.title}>Our Curriculum</Typography>
                        <Typography variant={"body2"} className={classes.subTitle}>
                            Five years of tried and tested research has given birth to this curriculum. Our online coding classes for kids are designed with hands-on learning projects that they truly enjoy! From the first day henceforth your kids will indulge in the process of coding and creating projects.
                            The curriculum provides proper guidance for developing and publishing their projects. Every coding class in a course builds on the one before it, meaning that students graduate with a vast mastery of coding skills and a portfolio full of cool, working web pages and apps.

                        </Typography>
                        {/*<Typography variant={"body2"} className={classes.subTitle}>*/}
                        {/*    Codeshla Believes That By Starting To Code At A Younger Age It Opens A Kids Mind To Creative*/}
                        {/*    “Problem Solving” Thinking And Becomes An Extension Of How Kids Can Express Themselves.*/}
                        {/*    /!*<Link href={"/about/"}>*!/*/}
                        {/*    /!*    <a> Read More</a>*!/*/}
                        {/*    /!*</Link>*!/*/}
                        {/*</Typography>*/}
                    </Grid>
                    <Grid item xs={12} md={7} style={{display: "flex", justifyContent: "flex-end"}}>
                        {/*<Box style={{height: "100%", width: "100%", display: "flex"}}>*/}
                            <Box className={classes.laptopSvg}>
                                <Image src={"/assets/who-are-we.png"}/>
                            </Box>
                            {/*<Box className={classes.iphoneSvg}>*/}
                            {/*    <Image src={"/assets/about-us-iphone.svg"} className={classes.iphoneSvg}/>*/}
                            {/*</Box>*/}
                        {/*</Box>*/}
                    </Grid>
                </Grid>
            </Container>
            <Box style={{backgroundColor: "#0CE49F"}}>
                <Container>
                    <Button className={classes.btn} onClick={() => setDemoClass(true)}>Get curriculum</Button>
                </Container>
            </Box>
            {demoClass && <RequestDemoClass open={demoClass} setOpen={setDemoClass}/>}
        </Box>
    );
};

export default WhoAreWe;
