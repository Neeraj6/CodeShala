/*
 * @author Gaurav Kumar
 */


import React from "react";
import {Box, Container, Divider, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import {gql, useQuery} from "@apollo/client";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';

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
    }
}));

const AdminDashboard = () => {
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
                            <Grid item sm={6}>
                                <Orders/>
                            </Grid>
                            <Grid item sm={6}>
                                <Classes/>
                            </Grid>
                            <Grid item sm={6}>
                                <DemoClasses/>
                            </Grid>
                            <Grid item sm={6}>
                                <Courses/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} md={4}>
                        <Users/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
};

const CLASSES = gql`
    query CLASSES{
        classes{
            totalDocs
        }
    }
`;

const Classes = () => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(CLASSES);
    return (
        <Box>
            <Typography varaint={"h3"} className={classes.title}>Total Classes</Typography>
            <Link href={"/classes"}>
                <a style={{textDecoration: "none"}}>
                    <Box className={classes.box}
                         style={{
                             backgroundColor: "#FFE7E7",
                             width: "fit-content",
                             borderColor: "#BC4C4C"
                         }}>
                        <VideocamOutlinedIcon style={{color: "#676767"}}/>
                        <Typography varaint={"body1"} className={classes.text}>{data?.classes?.totalDocs}</Typography>
                    </Box>
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
    query DEMOCLASSES{
        demoClasses{
            totalDocs
        }
    }
`;

const DemoClasses = () => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(DEMOCLASSES);
    return (
        <Box>
            <Typography varaint={"h3"} className={classes.title}>Leads</Typography>
            <Link href={"/demo-classes"}>
                <a style={{textDecoration: "none"}}>
                    <Box className={classes.box}
                         style={{
                             backgroundColor: "#E2F4FF",
                             width: "fit-content",
                             borderColor: "#116B9F"
                         }}>
                        <PersonOutlineOutlinedIcon style={{color: "#676767"}}/>
                        <Typography varaint={"body1"}
                                    className={classes.text}>{data?.demoClasses?.totalDocs}</Typography>
                    </Box>
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
                        <LibraryBooksOutlinedIcon style={{color: "#676767"}}/>
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
                <Grid container spacing={3} alignItems={"center"}>
                    <Grid item sm={6} lg={6} md={6} xs={6}>
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
                    <Grid item sm={6} lg={6} md={6} xs={6}>
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
                    <Grid item sm={6} lg={6} md={6} xs={6}>
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
                    <Grid item sm={6} lg={6} md={6} xs={6}>
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
                    <Grid item sm={12} lg={12} md={12} xs={12}>
                        <Divider/>
                        <Typography varaint={"body1"} className={classes.text}
                                    align={"center"}>{data?.users?.totalDocs}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AdminDashboard;
