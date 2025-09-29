/*
 * @author Gaurav Kumar
 */

import React from "react";
import {Avatar, Box, Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';
import SwiperCore, {A11y, Navigation, Pagination, Scrollbar} from 'swiper';
import {gql, useQuery} from "@apollo/client";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles(theme => ({
    title: {
        color: "white",
        fontSize: "3.3em",
        maxWidth: "30rem",
        fontFamily: "Raleway",
        fontWeight: 600,
        textAlign: "left",
    },
    teacherName: {
        marginTop: "1rem",
        color: "white",
        textAlign: "center"
    },
    container: {
        [theme.breakpoints.down("xs")]: {
            paddingTop: "3rem",
            marginBottom: "-8rem"
        }
        // backgroundColor: "#38B6FF"
    },
    sliderWrapper: {
        width: "70%",
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        }
    },
    swiperWrapper: {
        padding: "5rem 0rem", margin: "0rem 0rem",
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
    avatar: {
        width: "9rem",
        height: "9rem"
    }
}));
const USERS = gql`
    query USERS{
        users(limit:8, orderBy:"-updatedAt", page:1, role:"teacher"){
            docs{
                _id
                profile{
                    _id
                    name
                    email
                    phone
                    profilePic
                    status
                }
                role
                createdAt
            }
            totalPages
            prevPage
            nextPage
            totalDocs
            hasNextPage
            hasPrevPage
            page
        }
    }
`;
const OurTeachers = () => {
    const classes = useStyles();
    const {loading, data, error} = useQuery(USERS);
    let teachers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log(data)
    return (
        <Box className={classes.container}>
            <Container>
                <Typography variant={"h2"} className={classes.title}>Our</Typography>
                <Typography variant={"h2"} className={classes.title}>Teachers</Typography>
                <Box className={classes.sliderWrapper}>
                    <Grid container={true} spacing={1}
                          className={classes.swiperWrapper}
                    >
                        {loading && teachers?.map((item, key) => {
                            return (
                                <Grid item lg={3} md={6} sm={6} xs={6} style={{marginBottom: "4rem"}} key={key}>
                                    <Box style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>
                                        <Skeleton
                                            variant={"circle"}
                                            className={classes.avatar}/>
                                        <Skeleton variant={"rect"} width={50} height={18}
                                                  className={classes.teacherName}/>
                                    </Box>
                                </Grid>
                            )
                        })}
                        {data?.users?.docs?.map((item, key) => {
                            return (
                                <Grid item lg={3} md={6} sm={6} xs={6} style={{marginBottom: "4rem"}} key={key}>
                                    <Box style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>
                                        <Avatar
                                            src={item?.profile?.profilePic ? `${process.env.S3_URL}${item?.profile?.profilePic}` : "/assets/pavan.png"}
                                            className={classes.avatar}/>
                                        <Typography variant={"body1"}
                                                    className={classes.teacherName}>{item?.profile?.name}</Typography>
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
};

export default OurTeachers;
