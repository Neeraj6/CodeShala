/*
 * @author Gaurav Kumar
 */

import React from "react";
import {
    Box,
    Typography,
    Grid,
    Container,
    List,
    ListItemText,
    ListItemAvatar,
    ListItem,
    Divider
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import BookFreeClass from "./BookFreeClass";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
    footerMenu: {
        // backgroundImage: "linear-gradient(90deg, #7094fb, #58b8fb)",
        backgroundImage: "url(/assets/footer.svg)",
        backgroundSize: "cover",
        // backgroundRepeat:"no-repeat",
        paddingTop: "18rem",
        paddingBottom: "2rem",
        [theme.breakpoints.down('md')]: {
            paddingTop: "35rem",
            marginTop: "-25rem"
        },
    },
    companyName: {
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "1.5em",
        color: "white",
        textAlign: "center"
    },
    companyDesc: {
        color: "white",
        fontSize: "1em",
        fontWeight: 200,
        fontFamily: "Poppins",
        textAlign: "center",
        margin: "1rem 0rem 0rem"
    },
    socialLink: {
        color: "white",
        margin: "1rem 0.7rem",
        fontSize: "2em"
    },
    navLink: {
        display: "block",
        color: "white",
        textDecoration: "none",
        fontSize: "1em",
        fontWeight: 400,
        textAlign: "left",
        minWidth: "10rem",
        fontFamily: "Poppins",
        margin: "0rem 0rem 0.8rem 2rem",
        [theme.breakpoints.down('md')]: {
            minWidth: "100%",

        },
    },
    rightNavIcon: {
        color: "white",
        fontSize: "2em"
    },
    rightNavText: {
        color: "white",
        fontFamily: "Poppins",
        fontWeight: 300,
        fontSize: "1.1em"
    },
    copyRightText: {
        color: "white",
        fontFamily: "Poppins",
        textAlign: "center",
        fontWeight: 300,
        margin: "1rem 0rem",
        paddingBottom: "1rem",
        fontSize: "1.1em"
    },
    navLinkBox: {
        [theme.breakpoints.down('md')]: {
            margin: "4rem 0rem",
        },
    },
    footerCurve: {
        backgroundImage: "url(/assets/footer-bg.svg)",
        backgroundSize: "cover",
        width: "100%",
        height: "6rem",
        [theme.breakpoints.up('md')]: {
            height: "15rem"
        },
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <Box className={classes.container} style={{
            backgroundImage: "url(/assets/pattern.svg)",
            backgroundSize: "cover"
        }}>
            {/*<Box className={classes.footerCurve}/>*/}
            <footer className={classes.footerMenu}>
                <Container style={{paddingTop: "6rem"}}>
                    <Grid container>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box>
                                <Typography variant={"h3"} className={classes.companyName}>CODESHALA</Typography>
                                <Typography variant={"body2"} className={classes.companyDesc}>Codeshala is a leading coding platform for kids. Through its award-winning courses, students learn how to code. Codeshala offers an engaging and enjoyable curriculum for schools, after-school clubs, and camps as well as self-paced online courses to learn coding at home.
                                </Typography>
                                <Box style={{display: "flex", justifyContent: "center"}}>
                                    <a href={"https://www.facebook.com/CodeShala.in/"} target={"_blank"}>
                                        <FacebookIcon className={classes.socialLink}/>
                                    </a>
                                    <a href={"https://twitter.com/codeshala_in/"} target={"_blank"}>
                                        <TwitterIcon className={classes.socialLink}/>
                                    </a>
                                    <a href={"https://www.instagram.com/codeshala/"} target={"_blank"}>
                                        <InstagramIcon className={classes.socialLink}/>
                                    </a>
                                    <a href={"https://www.youtube.com/channel/UCVPGcbbQTmotnLbA6FpZ8iw/"} target={"_blank"}>
                                        <YouTubeIcon className={classes.socialLink}/>
                                    </a>
                                    <a href={"https://lu.linkedin.com/company/codeshala/"} target={"_blank"}>
                                        <LinkedInIcon className={classes.socialLink}/>
                                    </a>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4} className={classes.navLinkBox}>
                            <Box style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <Link href={"/"}>
                                    <a className={classes.navLink}>Home</a>
                                </Link>
                                <Link href={"/about"}>
                                    <a className={classes.navLink}>About</a>
                                </Link>
                                <Link href={"/courses"}>
                                    <a className={classes.navLink}>Courses</a>
                                </Link>
                                <Link href={"/contact"}>
                                    <a className={classes.navLink}>Contact Us</a>
                                </Link>
                                {/*<Link href={"/join-us"}>*/}
                                {/*    <a className={classes.navLink}>Join Us</a>*/}
                                {/*</Link>*/}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <List style={{padding: 0, marginTop: -10}}>
                                <a href={"tel:+91 9485878080"} style={{textDecoration: "none"}}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <PhoneIcon className={classes.rightNavIcon}/>
                                        </ListItemAvatar>
                                        <ListItemText primary={"+91 9485878080"} className={classes.rightNavText}
                                                      disableTypography/>
                                    </ListItem>
                                </a>
                                <a href={"mailto:support@codeshala.in"} style={{textDecoration: "none"}}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <MailIcon className={classes.rightNavIcon}/>
                                        </ListItemAvatar>
                                        <ListItemText primary={"support@codeshala.in"} className={classes.rightNavText}
                                                      disableTypography/>
                                    </ListItem>
                                </a>
                                <ListItem>
                                    <ListItemAvatar>
                                        <BusinessIcon className={classes.rightNavIcon}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={"129B, Malviya Nagar, New Delhi (110017)"}
                                                  className={classes.rightNavText} disableTypography/>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                    <Divider style={{backgroundColor: "#ffffff63", margin: "4rem 0rem"}}/>
                    <Typography variant={"body1"} className={classes.copyRightText}>
                        &#169; CODESHALA | All Rights Reserved 2020
                    </Typography>
                </Container>
            </footer>
        </Box>
    );
};

export default Footer;
