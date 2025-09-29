/*
 * @author Gaurav Kumar
 */

import React from "react";
import {Box, Typography} from "@material-ui/core";
import {Swiper, SwiperSlide} from 'swiper/react';
import Image from "material-ui-image";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    title: {
        textAlign: "center",
        color: "#324966",
        fontFamily: "Raleway",
        fontSize: "2.5em",
        fontWeight: 500,
        margin: "2.5rem",
    },
    courseItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    courseImageWrapper: {
        width: "5.5rem",
        height: "5.5rem"
    },
    courseTitle: {
        color: "#324966",
        fontSize: "1.1em",
        fontFamily: "Poppins",
        fontWeight: 500,
        margin: "1rem 0rem",
        textAlign: "center"
    },
});

const OurCenters = (props) => {
    const classes = useStyles();
    let centers = [{
        name: "Noida"
    },
        {
            name: "Gurugram"
        },
        {
            name: "Hauz Khas"
        },
        {
            name: "Pitampura"
        },
        {
            name: "Sainik Farms"
        },
        {
            name: "Punjabi Bagh"
        },
        {
            name: "Shalimar Bagh"
        },
        {
            name: "Rajokari"
        },
        {
            name: "Shivalik"
        },
        {
            name: "South Ex"
        }]
    return (
        <Box style={{marginBottom: "6rem"}}>
            <Typography variant={"h2"} className={classes.title}>We're also at</Typography>
            <Swiper
                spaceBetween={10}
                slidesPerView={2}
                autoplay
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 6,
                        spaceBetween: 40,
                    }
                }}
            >
                {centers.map((item, key) => {
                    return (
                        <SwiperSlide key={key}>
                            <Box className={classes.courseItem}>
                                {/*<Box className={classes.courseImageWrapper}>*/}
                                {/*    <Image src={"/assets/company.png"}/>*/}
                                {/*</Box>*/}
                                <Typography variant={"h3"} className={classes.courseTitle}>{item?.name}</Typography>
                            </Box>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Box>
    );
};

export default OurCenters;
