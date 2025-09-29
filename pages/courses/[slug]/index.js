/*
 * @author Gaurav Kumar
 */

import React, {useContext, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Collapse,
    Container,
    Dialog,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import Image from "material-ui-image";
import {makeStyles} from "@material-ui/core/styles";
import LevelOfCourse from "../../../components/LevelOfCourse";
import Head from "next/head";
import {useRouter} from 'next/router';
import Header from "../../../components/Header";
import BookFreeClass from "../../../components/BookFreeClass";
import Footer from "../../../components/Footer";
import StudentAchievers from "../../../components/StudentAchievers";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {AuthContext} from "../../../context/auth";
import RequestDemoClass from "../../../components/RequestDemoClass";
import {Alert} from "@material-ui/lab";
import Loader from "../../../components/Loader";
import ErrorPage from "../../../components/ErrorPage";

const useStyles = makeStyles(theme => ({
    courseImageWrapper: {
        width: "90%",
        position: "relative",
        margin: "1rem",
        "&:after": {
            content: '""',
            right: "-1.9rem",
            position: "absolute",
            top: "-1.9rem",
            bottom: "0rem",
            left: 0,
            zIndex: -1,
            backgroundColor: "#FFBF00",
            borderRadius: "2rem",
        },
        "&:before": {
            content: '""',
            right: "0",
            position: "absolute",
            top: "0rem",
            bottom: "-1.9rem",
            left: "-1.9rem",
            zIndex: -1,
            borderRadius: "2rem",
            backgroundColor: "#38B6FF"
        }
    },
    courseDetails: {
        display: "flex",
        padding: "1rem",
        margin: "1rem 1rem 2rem",
        position: "relative",
        [theme.breakpoints.down("xs")]: {
           maxWidth:"100%",
            margin: "1rem 1rem 1rem",
        }
    },
    courseDesc: {
        backgroundColor: "#38B6FF",
        borderRadius: "1.2rem",
        padding: "1rem",
        margin: "1rem 1rem 2rem"
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
        fontFamily: "Poppins, Raleway",
        fontWeight: 300,
        fontSize: "0.9em",
        whiteSpace:"pre-line"
    },
    courseDetailBox: {
        backgroundColor: "white",
        boxShadow: "0px 5px 50px #00000029",
        borderTopRightRadius: "1rem",
        borderBottomRightRadius: "1rem",
        padding: "1rem 2rem 0rem 17rem",
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            padding: "7rem 1rem 0rem 1rem"
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
        textAlign: "center",
        color: "#545469",
        fontWeight: 500,
        fontFamily: "Poppins",
        fontSize: "3em",
        margin: "1rem 0rem",
        overflowWrap:"break-word"
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
    wrapper: {
        padding: "2rem"
    },
    title: {
        fontFamily: "Raleway",
        color: "#524d4d",
        fontWeight: 600,
        marginBottom: 25
    },
    createBtn: {
        backgroundColor: "#0FBD8C",
        color: "white",
        width: "50%",
        "&:hover": {
            backgroundColor: "#0FBD8C"
        },
        margin: "auto"
    }
}));
const COURSE = gql`
    query COURSE($slug:ID!) {
        course(courseId: $slug){
            _id
            title
            description
            price
            slug
            discountPrice
            cover
            modules{
                _id
                title
                watchTime

            }
            levels{
                _id
                classes
                discountPrice
                price
            }
        }
    }
`;
const PURCHASE = gql`
    mutation($courseId:ID!, $kidId:ID!, $level:Int!){
        purchase(courseId:$courseId, kidId:$kidId, level:$level){
            _id
            transactionId
            orderId
            amount
            status
        }
    }
`;
const Course = () => {
    const classes = useStyles();
    const router = useRouter();
    const {slug} = router.query;
    let {data, loading, error} = useQuery(COURSE, {variables: {slug}});
    const [purchase, setPurchase] = useState(false);
    const [demoClass, setDemoClass] = useState(false);
    return (
        <div>
            <Head>
                <title>Codeshala Courses </title>
                <link rel="icon" href="/favicon.ico"/>
                <script src="https://checkout.razorpay.com/v1/checkout.js"/>
            </Head>
            <Header/>
            <main style={{paddingTop: "7rem"}}>
                {loading ?
                    <>
                        <Loader/>
                        {/*<Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={10} mb={10}>*/}
                        {/*    <CircularProgress size={30}/>*/}
                        {/*</Box>*/}
                    </>
                    : error ? <ErrorPage error={error} message={error?.description}/>
                        :
                        data?.course !== null ?
                        <Box>
                            <Container style={{marginBottom:50}}>
                                <Grid container>
                                    <Grid item xs={12} md={4}
                                          style={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              padding: "1rem"
                                          }}>
                                        <Box className={classes.courseImageWrapper}>
                                            <Image src={`${process.env.S3_URL}${data?.course?.cover}`}/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Box className={classes.courseDetails}>
                                            <Box className={classes.whatYouLearn}>
                                                <Typography variant={"h5"} className={classes.pointsTitle}>What you'll
                                                    learn</Typography>
                                                {data?.course?.modules?.map((module) => {
                                                    return (
                                                        <Typography variant={"body1"} className={classes.points}
                                                                    key={module?._id}>{module?.title}</Typography>
                                                    )
                                                })}
                                            </Box>
                                            <Box className={classes.courseDetailBox}>
                                                <Typography variant="h5" component="h2"
                                                            className={classes.courseName}>
                                                    {data?.course?.title}
                                                </Typography>
                                                <Typography variant={"h6"}
                                                            className={classes.discountPrice}>Rs.
                                                    {data?.course?.discountPrice} /Class &nbsp;&nbsp;
                                                    <Typography variant={"subTitle"}
                                                                className={classes.actualPrice}>Rs.{data?.course?.price}</Typography>

                                                </Typography>
                                                <Box
                                                    className={classes.bottomBtns}>
                                                    <Button size={"small"} className={classes.freeDemoBtn}
                                                            onClick={() => setDemoClass(true)}>
                                                        Free Demo
                                                    </Button>
                                                    {demoClass &&
                                                    <RequestDemoClass open={demoClass} setOpen={setDemoClass}
                                                                      course={data?.course}/>}
                                                    <Button size="small" color="primary"
                                                            className={classes.profileBtn}
                                                            onClick={() => setPurchase(true)}
                                                            disabled={loading}>
                                                        Buy Now
                                                    </Button>
                                                    {purchase &&
                                                    <PurchaseCourse open={purchase} setOpen={setPurchase}
                                                                    course={data?.course}/>}
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box className={classes.courseDesc}>
                                            <Typography variant={"h6"} style={{
                                                color: "white",
                                                textAlign: "center",
                                                fontSize: "1.5em",
                                                fontWeight: 600,
                                                marginBottom: 10
                                            }}>Course Description</Typography>
                                            <Typography variant={"body2"} className={classes.courseDescText}>
                                                {data?.course?.description} </Typography>
                                            {/*<Typography variant={"body2"} className={classes.courseDescText}>Codeshala*/}
                                            {/*    Believes*/}
                                            {/*    That By*/}
                                            {/*    Starting To Code At A Younger Age. It Opens A Kids Mind To Creative*/}
                                            {/*    “Problem*/}
                                            {/*    Solving”*/}
                                            {/*    Thinking and Becomes An Extension Of How Kids Can Express*/}
                                            {/*    Themselves. </Typography>*/}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Container>
                            <StudentAchievers/>
                        </Box>
                            : <ErrorPage message={"Course doesn't exists"}/>
                }
            </main>
            <BookFreeClass/>
            <Footer/>
        </div>
    );
};


const LEVELS = gql`
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

const Levels = () => {
    const classes = useStyles();
    const router = useRouter();
    const {slug} = router.query;
    let {data, loading, error} = useQuery(LEVELS);
    let levels = [1, 2, 3, 4, 5];
    const [purchase, setPurchase] = useState(false);
    const [demoClass, setDemoClass] = useState(false);
    return (
        <Container>
            <Typography variant={"h2"} className={classes.courseLevelTitle}>Levels of
                courses</Typography>
            <Grid container className={classes.levelsList} spacing={4}>
                {data?.courses?.docs?.map((item, key) => {
                    return (
                        <Grid item key={key} xs={12} md={4}>
                            <LevelOfCourse course={item}/>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
}

const CHECK_PAYMENT = gql`
    query CHECK_PAYMENT($orderId:ID!){
        checkPayment(orderId:$orderId){
            _id
            transactionId
            orderId
            amount
            status
        }
    }
`;

export const PurchaseCourse = ({open, setOpen, course}) => {
    const classes = useStyles();
    const [kid, setKid] = useState(undefined);
    let {profile, isAuthenticated, setSuccess, setError, setMessage} = useContext(AuthContext);
    const [checkPayment, {data, called}] = useLazyQuery(CHECK_PAYMENT);
    const [purchase, {loading}] = useMutation(PURCHASE);
    const [level, setLevel] = useState(undefined);
    const [levelIndex, setLevelIndex] = useState(0);
    const [e, setE] = useState(false);
    const [message, setM] = useState("");
    const levels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
    const submitForm = (event) => {
        if (kid) {
            purchase({
                variables: {
                    courseId: course?._id,
                    kidId: kid?._id,
                    level: level
                }
            })
                .then(({data}) => {
                    let options = {
                        "key": "rzp_live_95HHOt821TyzT5",
                        "amount": (data?.purchase?.amount * 100), // 2000 paise = INR 20, amount in paisa
                        "name": "CODESHALA",
                        "description": course?.title,
                        "image": "/favicon.ico",
                        "order_id": data?.purchase?.orderId,
                        "handler": function (response) {
                            checkPayment({
                                variables: {
                                    orderId: data?.purchase?.orderId
                                }
                            });
                            setSuccess(true);
                            setMessage(`Your payment successful with payment id : ${response.razorpay_payment_id}`);

                        },
                        "prefill": {
                            "name": profile?.profile?.name,
                            "email": profile?.profile?.email,
                            "contact": profile?.profile?.phone
                        },
                        "notes": {
                            "address": profile?.profile?.city
                        },
                        "theme": {
                            "color": "#F37254"
                        }
                    };

                    let rzp = new Razorpay(options);
                    rzp.open();
                    setOpen(false)
                    event.preventDefault();
                })
                .catch(e => {
                    console.log(e)
                    setError(true);
                    setMessage(e?.message);
                })
        } else {
            let m = "";
            if (!kid) {
                m += "Select student. "
            }
            if (!level) {
                m += "Select package"
            }
            setE(true);
            setM(m);
        }

    }
    return (
        <Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box className={classes.wrapper}>
                    {isAuthenticated ?
                        profile?.role === "parent" ?
                            <>
                                <Typography variant={"body1"} className={classes.title}>Number of classes will depend on the child’s evaluation after the demo class</Typography>
                                {(e) &&
                                <Collapse in={e}>
                                    <Alert varaint={"filled"} severity={"error"}>{message}</Alert>
                                </Collapse>
                                }
                                <FormControl style={{width: "100%", marginBottom: 15}}>
                                    <InputLabel id="demo-simple-select-label">Select Kid</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={kid}
                                        onChange={e => setKid(e.target.value)}
                                    >
                                        {profile?.profile?.kids?.map((kid, key) => {
                                            return (
                                                <MenuItem value={kid} key={key}>{kid?.profile?.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl style={{width: "100%", marginBottom: 15}}>
                                    <InputLabel id="demo-simple-select-label">Select package</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label2"
                                        id="demo-simple-select2"
                                        value={level}
                                        onChange={e => setLevel(e.target.value)}
                                    >
                                        {levels?.map((l, key) => {
                                            return (
                                                <MenuItem value={l} key={key}>{l} Classes</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl style={{width: "100%", marginTop: 10}}>
                                    <Button variant={"contained"} className={classes.createBtn} onClick={submitForm}>
                                        {loading ? <CircularProgress size={30} style={{color: "white"}}/> : "Buy"}
                                    </Button>
                                </FormControl>
                            </>
                            :
                            <Typography variant={"body1"} className={classes.title}>You are not authorized for this
                                action..</Typography>
                        :
                        <Typography variant={"body1"} className={classes.title}>You are not logged in..</Typography>
                    }
                </Box>
            </Dialog>
        </Box>
    )
}

export default Course;
