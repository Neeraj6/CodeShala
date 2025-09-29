/*
 * @author Gaurav Kumar
 */

import React, {useContext, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {gql, useMutation} from "@apollo/client";
import {AuthContext} from "../context/auth";
import CareerForm from "../components/CareerForm";

const useStyles = makeStyles(theme => ({
    title: {
        color: "white",
        fontFamily: "Raleway",
        fontSize: "4em",
        fontWeight: 600,
        position: "relative",
        marginBottom: "2rem",
        "&:after": {
            content: "''",
            position: "absolute",
            bottom: 0,
            left: 5,
            width: "4rem",
            height: 2,
            backgroundColor: "white"
        }
    },
    heroContainerWrapper: {
        backgroundColor: "#0FBD8C", position: "relative",
        minHeight: "50rem",
        [theme.breakpoints.down('xs')]: {
            minHeight: "67rem",
        }
    },
    codeInput: {
        "&:before, :hover": {
            borderBottom: "0px !important"
        },
        "&:after": {
            content: "none"
        },
        "&.MuiSelect-select": {
            backgroundColor: "rgba(255,255,255,0)"
        },
        "&.MuiSelect-select:hover": {
            backgroundColor: "rgba(255,255,255,0)"
        }
    },
    heroContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url(/assets/contact-us-hero.svg)",
        backgroundSize: "contain",
        backgroundPositionX: "right",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down('xs')]: {
            backgroundImage: "none"
        }
    },
    contactItem: {
        color: "white",
        border: "4px solid #ffffff30",
        margin: "1rem 0rem",
        padding: "0.5rem 1rem",
        fontWeight: 500,
        fontFamily: "Poppins",
        width: "fit-content"
    },
    contactItemText: {
        fontWeight: 500,
        fontFamily: "Poppins",
        fontSize: "1.3em"
    },
    whatsappBtn: {
        backgroundColor: "#10E6A1",
        boxShadow: "0px 19px 20px #656D7441",
        borderRadius: 10,
        color: "white",
        padding: "0.5rem 1.2rem"
    },
    inputPhone: {
        borderRadius: "3rem",
        padding: "1.5rem 2rem",
        color: "white",
        border: "1px solid white",
        backgroundColor: "rgb(232, 240, 254)",
        fontSize: "1.5em",
        "&:focus": {
            outline: "none"
        },
        "&::placeholder": {
            color: "white"
        },
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            marginBottom: "1rem"
        }
    },
    submitBtn: {
        backgroundColor: "#38B6FF",
        textTransform: "capitalize",
        color: "white",
        borderRadius: 10,
        marginLeft: "2rem",
        padding: "0.5rem 3rem",
        fontSize: "1.5em",
        boxShadow: "0px 19px 20px #656D7441",
        [theme.breakpoints.down('xs')]: {
            margin: "0rem auto"
        },
        "&:hover": {
            backgroundColor: "#38B6FF",
            // boxShadow: "inset 0px 9px 20px #656D7441",
        }
    }
}));
const BOOKFREECLASS = gql`
    mutation BOOKFREECLASS( $phone:String!){
        bookDemoClass(classInput:{
            phone:$phone,
        }){
            _id
            phone
            createdAt
            updatedAt
        }
    }
`;

const Career = () => {
    const classes = useStyles();
    const [phone, setPhone] = useState("");
    const {setSuccess, setError, setMessage, list, code, setCode} = useContext(AuthContext);
    const [bookDemoClass, {loading, data, error}] = useMutation(BOOKFREECLASS);
    const submitForm = (e) => {
        e.preventDefault();
        if (phone?.length === 10) {
            bookDemoClass({variables: {phone: `+${code}-${phone}`}})
                .then(({data}) => {
                    console.log(data);
                    setPhone("");
                    setSuccess(true);
                    setPhone("");
                    setMessage("Your query has been submitted successfully.");
                    // alert("Your query has been submitted successfully.");
                })
                .catch(e => {
                    console.log(e)
                    setError(true);
                    setMessage(e?.message)
                });
        } else {
            setError(true);
            setMessage("Phone no. is not valid.")
        }
        return false;
    };

    return (
        <Box>
            <Head>
                <title>Codeshala Contact Us </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main style={{paddingTop: "6rem"}}>
                <Box className={classes.heroContainerWrapper}>
                    <Box className={classes.heroContainer}>
                        <Container>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Typography variant={"body2"}
                                                style={{
                                                    color: "white",
                                                    fontFamily: "Raleway",
                                                    fontSize: "1.5em",
                                                    marginTop: "3rem"
                                                }}>Get
                                        in
                                        Touch</Typography>
                                    <Typography variant={"h2"} className={classes.title}>Contact Us</Typography>
                                    <Box>
                                        <List style={{display: "flex", flexDirection: "column"}}>
                                            <a href={"mailto:support@codeshala.in"}
                                               style={{textDecoration: "none", maxWidth: "min-content"}}>
                                                <ListItem disableGutters={true} className={classes.contactItem}>
                                                    <ListItemAvatar style={{minWidth: 38}}>
                                                        <MailIcon style={{color: "#FFBF00"}}/>
                                                    </ListItemAvatar>
                                                    <ListItemText>
                                                        <Typography variant={"body1"}
                                                                    className={classes.contactItemText}>support@codeshala.in</Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            </a>
                                            <ListItem disableGutters={true} className={classes.contactItem}>
                                                <ListItemAvatar style={{minWidth: 38}}>
                                                    <LocationOnIcon style={{color: "#FFBF00"}}/>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    <Typography variant={"body1"}
                                                                className={classes.contactItemText}>129B, Malviya Nagar
                                                        <br/>
                                                        New Delhi (110017) </Typography>
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem disableGutters={true}>
                                                <Box>
                                                    <Typography variant={"h2"} style={{
                                                        color: "white",
                                                        fontFamily: "Poppins",
                                                        fontWeight: 600,
                                                        fontSize: "2.0em",
                                                        marginTop: "1.5rem"
                                                    }}>Request a Callback from us</Typography>
                                                    <form onSubmit={submitForm} method={"post"}>
                                                        <Box style={{
                                                            margin: "2rem 0rem",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            flexWrap: "wrap"
                                                        }}>
                                                            <Box className={classes.inputPhone}>
                                                                <Select onChange={e => setCode(e.target.value)}
                                                                        value={code}
                                                                        className={classes.codeInput}
                                                                        inputProps={{'aria-label': 'naked'}}>
                                                                    {list?.map((item, key) => {
                                                                        return (
                                                                            <MenuItem
                                                                                value={item?.dial_code}>{item?.name}</MenuItem>
                                                                        );
                                                                    })}
                                                                </Select>
                                                                <InputBase type={"number"} name="phone"
                                                                           value={phone}
                                                                           placeholder={"Enter your phone"}
                                                                           inputProps={{'aria-label': 'naked'}}
                                                                           onChange={e => {
                                                                               if (!isNaN(e?.target?.value) && e?.target?.value?.length <= 10) {
                                                                                   setPhone(e.target.value)
                                                                               }
                                                                           }}
                                                                           onKeyDown={e => {
                                                                               let invalidChars = ["-", "e", "+", "E"];
                                                                               if (invalidChars.includes(e?.key)) {
                                                                                   e.preventDefault();
                                                                               }
                                                                           }}
                                                                />
                                                            </Box>
                                                            <Button className={classes.submitBtn} disabled={loading}
                                                                    type={"submit"}
                                                                    onClick={submitForm}>
                                                                {loading ? <CircularProgress size={30}
                                                                                             style={{color: "white"}}/> : "Submit"}
                                                            </Button>
                                                        </Box>
                                                    </form>
                                                </Box>
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
                <CareerForm/>
            </main>
            <Footer/>
        </Box>
    );
}

export default Career;
