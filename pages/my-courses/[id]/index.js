/*
 * @author Gaurav Kumar
 */

import React from "react";
import {
    Box,
    Typography,
    Container,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TableContainer,
    Avatar,
    Badge,
    ButtonGroup,
    Button,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemIcon,
    LinearProgress,
    ListItemSecondaryAction
} from "@material-ui/core";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";
import Head from "next/head";
import Header from "../../../components/Header";
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import WhatshotRoundedIcon from '@material-ui/icons/WhatshotRounded';
import Image from "material-ui-image";
import LevelOfCourse from "../../../components/LevelOfCourse";
// import {Swiper, SwiperSlide} from "swiper/swiper-react";
import Project from "../../../components/Project";
import StudentAchievers from "../../../components/StudentAchievers";
import BookFreeClass from "../../../components/BookFreeClass";
import Footer from "../../../components/Footer";

const useStyles = makeStyles(theme => ({
    courseImageWrapper: {
        padding: "2rem 5rem",
        position: "relative",
        margin: "1rem",
        "&> div":{
            // width:"50%",
            // height:"50%"
        }
    },
    courseDetails: {
        display: "flex",
        padding: "1rem",
        margin: "1rem 1rem 2rem",
        position: "relative"
    },
    courseDesc: {
        margin: "1rem 0rem",
        fontFamily: "Raleway",
        fontSize: "1em",
        color: "#747474"
    },
    whatYouLearn: {
        borderRadius: "1rem",
        backgroundColor: "#0CE49F",
        padding: "1rem",
        transform: "scale(1.2) translateX(10px)",
        position: "absolute",
        left: "1rem",
        top: "1rem",
        width: "13rem"
    },
    pointsTitle: {
        color: "white",
        fontWeight: 600,
        fontSize: "1.3em",
        textAlign: "center",
        marginBottom: 10
    },
    points: {
        fontWeight: 200,
        color: "#ffffff"
    },
    courseTitle: {
        color: "#545469",
        textAlign: "center"
    },
    courseDescText: {
        color: "white",
        fontFamily: "Raleway",
        fontWeight: 600,
        fontSize: "0.9em"
    },
    courseDetailBox: {
        backgroundColor: "white",
        boxShadow: "0px 5px 50px #00000029",
        borderTopRightRadius: "1rem",
        borderBottomRightRadius: "1rem",
        padding: "1rem 2rem 0rem 17rem",
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            padding: "13rem 1rem 0rem 1rem"
        }
    },
    freeDemoBtn: {
        backgroundColor: "#0FBD8C",
        borderRadius: 5,
        color: "white",
        padding: "0.3rem 1rem",
        textTransform: "capitalize",
        fontSize: "1em",
        "&:hover": {
            backgroundColor: "#0FBD8C",
            color: "white",
        }
    },
    profileBtn: {
        backgroundColor: "#FFBF00",
        borderRadius: 5,
        color: "white",
        padding: "0.3rem 1rem",
        textTransform: "capitalize",
        fontSize: "1em",
        "&:hover": {
            backgroundColor: "#FFBF00",
            color: "white",
        }
    },
    discountPrice: {
        color: "#545469",
        fontFamily: "Poppins",
        fontSize: "1.4em",
        fontWeight: 600,
        textAlign: "center"
    },
    actualPrice: {
        textDecoration: "line-through",
        color: "#545469",
        fontSize: "0.7em",
        fontWeight: 400
    },
    courseName: {
        textAlign: "left",
        color: "#585858",
        fontWeight: 500,
        fontFamily: "Raleway",
        fontSize: "2em",
        margin: "1rem 0rem"
    },
    bottomBtns: {
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "0rem",
        transform: "translateY(1rem)"
    },
    levelsList: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "2.5rem"
    },
    courseLevelTitle: {
        fontFamily: "Raleway",
        fontSize: "3em",
        fontWeight: 600,
        color: "#545469",
        textAlign: "center",
        marginTop: "3rem",
        [theme.breakpoints.down('md')]: {
            marginTop: "2rem",
            marginBottom: "-3rem"
        }
    },
    title: {
        fontFamily: "Raleway",
        fontSize: "1.8rem",
        fontWeight: 800,
        color: "#7A7A7A",
        margin: "0.5rem 0rem"
    },
    module: {
        backgroundColor: "#E8E8E8",
    },
    moduleTitle: {
        color: "rgba(0, 0, 0, 0.49)",
        fontSize: "1em",
        fontFamily: "Raleway",
        fontWeight: "bold",
        marginLeft: 20
    },
    lectureTitle: {
        color: "rgba(0, 0, 0, 0.49)",
        fontSize: "1em",
        fontFamily: "Raleway",
        fontWeight: "bold"
    },
    startClassBtn: {
        marginLeft: "auto",
        marginTop: "2rem",
        backgroundColor: "#0FBD8C",
        borderRadius: 5,
        color: "white",
        padding: "0.3rem 1rem",
        textTransform: "capitalize",
        fontSize: "1em",
        "&:hover": {
            backgroundColor: "#0FBD8C",
            color: "white",
        }
    },
    courseProgress: {
        backgroundColor: "#C4C4C4",
        borderRadius: 4,
        maxWidth:"70%",
        height: 7,
        "& .MuiLinearProgress-bar": {
            backgroundColor: "#0FBD8C"
        }
    },
}));

const Course = () => {
    const classes = useStyles();
    return (
        <div>
            <Head>
                <title>Codeshala Courses </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main style={{paddingTop: "7rem"}}>
                <Box>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={7}>
                                <Typography variant={"h2"} className={classes.courseName}>Automate boring stuff with
                                    python</Typography>
                                <Typography variant={"subtitle2"} className={classes.courseDesc}>From begginner to
                                    expert in python automation, start learning from now</Typography>
                                <LinearProgress variant={"determinate"} className={classes.courseProgress}
                                                value={40}/>
                                <Button variant={"contained"} className={classes.startClassBtn}>Start Class</Button>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Box className={classes.courseImageWrapper}>
                                    <Image src={"/assets/hero-home-banner.png"}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container>
                        <Box display={"flex"} alignItems={"center"}>
                            <Typography variant={"subtitle1"} className={classes.title}>Courses Content</Typography>
                            {/*<Button variant={"contained"} className={classes.startClassBtn}>Start Class</Button>*/}
                        </Box>
                        <Box>
                            <Accordion className={classes.module}>
                                <AccordionSummary
                                    // expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <ExpandMoreIcon/>
                                    <Typography className={classes.moduleTitle}>
                                        Lorem ipsum dolor sit amet,
                                        consectetur</Typography>
                                    <Typography className={classes.moduleTitle} style={{marginLeft: "auto"}}>
                                        41 lectures | 54 min</Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{backgroundColor: "white"}}>
                                    <List dense={true} style={{width: "100%"}}>
                                        <ListItem style={{width: "100%"}} dense={true}>
                                            <ListItemIcon>
                                                <SlowMotionVideoIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box display={"flex"}>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}>Lorem
                                                            ipsum dolor sit amet,
                                                            consectet</Typography>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}
                                                                    style={{marginLeft: "auto"}}>19:30</Typography>
                                                    </Box>}
                                            />
                                            <ListItemSecondaryAction>
                                                <CheckRoundedIcon style={{color: "green"}}/>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem style={{width: "100%"}} dense={true}>
                                            <ListItemIcon>
                                                <SlowMotionVideoIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box display={"flex"}>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}>Lorem
                                                            ipsum dolor sit amet,
                                                            consectet</Typography>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}
                                                                    style={{marginLeft: "auto"}}>19:30</Typography>
                                                    </Box>}
                                            />
                                            <ListItemSecondaryAction>
                                                {/*<CheckRoundedIcon/>*/}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem style={{width: "100%"}} dense={true}>
                                            <ListItemIcon>
                                                <SlowMotionVideoIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box display={"flex"}>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}>Lorem
                                                            ipsum dolor sit amet,
                                                            consectet</Typography>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}
                                                                    style={{marginLeft: "auto"}}>19:30</Typography>
                                                    </Box>}
                                            />
                                            <ListItemSecondaryAction>
                                                <CheckRoundedIcon/>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.module}>
                                <AccordionSummary
                                    // expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1b-content"
                                    id="panel1b-header"
                                >
                                    <ExpandMoreIcon/>
                                    <Typography className={classes.moduleTitle}>
                                        Lorem ipsum dolor sit amet,
                                        consectetur</Typography>
                                    <Typography className={classes.moduleTitle} style={{marginLeft: "auto"}}>
                                        41 lectures | 54 min</Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{backgroundColor: "white"}}>
                                    <List dense={true} style={{width: "100%"}}>
                                        <ListItem style={{width: "100%"}} dense={true}>
                                            <ListItemIcon>
                                                <SlowMotionVideoIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box display={"flex"}>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}>Lorem
                                                            ipsum dolor sit amet,
                                                            consectet</Typography>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}
                                                                    style={{marginLeft: "auto"}}>19:30</Typography>
                                                    </Box>}
                                            />
                                            <ListItemSecondaryAction>
                                                <CheckRoundedIcon/>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem style={{width: "100%"}} dense={true}>
                                            <ListItemIcon>
                                                <SlowMotionVideoIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box display={"flex"}>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}>Lorem
                                                            ipsum dolor sit amet,
                                                            consectet</Typography>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}
                                                                    style={{marginLeft: "auto"}}>19:30</Typography>
                                                    </Box>}
                                            />
                                            <ListItemSecondaryAction>
                                                <CheckRoundedIcon/>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.module}>
                                <AccordionSummary
                                    // expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <ExpandMoreIcon/>
                                    <Typography className={classes.moduleTitle}>
                                        Lorem ipsum dolor sit amet,
                                        consectetur</Typography>
                                    <Typography className={classes.moduleTitle} style={{marginLeft: "auto"}}>
                                        41 lectures | 54 min</Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{backgroundColor: "white"}}>
                                    <List dense={true} style={{width: "100%"}}>
                                        <ListItem style={{width: "100%"}} dense={true}>
                                            <ListItemIcon>
                                                <SlowMotionVideoIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box display={"flex"}>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}>Lorem
                                                            ipsum dolor sit amet,
                                                            consectet</Typography>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}
                                                                    style={{marginLeft: "auto"}}>19:30</Typography>
                                                    </Box>}
                                            />
                                            <ListItemSecondaryAction>
                                                <CheckRoundedIcon/>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem style={{width: "100%"}} dense={true}>
                                            <ListItemIcon>
                                                <SlowMotionVideoIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box display={"flex"}>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}>Lorem
                                                            ipsum dolor sit amet,
                                                            consectet</Typography>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}
                                                                    style={{marginLeft: "auto"}}>19:30</Typography>
                                                    </Box>}
                                            />
                                            <ListItemSecondaryAction>
                                                <CheckRoundedIcon/>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem style={{width: "100%"}} dense={true}>
                                            <ListItemIcon>
                                                <SlowMotionVideoIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box display={"flex"}>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}>Lorem
                                                            ipsum dolor sit amet,
                                                            consectet</Typography>
                                                        <Typography variant={"subtitle2"}
                                                                    className={classes.lectureTitle}
                                                                    style={{marginLeft: "auto"}}>19:30</Typography>
                                                    </Box>}
                                            />
                                            <ListItemSecondaryAction>
                                                <CheckRoundedIcon/>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Container>
                </Box>
            </main>
            <BookFreeClass/>
            <Footer/>
        </div>
    );
};

export default Course;
