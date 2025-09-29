/*
 * @author Gaurav Kumar
 */

import React from "react";
import {
    Box, Button,
    CardContent,
    CardMedia,
    Container,
    Grid,
    List,
    ListItem,
    ListItemAvatar, ListItemText,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CodeIcon from "@material-ui/icons/Code";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import JoinUsAsCenter from "../../components/JoinUsAsCenter";

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: "10rem",
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
    },
    studentWrapper: {
        boxShadow: "0px 20px 20px #656D7441",
        borderRadius: "2rem",
        border: "1px solid #00000029",
        margin: "3rem 1.5rem",
        [theme.breakpoints.down('xs')]: {
            margin:"2rem 1rem"
        }
    },
    studentMedia: {
        height: "20rem",
        borderTopLeftRadius: "2rem",
        borderTopRightRadius: "2rem"
    },
    studentName: {
        textAlign: "center"
    },
    studentAchivementWrapper: {},
    studentStack: {},
    profileBtn: {
        backgroundColor: "#FFBF00",
        borderRadius: 5,
        color: "white",
        padding: "0.3rem 1rem",
        textTransform: "capitalize",
        fontSize: "1em",
        boxShadow: "0px 20px 20px #656D7441",
        position: "absolute",
        "&:hover": {
            backgroundColor: "#0FBD8C",
            color: "white",
        }
    }
}));

const Projects = () => {
    const classes = useStyles();
    let centers = [1, 2, 3, 4, 5];
    return (
        <Box>
            <Head>
                <title>Codeshala Centers </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main style={{paddingTop: "6rem"}}>
                <Container>
                    <Typography variant={"h2"} className={classes.title}>Our Centers</Typography>
                    <Grid container>
                        {centers.map((item, key) => {
                            return (
                                <Grid item key={key} xs={12} md={4}>
                                    <Box className={classes.studentWrapper}>
                                        <CardMedia
                                            className={classes.studentMedia}
                                            image="/assets/hero-home-banner.png"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography variant="h5" component="h2" className={classes.studentName}>
                                                Center Name
                                            </Typography>
                                            <List>
                                                <ListItem disableGutters={true} style={{padding: 0}}>
                                                    <ListItemAvatar style={{minWidth: 38}}>
                                                        <LocationOnIcon style={{color: "#38B6FF"}}/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Location of center"
                                                    />
                                                </ListItem>
                                                <ListItem disableGutters={true} style={{padding: 0}}>
                                                    <ListItemAvatar style={{minWidth: 38}}>
                                                        <PhoneIcon style={{color: "#0FBD8C"}}/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="+911230456789"
                                                    />
                                                </ListItem>
                                            </List>

                                            <Box style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                position: "relative"
                                            }}>
                                                <Button size="small" color="primary" className={classes.profileBtn}
                                                        style={{right: "1rem"}}>
                                                    Google Map
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </main>
            <JoinUsAsCenter/>
            <Footer/>
        </Box>
    );
};

export default Projects;
