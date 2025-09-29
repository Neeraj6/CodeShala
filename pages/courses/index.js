/*
 * @author Gaurav Kumar
 */

import React, {useState} from "react";
import {
    Box,
    Button,
    CardContent,
    CardMedia,
    Container,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import {makeStyles} from "@material-ui/core/styles";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Head from "next/head";
import Link from 'next/link';
import Header from "../../components/Header";
import BookFreeClass from "../../components/BookFreeClass";
import Footer from "../../components/Footer";
import StudentAchievers from "../../components/StudentAchievers";
import Testimony from "../../components/Testimony";
import {gql, useQuery} from "@apollo/client";
import RequestDemoClass from "../../components/RequestDemoClass";
import {Swiper, SwiperSlide} from "swiper/react";
import {Project} from "../../components/StudentDashboard";

const useStyles = makeStyles(theme => ({
    swiperWrapper: {
        padding: "4rem 3.5rem 4rem", margin: "0rem -3.5rem",
        [theme.breakpoints.down("xs")]: {
            padding: "5rem 0rem 0rem",
            margin: 0
        },
        "& .swiper-button-next::after, .swiper-button-prev::after": {
            height: "2rem",
            width: "2rem",
            fontSize: "2em",
            padding: "1rem",
            fontWeight: "bolder",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#545469",
        },
        "& .swiper-button-next::after": {
            position: "absolute",
            right: "0rem",
        },
        "& .swiper-button-prev::after": {
            position: "absolute",
            left: "0rem",
        }
    },
    container: {},
    secondaryTitle:{
        textAlign: "center",
        fontSize: "2em",
        fontFamily: "Poppins, Raleway, sans-serif",
        padding: "1rem 3rem",
        fontWeight: 300,
        marginBottom:20
    },
    title: {
        backgroundImage: "linear-gradient(90deg,#38B6FF,#0CE49F)",
        textAlign: "center",
        color: "white",
        borderRadius: "1.5rem",
        fontSize: "3em",
        fontFamily: "Raleway",
        padding: "1rem 3rem",
        fontWeight: 600,
        margin: "2rem 0rem"
    },
    courseWrapper: {
        boxShadow: "6px 10px 40px #00000029",
        borderRadius: "2rem",
        border: "1px solid #00000029",
        margin: "0 0 1.5rem 0",
        backgroundColor: "white",
        width:"100%"
    },
    courseMedia: {
        height: "11rem",
        borderTopLeftRadius: "2rem",
        borderTopRightRadius: "2rem"
    },
    courseName: {
        textAlign: "center",
        color: "#545469",
        fontWeight: 500,
        fontFamily: "Poppins",
        display: "-webkit-box",
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        fontSize: "1.2em",
    },
    discountPrice: {
        color: "#545469",
        fontFamily: "Poppins",
        fontSize: "1.2em",
        fontWeight: 600
    },
    actualPrice: {
        textDecoration: "line-through",
        color: "#545469",
        fontSize: "0.7em",
        fontWeight: 400
    },
    freeDemoBtn: {
        backgroundColor: "#0FBD8C",
        borderRadius: 5,
        color: "white",
        padding: "0.3rem 1rem",
        textTransform: "capitalize",
        fontSize: "0.7em",
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
        fontSize: "0.7em",
        "&:hover": {
            backgroundColor: "#FFBF00",
            color: "white",
        }
    },
    bottomBtns: {
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "-3rem",
        transform: "translateY(-0.3rem)"
    },
    coursesList: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "1.0rem"
    },
    coursesBox: {
        position: "relative",
        paddingTop: "6rem",
        paddingBottom:"12rem",
        [theme.breakpoints.down("xs")]: {
            paddingBottom:"2rem",
        },
        "&:after": {
            bottom: "0%",
            right: 0,
            position: "absolute",
            content: "''",
            width: "16%",
            height: "33%",
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
            top: "6%",
            left: "-12%",
            position: "absolute",
            content: "''",
            width: "33%",
            height: "57%",
            zIndex: -2,
            backgroundSize: "contain",
            borderRadius: "2rem",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/assets/bg-blue-box.svg)",
            [theme.breakpoints.down("xs")]: {
                width: "0%",
                bottom: 0,
                backgroundColor: "#FFBF00A6"
            }
        },
    },
    pointsText: {
        fontSize: "0.85rem",
        "& .MuiListItemText-primary": {
            fontSize: "0.85rem"
        }
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
}));

const COURSES = gql`
    query courses{
        courses(page: 1,limit: 10){
            docs{
                _id
                cover
                createdAt
                description
                discountPrice
                modules{
                    _id
                    title
                }
                price
                title
            }
            hasNextPage
            hasPrevPage
            nextPage
            page
            prevPage
            totalDocs
            totalPages
        }
    }
`;

const Index = () => {
    const classes = useStyles();
    const {loading, error, data} = useQuery(COURSES);
    let courses = [{
        name: "Foundation Course"
    },
        {
            name: "Scratch - Game Development"
        },
        {
            name: "App Inventor - App Development"
        },
        {
            name: "HTML - Web Development"
        },
        {
            name: "Python"
        },
        {
            name: "Java Script"
        }];
    if (error) {
        return (
            <Box>
                <Typography variant={"h3"}>{error.message}</Typography>
            </Box>
        )
    }
    return (
        <div className={classes.container}>
            <Head>
                <title>Codeshala Courses </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main>
                <Box className={classes.coursesBox}>
                    <Container
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}>
                        <Typography variant={"h1"} className={classes.title}>Our Courses</Typography>
                        <Typography variant={"h5"} className={classes.secondaryTitle}>Personalised classes with flexible timings.</Typography>
                        <Grid container className={classes.coursesList} spacing={8}>
                            {data?.courses?.docs?.map((item, key) => {
                                return (
                                    <Course key={key} item={item}/>
                                )
                            })}
                            {loading ? courses.map((item, key) => {
                                return (
                                    <Grid item xs={12} md={4} lg={4}>
                                        <Box className={classes.courseWrapper}>
                                            <Skeleton variant={"rect"} height={"11rem"} style={{
                                                borderTopLeftRadius: "2rem",
                                                borderTopRightRadius: "2rem"
                                            }}/>
                                            <CardContent>
                                                <Skeleton variant="text"/>
                                                <List>
                                                    <Skeleton variant={"rect"} style={{margin: "5px 0"}}
                                                              animation={"wave"}/>
                                                    <Skeleton variant={"rect"} style={{margin: "5px 0"}}
                                                              animation={"wave"}/>
                                                    <Skeleton variant={"rect"} style={{margin: "5px 0"}}
                                                              animation={"wave"}/>
                                                    <Skeleton variant={"rect"} style={{margin: "5px 0"}}
                                                              animation={"wave"}/>
                                                    <Skeleton variant={"rect"} style={{margin: "5px 0"}}
                                                              animation={"wave"}/>
                                                </List>
                                            </CardContent>
                                        </Box>
                                    </Grid>
                                )
                            }) : ""}
                        </Grid>
                    </Container>
                </Box>
                <Projects/>
                <StudentAchievers/>
                <Testimony/>
            </main>
            <BookFreeClass/>
            <Footer/>
        </div>
    )
};
const Projects = () => {
    let projects = [
        {
            _id: "1",
            title: "Math Quiz",
            thumbnail: "/assets/projects/math-quiz.png",
            description: "A math quiz for kids with easy and infinite questions.\n" +
                "The quiz is divided into four parts and also tells you the correct answer.",
            link: "https://scratch.mit.edu/projects/327341005/embed",
            linkType: "embed",
        },
        {
            _id: "2",
            title: "Flappy Bird",
            thumbnail: "/assets/projects/flappy-bird.png",
            description: "Help the flappy bird to get as many coins as possible. touch & hold the screen to fly the flappy bird and collect the coins.\n" +
                "\n" +
                "Avoid the bad bird to keep playing.",
            link: "https://scratch.mit.edu/projects/489901833/embed",
            linkType: "embed",
        },
        {
            _id: "3",
            title: "Paddle Ball",
            thumbnail: "/assets/projects/paddle.png",
            description: "Basic Game + Score",
            link: "https://scratch.mit.edu/projects/324159673/embed",
            linkType: "embed",
        }
        ,
        {
            _id: "4",
            title: "Obstacle",
            thumbnail: "/assets/projects/obstacles.png",
            description: "Obstacle game",
            link: "https://scratch.mit.edu/projects/489904629/embed",
            linkType: "embed",
        },
        {
            _id: "5",
            thumbnail:"/assets/projects/catch-the-flags.png",
            title: "Catch the Egg",
            description: "move the basket and catch the egg.",
            link: "https://scratch.mit.edu/projects/142294004/embed",
            linkType: "embed",
        }

    ];
    const apps = [
        {
            _id: "6",
            title: "Insight Out",
            thumbnail: "/assets/projects/inside-out.webp",
            description: "InSight Out is a Quiz Game For The Visually Impaired People. This Game is Total Sound Based Game With Some Basic General Knowledge So People Can Have Fun Acquiring Knowledge.",
            link: "https://play.google.com/store/apps/details?id=appinventor.ai_pvngoswami.Insight_Out",
            linkType: "link",
        },
        {
            _id: "7",
            title: "Doodle Paint",
            thumbnail: "/assets/projects/doodle-paint.webp",
            description: "Paint Anything with Doodle Paint App. A Basic Simple Paint App For Anyone.",
            link: "https://play.google.com/store/apps/details?id=appinventor.ai_aaryangupta167.Doodle_Paint",
            linkType: "link",
        }, {
            _id: "8",
            title: "Maps",
            thumbnail:"/assets/projects/maps.webp",
            description: "this game shows and says exactly where you are. you could see what areas are nearby or mall's that are nearby or what restaurants are nearby.",
            link: "https://play.google.com/store/apps/details?id=appinventor.ai_miraanrai.location",
            linkType: "link",
        }, {
            _id: "9",
            thumbnail:"/assets/projects/space-invader.webp",
            title: "Space Invader",
            description: "In this app, you have to touch the moving saucer with the balls that you have and earn points.",
            link: "https://play.google.com/store/apps/details?id=appinventor.ai_2028mittal.Space_Invader_double_screen",
            linkType: "link",
        },

    ];
    const classes = useStyles();
    return (
        <>
            <Container>
                <Typography variant={"h2"} className={classes.courseLevelTitle}>Games done by
                    Students</Typography>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    autoplay
                    navigation
                    breakpoints={{
                        0: {
                            slidesPerView: 1.5,
                            spaceBetween: 10,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        }
                    }}
                    className={classes.swiperWrapper}
                >
                    {projects.map((item, key) => {
                        return (
                            <SwiperSlide key={key}>
                                <Project item={item}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Container>
            <Container>
                <Typography variant={"h2"} className={classes.courseLevelTitle}>Apps done by
                    Students</Typography>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    autoplay
                    navigation
                    breakpoints={{
                        0: {
                            slidesPerView: 1.5,
                            spaceBetween: 10,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        }
                    }}
                    className={classes.swiperWrapper}
                >
                    {apps.map((item, key) => {
                        return (
                            <SwiperSlide key={key}>
                                <Project item={item}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Container>
        </>
    );
}
const Course = ({item}) => {
    const classes = useStyles();
    const [purchase, setPurchase] = useState(false);
    const [demoClass, setDemoClass] = useState(false);
    return (
        <Grid item xs={12} md={4} lg={4}>
            <Link href={`/courses/${item?._id}`}>
                <a style={{textDecoration: "none", color: "#777575ee"}}>
                    <Box>
                        <Box className={classes.courseWrapper}>
                            <CardMedia
                                className={classes.courseMedia}
                                image={item?.cover ? `${process.env.S3_URL}${item?.cover}` : "/assets/hero-home-banner.png"}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2"
                                            className={classes.courseName}>
                                    {item?.title}
                                </Typography>
                                <List>
                                    {item?.modules?.map((module) => {
                                        return (
                                            <ListItem disableGutters={true}
                                                      style={{padding: 0}}
                                                      key={module?._id}>
                                                <ListItemAvatar style={{minWidth: 38}}>
                                                    <CheckCircleOutlineIcon
                                                        style={{color: "#26BD0F"}}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    className={classes.pointsText}
                                                    primary={module?.title}
                                                />
                                            </ListItem>
                                        )
                                    })}
                                    <ListItem disableGutters={true}
                                              style={{paddingTop: 8, paddingBottom: 8}}>
                                        <ListItemText
                                            style={{textAlign: "center"}}
                                            primary={<Typography variant={"h6"}
                                                                 className={classes.discountPrice}>Rs.
                                                {item?.discountPrice}/Class &nbsp; &nbsp;
                                                <Typography variant={"subTitle"}
                                                            className={classes.actualPrice}>Rs.{item?.price}</Typography>
                                            </Typography>}
                                        />
                                    </ListItem>
                                </List>


                                <Box
                                    className={classes.bottomBtns}>
                                    <Button size={"small"} className={classes.freeDemoBtn}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setDemoClass(true)
                                            }}>
                                        Free Demo
                                    </Button>
                                    <Button size="small" color="primary"
                                            className={classes.profileBtn}
                                            onClick={(e) => {
                                                // e.preventDefault();
                                                // setPurchase(true)
                                            }}>
                                        More Info
                                    </Button>
                                </Box>
                            </CardContent>
                        </Box>
                    </Box>
                </a>
            </Link>
            {/*{purchase &&*/}
            {/*<PurchaseCourse open={purchase} setOpen={setPurchase}*/}
            {/*                course={item}/>}*/}
            {demoClass &&
            <RequestDemoClass open={demoClass} setOpen={setDemoClass}
                              course={item}/>}
        </Grid>
    )
}

export default Index;
