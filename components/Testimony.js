/*
 * @author Gaurav Kumar
 */

import React, {useEffect, useState} from "react";
import {Avatar, Box, Grid, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Swiper, SwiperSlide} from "swiper/react";
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontFamily: "Raleway",
        fontSize: "3em",
        fontWeight: 600,
        color: "#707070",
        textAlign: "center",
        margin: "3rem 0rem 0rem",
        [theme.breakpoints.down('md')]: {
            fontSize: "2.5em",
            margin: "0rem 1rem"
        },
    },
    testimonyBox: {
        boxShadow: "0px 5px 50px #00000029",
        borderRadius: "10rem",
        // display: "flex",
        // justifyContent: "space-around",
        maxWidth: "80rem",
        padding: "1.5rem 1.5rem 2rem 1.5rem",
        backgroundColor: "white",
        transform: "translateY(50%)",
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            borderRadius: "4rem",
            transform: "translateY(14%)",
        },
    },
    testimonyTitle: {
        fontFamily: "Raleway",
        fontSize: "3em",
        fontWeight: 600,
        color: "#707070",
        textAlign: "center"
    },
    testimonyName: {
        color: "#707070",
        fontFamily: "Raleway",
        fontSize: "1.8em",
        textAlign: "center"
    },
    commentsBox: {
        paddingTop: "10rem",
        backgroundColor: "#0CE49F",
        width: "100%",
        position: "relative",
        backgroundImage: "url(/assets/pattern.svg)",
        [theme.breakpoints.down('md')]: {
            paddingTop: "9rem"
        },
        "& .swiper-container:after": {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            content: '""',
            [theme.breakpoints.down('md')]: {
                width: "0rem"
            },
            width: "25rem",
            zIndex: 1,
            backgroundImage: "linear-gradient(90deg,rgba(12,228,159,0), rgba(12,228,159,0.8))"
        },
        "& .swiper-container:before": {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            content: '""',
            width: "25rem",
            [theme.breakpoints.down('md')]: {
                width: "0rem"
            },
            zIndex: 2,
            backgroundImage: "linear-gradient(-90deg,rgba(12,228,159,0), rgba(12,228,159,0.8))"
        }
    },
    commentsTitle: {
        color: "white",
        fontFamily: "Poppins",
        textAlign: "center",
        fontSize: "1.7em"
    },
    comment: {
        borderRadius: "4rem",
        backgroundColor: "white",
        padding: "1rem 3rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    commentPara: {
        color: "#585E68",
        fontFamily: "Poppins",
        fontStyle: "italic",
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
        overflow: "hidden"
    },
    quoteIcon: {
        transform: "translateY(-85%)"
    }
}));

const Testimony = () => {
    const classes = useStyles();
    let comments = [{
        text: "One of the best place to learn coding for kids above the age of 6. These guys provide all kind of courses for every age group. Their courses include scratch, MIT App Inventor, HTML, Python, Java, C++ and many more. They even help kids go through there hectic school curriculum.",
        name: "Prashant Kumar",
        profile: ""
    },
        {
            text: "I am very happy with the way they teach children.",
            name: "Shivani Marwah",
            profile: ""
        },
        {
            text: "Really satisfied and very happy with Codeshala team. Wonderful, experienced and friendly teaching faculty. Will strongly recommend",
            name: "Rekha Gupta",
            profile: ""
        },
        {
            text: "My son has been doing coding modules with Codeshala for a while now. He has always enjoyed the classes thoroughly and has learned a lot. The last few months, we have had the teacher coming home once a week for classes- we are very happy with this and the people running the show are flexible and it is easy to reschedule if something urgent comes up.",
            name: "Nimeran Singh",
            profile: ""
        },
        {
            text: "I am availing the services of CodeShala for my child, and am very happy with its professionalism and thoroughness. The Gaming and the App-development modules in particular are too good. The owners, Ms Nishita and Mr Pavan, make these contemporary must-know features quite easy to understand, and fun, too.",
            name: "Gaurav Dinesh Jain",
            profile: ""
        },
        {
            text: "Codeshala teachers are excellent. They Know how to keep up the kids’ interest and make learning fun and easy! My child has been learning for over a year now and wants to continue.",
            name: "Anjali Chadha",
            profile: ""
        },
    ];
    const [students, setStudents] = useState(15000);
    const [classDone, setClassDone] = useState(750000);
    const [projects, setProjects] = useState(100000);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    useEffect(() => {
        let d = Date.now();
        let n = parseInt(((d - new Date(2020, 0, 1).getTime()) / 840000000).toString());
        setStudents(p => p + n / 3);
        setClassDone(p => p + n);
        setProjects(p => p + n / 2);
        // let t = setInterval(() => {
        //
        // },);
        // return () => {
        //     clearInterval(t);
        // }
    }, [])
    return (
        <Box className={classes.container}>
            {/*<Typography variant={"h2"} className={classes.title}>ACHIEVEMENTS SINCE 2018</Typography>*/}
            <Grid container spacing={2} className={classes.testimonyBox} alignContent={"center"} alignItems={"center"}>
                <Grid item md={6} lg={4}>
                    <Typography variant={"h2"} className={classes.testimonyTitle}>{numberWithCommas(parseInt(students))}+</Typography>
                    <Typography variant={"h4"} className={classes.testimonyName}>Enrolled Students</Typography>
                </Grid>
                <Grid item md={6} lg={4}>
                    <Typography variant={"h2"} className={classes.testimonyTitle}>{numberWithCommas(parseInt(classDone))}+</Typography>
                    <Typography variant={"h4"} className={classes.testimonyName}> Classes Done</Typography>
                </Grid>
                <Grid item md={6} lg={4}>
                    <Typography variant={"h2"} className={classes.testimonyTitle}>{numberWithCommas(parseInt(projects))}+ </Typography>
                    <Typography variant={"h4"} className={classes.testimonyName}>Project published</Typography>
                </Grid>
                {/*<Grid item md={6} lg={3}>*/}
                {/*    <Typography variant={"h2"} className={classes.testimonyTitle}>510</Typography>*/}
                {/*    <Typography variant={"h4"} className={classes.testimonyName}>Happy Parents</Typography>*/}
                {/*</Grid>*/}
            </Grid>
            <Box className={classes.commentsBox}>
                <Typography variant={"body1"} className={classes.commentsTitle}>What parents say</Typography>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    autoplay
                    breakpoints={{
                        0: {
                            slidesPerView: 1.1,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                            centeredSlides: true,
                            centeredSlidesBounds: true,
                            // slidesOffsetBefore:-150
                        }
                    }}
                    style={{padding: "5rem 0rem",}}
                >
                    {comments.map((item, key) => {
                        return (
                            <SwiperSlide key={key}>
                                <Box className={classes.comment}>
                                    <Avatar className={classes.quoteIcon}>
                                        <FormatQuoteIcon/>
                                    </Avatar>
                                    <Typography variant={"body1"} className={classes.commentPara}>
                                        {item?.text}
                                    </Typography>
                                    <ListItem>
                                        <ListItemAvatar style={{minWidth: 38}}>
                                            <Avatar>{item?.name?.substr(0, 1)}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            style={{marginLeft: 13}}
                                            primary={item?.name}
                                            secondary={item?.profile}
                                        />
                                    </ListItem>
                                </Box>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Box>
        </Box>
    );
};

export default Testimony;
