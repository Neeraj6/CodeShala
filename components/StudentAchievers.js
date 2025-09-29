/*
 * @author Gaurav Kumar
 */

import React from "react";
import {
    Box,
    Button,
    CardContent,
    CardMedia,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import Link from "next/link";
import {makeStyles} from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SchoolIcon from '@material-ui/icons/School';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {A11y, Navigation, Pagination, Scrollbar} from 'swiper';
import {formatDistanceToNowStrict} from "date-fns";
import {LocationCity} from "@material-ui/icons";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: "0rem",
        [theme.breakpoints.down('md')]: {
            marginBottom: "0rem",
        },
    },
    title: {
        fontFamily: "Raleway",
        fontSize: "3em",
        fontWeight: 600,
        color: "#545469",
        textAlign: "center",
        [theme.breakpoints.down('md')]: {
            marginTop: "6rem",
        },
    },
    studentWrapper: {
        boxShadow: "6px 10px 40px #00000029",
        borderRadius: "2rem",
        border: "1px solid #00000029"
    },
    studentMedia: {
        height: "10rem",
        borderTopLeftRadius: "2rem",
        borderTopRightRadius: "2rem"
    },
    studentName: {
        textAlign: "center",
        fontSize: "1.2rem",
        marginTop: -9,
        fontWeight: 500,
        fontFamily: "Poppins, Raleway, sans-serif",
        marginBottom: -6
    },
    studentAchivementWrapper: {},
    studentStack: {},
    profileBtn: {
        backgroundColor: "#0FBD8C",
        borderRadius: 5,
        color: "white",
        padding: "0.3rem 1rem",
        textTransform: "capitalize",
        fontSize: "1em",
        position: "absolute",
        "&:hover": {
            backgroundColor: "#0FBD8C",
            color: "white",
        }
    },
    swiperWrapper: {
        padding: "5rem 4rem", margin: "0rem -2rem",
        [theme.breakpoints.down("xs")]: {
            padding: "5rem 0rem",
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
    pointsText: {
        fontSize: "0.85rem",
        "& .MuiListItemText-primary": {
            fontSize: "0.85rem"
        },
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
    }
}));
const StudentAchievers = () => {
    const classes = useStyles();
    let students = [{
        _id: "60b8ebe371a28b1ad08dac39",
        profile: {
            name: "Randitya Singh",
            _id: "5f79b07393a6a449cb62fd6e",
            grade: "8",
            profilePic:"image6.png",
            dob: "1217874600000",
            bio: "Created an SOS app (Alert-X) to help elderly people in an emergency and won Google Code Competition.",
            city: "Gurgaon"
        }
    }, {
        _id: "60b8ec1f71a28b1ad08dac3c",
        profile: {
            name: "Keshav Rana",
            _id: "5f79b07393a6a449cb62fd6e",
            grade: "5",
            profilePic:"image1.png",
            dob: "1315420200000",
            bio: " Created an artificial intelligence math quiz app for visually impaired kids. \n",
            city: "New Delhi"
        }
    }, {
        _id: "60b8ec5b71a28b1ad08dac3f",
        profile: {
            name: "Arham Agarwal",
            _id: "5f79b07393a6a449cb62fd6e",
            grade: "5",
            profilePic:"image3.png",
            dob: "1253989800000",
            bio: " Scratch, MIT App Inventor, HTML/CSS and Python. Published more than 100 projects online.",
            city: "New Delhi"
        }
    }, {
        _id: "60b8ec8f71a28b1ad08dac42",
        profile: {
            name: "Vansh Bilandani",
            _id: "5f79b07393a6a449cb62fd6e",
            grade: "7",
            profilePic:"image2.png",
            dob: "1182247560000",
            bio: "A 13-year code enthusiast from Nigeria created many apps to help schoolmates",
            city: "Lagos"
        }
    }, {
        _id: "60b8eccc71a28b1ad08dac45",
        profile: {
            name: "Miraan Rai",
            _id: "5f79b07393a6a449cb62fd6e",
            grade: "6",
            profilePic:"image5.png",
            dob: "1285525800000",
            bio: "A 10-year-old coder created a carpooling app GoKings for his school",
            city: "Dubai"
        }
    },
        {
            _id: "60b8ed0371a28b1ad08dac48",
            profile: {
                name: "Vivan Lal",
                _id: "5f79b07393a6a449cb62fd6e",
                grade: "5",
                profilePic:"image4.jpg",
                dob: "1308594600000",
                bio: "A guiness book record holder. I love to explore gadgets and I review them. I have a Youtube Channel with 30000 subscribers.",
                city: "New Delhi"
            }
        }];
    return (
        <Container className={classes.container}>
            <Typography variant={"h2"} className={classes.title}>Our Student Achievers</Typography>
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation
                breakpoints={{
                    0: {
                        slidesPerView: 1.5,
                        spaceBetween: 10,
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    }
                }}
                className={classes.swiperWrapper}
            >
                {students.map((item, key) => {
                    return (
                        <SwiperSlide key={key}>
                            <Student user={item}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Container>
    )
};

export const Student = ({user, dummy}) => {
    const classes = useStyles();
    return (
        <Link href={dummy ? '#' : `/profile/${user?._id}`}>
            <a style={{textDecoration: "none", color: "#151515"}}>
                <Box>
                    <Box className={classes.studentWrapper}>
                        <CardMedia
                            className={classes.studentMedia}
                            image={user?.profile?.profilePic ? `${process.env.S3_URL}${user?.profile?.profilePic}` : "/assets/study.jpg"}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2" className={classes.studentName}>
                                {user?.profile?.name ? user?.profile?.name : "Student Name"}
                            </Typography>
                            <List>
                                <ListItem disableGutters={true} style={{padding: 0}}>
                                    {/*<ListItemAvatar style={{minWidth: 38}}>*/}
                                    {/*    <StarIcon style={{color: "#38B6FF"}}/>*/}
                                    {/*</ListItemAvatar>*/}
                                    <ListItemText
                                        className={classes.pointsText}
                                        style={{minHeight:60}}
                                        primary={user?.profile?.bio}
                                    />
                                </ListItem>
                                {/*<ListItem disableGutters={true} style={{padding: 0}}>*/}
                                {/*    <ListItemAvatar style={{minWidth: 38}}>*/}
                                {/*        <StarIcon style={{color: "#38B6FF"}}/>*/}
                                {/*    </ListItemAvatar>*/}
                                {/*    <ListItemText*/}
                                {/*        className={classes.pointsText}*/}
                                {/*        primary="A Great Achievement"*/}
                                {/*    />*/}
                                {/*</ListItem>*/}
                            </List>
                            <Box style={{display: "flex", justifyContent: "space-between", marginTop: 1}}>
                                <ListItem disableGutters={true} style={{padding: 0}}>
                                    <ListItemAvatar style={{minWidth: 38}}>
                                        <AccountCircleIcon style={{color: "#FFBF00"}}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        className={classes.pointsText}
                                        primary={formatDistanceToNowStrict(user?.profile?.dob ? new Date(parseInt(user?.profile?.dob)) : new Date(2014, 0, 3))}
                                    />
                                </ListItem>
                                {user?.profile?.grade &&
                                <ListItem disableGutters={true} style={{padding: 0}}>
                                    <ListItemAvatar style={{minWidth: 38}}>
                                        <SchoolIcon style={{color: "#0CE49F"}}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        className={classes.pointsText}
                                        primary={`Grade ${user?.profile?.grade}`}
                                    />
                                </ListItem>
                                }
                            </Box>
                            <ListItem disableGutters={true} style={{padding: 0, marginBottom: 4}}>
                                <ListItemAvatar style={{minWidth: 38}}>
                                    <LocationCity style={{color: "#38B6FF"}}/>
                                </ListItemAvatar>
                                <ListItemText
                                    className={classes.pointsText}
                                    primary={user?.profile?.city}
                                />
                            </ListItem>
                            <Box style={{display: "flex", justifyContent: "flex-end", position: "relative"}}>
                                <Button size="small" color="primary" className={classes.profileBtn}>
                                    View Profile
                                </Button>
                            </Box>
                        </CardContent>
                    </Box>
                </Box>
            </a>
        </Link>
    );
};

export default StudentAchievers;
