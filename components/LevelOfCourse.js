/*
 * @author Gaurav Kumar
 */

import React from "react";
import {Box, CardContent, CardMedia, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DescriptionIcon from '@material-ui/icons/Description';
import {makeStyles} from "@material-ui/core/styles";

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
        [theme.breakpoints.down('md')]: {
            marginTop: "6rem",
        },
    },
    studentWrapper: {
        // boxShadow: "6px 10px 40px #00000029",
        borderRadius: "2rem",
        border: "1px solid #00000029",
        margin: "3rem 1.5rem",
        [theme.breakpoints.down("xs")]: {
            margin: "0.5rem 0.5rem"
        }
    },
    studentMedia: {
        height: "11rem",
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
        position: "absolute",
        "&:hover": {
            backgroundColor: "#0FBD8C",
            color: "white",
        }
    },
    description: {
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
        overflow: "hidden"
    }
}));
const LevelOfCourse = ({course}) => {
    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.studentWrapper}>
                <CardMedia
                    className={classes.studentMedia}
                    image={course?.cover ? `${process?.env?.S3_URL}${course?.cover}`:"/assets/hero-home-banner.png"}
                    title={course?.title}
                />
                <CardContent>
                    <Typography variant="h5" component="h2" className={classes.studentName}>
                        {course?.title}
                    </Typography>
                    <List>
                        <ListItem disableGutters={true} style={{padding: 0}}>
                            <ListItemAvatar style={{minWidth: 38}}>
                                <DescriptionIcon style={{color: "#38B6FF"}}/>
                            </ListItemAvatar>
                            <ListItemText
                                className={classes.description}
                                primary={course?.description}
                            />
                        </ListItem>
                        <ListItem disableGutters={true} style={{padding: 0}}>
                            <ListItemAvatar style={{minWidth: 38}}>
                                <AccountCircleIcon style={{color: "#FFBF00"}}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`Rs. ${course?.discountPrice}`}
                            />
                        </ListItem>
                    </List>
                    {/*<ListItem disableGutters={true} style={{paddingTop: 0, paddingBottom: 8}}>*/}
                    {/*    <ListItemAvatar style={{minWidth: 38}}>*/}
                    {/*        <CodeIcon style={{color: "#38B6FF"}}/>*/}
                    {/*    </ListItemAvatar>*/}
                    {/*    <ListItemText*/}
                    {/*        primary="Course Taken - Course Name"*/}
                    {/*    />*/}
                    {/*</ListItem>*/}
                    {/*<Box style={{display: "flex", justifyContent: "flex-end", position: "relative"}}>*/}
                    {/*    <Button size="small" color="primary" className={classes.profileBtn}>*/}
                    {/*        Buy Now*/}
                    {/*    </Button>*/}
                    {/*</Box>*/}
                </CardContent>
            </Box>
        </Box>
    );
};

export default LevelOfCourse;
