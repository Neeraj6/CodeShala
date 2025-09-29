/*
 * @author Gaurav Kumar
 */
import React from "react";
import {Box, Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Image from "material-ui-image";

const useStyles = makeStyles(theme => ({
    rightBox: {
        // backgroundColor: "#FFBF00A6",
    },
    title: {
        color: "white",
        fontSize: "3.8em",
        maxWidth: "30rem",
        fontFamily: "Raleway",
        fontWeight: 600,
        textAlign: "center",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center"
        }
    },
    subTitle: {
        color: "white",
        fontSize: "1em",
        maxWidth: "31rem",
        marginBottom: "1rem",
        fontWeight: 400,
        fontFamily: "Poppins, Raleway",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center"
        }
    },
    imageWrapper: {
        // maxHeight:"13rem",
        // overflow:"hidden"
    }
}));

const OurVision = () => {
    const classes = useStyles();
    return (
        <Container>
            <Grid container>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={6}>
                            <Box className={classes.imageWrapper}>
                                <Image src={"/assets/vision/2.png"} style={{backgroundColor:"transparent",  borderRadius:"50%", overflow:"hidden"}}/>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Box className={classes.imageWrapper}>
                                <Image src={"/assets/vision/4.png"} style={{backgroundColor:"transparent"}}/>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Box className={classes.imageWrapper}>
                                <Image src={"/assets/vision/1.png"} style={{backgroundColor:"transparent", borderRadius:"50%"}}/>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Box className={classes.imageWrapper}>
                                <Image src={"/assets/vision/3.png"} style={{backgroundColor:"transparent"}}/>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8} style={{display: "flex", justifyContent: "center"}}>
                    <Box className={classes.rightBox}>
                        <Typography variant={"h2"} className={classes.title}>Our</Typography>
                        <Typography variant={"h2"} className={classes.title}
                                    style={{marginBottom: "1.5rem"}}>Vision</Typography>
                        <Typography variant={"body1"} className={classes.subTitle}>
                            Codeshala’s vision is to make coding available for kids all around this country and to make it easily accessible and fun to learn.</Typography>
                        <Typography variant={"body1"} className={classes.subTitle}>
                            We envision a global playful learning experience where the next generations of coders are born and raised through an engaging platform for the oncoming generation where programming knowledge is acquired alongside 21st-century skills through collaborative learning and solving puzzles, inventing, and sharing.  &nbsp;&nbsp;
                            {/*<Link href={"/about"}><a>READ MORE</a></Link>*/}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OurVision;
