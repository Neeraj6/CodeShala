/*
 * @author Gaurav Kumar
 */


import React from "react";
import {Box, Card, CardContent, Container, Divider, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import {gql, useQuery} from "@apollo/client";

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: "7rem",
        paddingBottom: "4rem"
    },
    title: {
        fontFamily: "Raleway",
        fontSize: "1rem",
        fontWeight: 700,
        color: "#797979",
        marginBottom: 10
    },
    text: {
        color: "#676767",
        fontFamily: "Raleway",
        fontSize: "2rem",
        fontWeight: 400,
        marginLeft: 30
    },
    subText: {
        color: "#676767",
        fontFamily: "Raleway",
        fontSize: "1rem",
        fontWeight: 400,
        marginRight: 20
    },
    box: {
        border: "1px solid #1B9C78",
        borderRadius: 10,
        // margin: "10px 0",
        padding: "0.6rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    statsBox: {
        boxShadow: "0px 0px 46px 5px rgba(0, 0, 0, 0.09)",
        borderRadius: 28
    },
    statsNum: {
        fontSize: "4rem",
        fontFamily: "Raleway",
        color: "#7A7A7A",
        fontWeight: 700,
        textAlign: "center",
        backgroundColor: "#F4F4F4",
        padding: "2rem 1rem"
    },
    statsName: {
        fontSize: "1rem",
        fontFamily: "Raleway",
        color: "rgba(0, 0, 0, 0.7)",
        letterSpacing: "0.06em",
        fontWeight: 700,
        textAlign: "center",
        padding: "0.5rem 1rem"
    },
}));

const TeacherDashboard = () => {
    const classes = useStyles();
    return (
        <Box>
            <Head>
                <title>Codeshala Dashboard </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <Container className={classes.container}>
                <Grid container spacing={4}>
                    <Grid item sm={12} md={8}>
                        <Grid container spacing={4}>
                            {/*<Grid item sm={6}>*/}
                            {/*    <Orders/>*/}
                            {/*</Grid>*/}
                            <Grid item sm={6}>
                                <Classes/>
                            </Grid>
                            <Grid item sm={6}>
                                <DemoClasses/>
                            </Grid>
                            {/*<Grid item sm={6}>*/}
                            {/*    <Courses/>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                    {/*<Grid item sm={12} md={4}>*/}
                    {/*    <Users/>*/}
                    {/*</Grid>*/}
                </Grid>
            </Container>
        </Box>
    )
};

const CLASSES = gql`
    query CLASSES{
        classes(status: "complete"){
            totalDocs
        }
    }
`;

const Classes = () => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(CLASSES);
    return (
        <Box>
            <Link href={"/classes?classType=lecture"}>
                <a style={{textDecoration: "none"}}>
                    <Card className={classes.statsBox}>
                        <CardContent style={{padding: 0}}>
                            <Typography variant={"h6"} className={classes.statsName}>TOTAL CLASSES</Typography>
                            <Typography variant={"h3"}
                                        className={classes.statsNum}>{data?.classes?.totalDocs ? data?.classes?.totalDocs : 0}</Typography>
                        </CardContent>
                    </Card>
                </a>
            </Link>
        </Box>
    )
};

const ORDERS = gql`
    query ORDERS{
        orders{
            totalDocs
        }
    }
`;

const Orders = () => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(ORDERS);
    return (
        <Box>
            <Typography varaint={"h3"} className={classes.title}>Total Orders</Typography>
            <Link href={"/orders"}>
                <a style={{textDecoration: "none"}}>
                    <Box className={classes.box}
                         style={{
                             backgroundColor: "#C3FFEE",
                             width: "fit-content",
                             borderColor: "#1B9C78"
                         }}>
                        <ShoppingCartOutlinedIcon style={{color: "#676767"}}/>
                        <Typography varaint={"body1"} className={classes.text}>{data?.orders?.totalDocs}</Typography>
                    </Box>
                </a>
            </Link>
        </Box>
    )
};

const DEMOCLASSES = gql`
    query CLASSES{
        classes(classType: "demo", status: "complete"){
            totalDocs
        }
    }
`;

const DemoClasses = () => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(DEMOCLASSES);
    return (
        <Box>
            <Link href={"/classes?classType=demo"}>
                <a style={{textDecoration: "none"}}>
                    <Card className={classes.statsBox}>
                        <CardContent style={{padding: 0}}>
                            <Typography variant={"h6"} className={classes.statsName}>DEMO CLASSES</Typography>
                            <Typography variant={"h3"}
                                        className={classes.statsNum}>{data?.classes?.totalDocs ? data?.classes?.totalDocs : 0}</Typography>
                        </CardContent>
                    </Card>
                </a>
            </Link>
        </Box>
    )
};

const COURSES = gql`
    query COURSES{
        courses{
            totalDocs
        }
    }
`;


const Courses = () => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(COURSES);
    return (
        <Box>
            <Typography varaint={"h3"} className={classes.title}>Total Courses</Typography>
            <Link href={"/my-courses"}>
                <a style={{textDecoration: "none"}}>
                    <Box className={classes.box}
                         style={{
                             backgroundColor: "#FFF2CB",
                             width: "fit-content",
                             borderColor: "#BA9834"
                         }}>
                        <ShoppingCartOutlinedIcon style={{color: "#676767"}}/>
                        <Typography varaint={"body1"} className={classes.text}>{data?.courses?.totalDocs}</Typography>
                    </Box>
                </a>
            </Link>
        </Box>
    )
};

const USERS = gql`
    query USERS{
        users{
            totalDocs
            docs{
                role
                _id
            }
        }
    }
`;

const Users = () => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(USERS);
    return (
        <Box>
            <Typography varaint={"h3"} className={classes.title}>Total Users</Typography>
            <Box className={classes.box}
                 style={{backgroundColor: "#F3F3F3", padding: "1rem", borderColor: "#929292"}}>
                <Grid container spacing={3}>
                    <Grid item sm={6}>
                        <Link href={"/users?role=kid"}>
                            <a style={{textDecoration: "none"}}>
                                <Box className={classes.box}
                                     style={{
                                         backgroundColor: "rgba(45, 45, 45, 0.13)",
                                         borderColor: "#B4B4B4", padding: "0.5rem 1.5rem"
                                     }}>
                                    <Typography varaint={"body1"}
                                                className={classes.subText}>Students</Typography>
                                    <PersonOutlineOutlinedIcon style={{color: "#676767"}}/>
                                </Box>
                            </a>
                        </Link>
                    </Grid>
                    <Grid item sm={6}>
                        <Link href={"/users?role=teacher"}>
                            <a style={{textDecoration: "none"}}>
                                <Box className={classes.box}
                                     style={{
                                         backgroundColor: "rgba(45, 45, 45, 0.13)",
                                         borderColor: "#B4B4B4", padding: "0.5rem 1.5rem"
                                     }}>
                                    <Typography varaint={"body1"}
                                                className={classes.subText}>Teachers</Typography>
                                    <PersonOutlineOutlinedIcon style={{color: "#676767"}}/>
                                </Box>
                            </a>
                        </Link>
                    </Grid>
                    <Grid item sm={6}>
                        <Link href={"/users?role=parent"}>
                            <a style={{textDecoration: "none"}}>
                                <Box className={classes.box}
                                     style={{
                                         backgroundColor: "rgba(45, 45, 45, 0.13)",
                                         borderColor: "#B4B4B4", padding: "0.5rem 1.5rem"
                                     }}>
                                    <Typography varaint={"body1"}
                                                className={classes.subText}>Parent</Typography>
                                    <PersonOutlineOutlinedIcon style={{color: "#676767"}}/>
                                </Box>
                            </a>
                        </Link>
                    </Grid>
                    <Grid item sm={6}>
                        <Link href={"/users?role=manager"}>
                            <a style={{textDecoration: "none"}}>
                                <Box className={classes.box}
                                     style={{
                                         backgroundColor: "rgba(45, 45, 45, 0.13)",
                                         borderColor: "#B4B4B4",
                                         padding: "0.5rem 1.5rem"
                                     }}>
                                    <Typography varaint={"body1"} className={classes.subText}>Admin</Typography>
                                    <PersonOutlineOutlinedIcon style={{color: "#676767"}}/>
                                </Box>
                            </a>
                        </Link>
                    </Grid>
                    <Grid item sm={12}>
                        <Divider/>
                        <Typography varaint={"body1"} className={classes.text}
                                    align={"center"}>{data?.users?.totalDocs}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default TeacherDashboard;
