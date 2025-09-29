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
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core";
import {Alert} from '@material-ui/lab';
import {makeStyles} from "@material-ui/core/styles";
import Head from "next/head";
import Header from "../components/Header";
import AddIcon from '@material-ui/icons/Add';
import {AuthContext} from "../context/auth";
import {Student} from "./StudentAchievers";
import {gql, useMutation} from "@apollo/client";
import * as EmailValidator from 'email-validator';
import {format} from "date-fns";

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: "7rem",
        paddingBottom: "4rem"
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
    title: {
        fontFamily: "Raleway",
        fontSize: "1.8rem",
        fontWeight: "bold",
        color: "#585858",
        margin: "2rem 0rem",
        textTransform: "uppercase"
    },
    courseProgressText: {
        fontFamily: "Raleway",
        color: "rgba(123, 123, 123, 0.62)",
        fontSize: "0.8rem",
        fontWeight: 500,
        textAlign: "right"
    },
    courseProgress: {
        margin: "0.7rem 0rem",
        backgroundColor: "#C4C4C4",
        borderRadius: 4,
        height: 7,
        "& .MuiLinearProgress-bar": {
            backgroundColor: "#0FBD8C"
        }
    },
    courseName: {
        fontFamily: "Raleway",
        color: "#7C7C7C",
        fontSize: "1.6rem",
        fontWeight: 600
    },
    courseDesc: {
        fontFamily: "Raleway",
        color: "#7C7C7C",
        fontSize: "0.9rem",
        marginBottom: "1rem",
        fontWeight: 500
    },
    courseImage: {
        height: 195,
        width: "100%"
    },
    courseItem: {
        padding: "3rem 3rem"
    },
    startClassBtn: {
        backgroundColor: "#0FBD8C",
        color: "white",
        textTransform: "uppercase",
        fontSize: "0.75em",
        "&:hover": {
            backgroundColor: "#0FBD8C"
        }
    },
    coursesBox: {
        backgroundColor: "#F4F4F4",
        borderRadius: 10
    },
    addProject: {
        margin: "2rem 0rem",
        backgroundColor: "#0FBD8C",
        color: "white",
        boxShadow: "0px 7px 8px rgba(15, 189, 140, 0.32)",
        borderRadius: 10,
        "&:hover": {
            backgroundColor: "#0FBD8C"
        }
    },
    editProject: {
        borderRadius: 10,
        backgroundColor: "#0FBD8C",
        color: "white",
        textTransform: "uppercase",
        fontSize: "0.75em",
        fontWeight: 600,
        "&:hover": {
            backgroundColor: "#0FBD8C"
        }
    },
    moreProject: {
        borderRadius: 10,
        backgroundColor: "#38B6FF",
        color: "white",
        textTransform: "uppercase",
        fontSize: "0.75em",
        fontWeight: 600,
        "&:hover": {
            backgroundColor: "#38B6FF"
        },
        marginLeft: "3rem"
    },
    addProjectWrapper: {
        padding: "0rem 4rem",
        [theme.breakpoints.down("sm")]: {
            padding: "0rem 2rem"
        }
    },
    createBtn: {
        borderRadius: 10,
        backgroundColor: "#0FBD8C",
        color: "white",
        textTransform: "uppercase",
        fontSize: "0.75em",
        fontWeight: 600,
        "&:hover": {
            backgroundColor: "#0FBD8C"
        }
    },
    kidsWrapper: {
        overflowX: "scroll",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        overflowY: "hidden",
        padding: "2rem 2rem",
        margin: "0 -2rem",
        "&::-webkit-scrollbar": {
            height: 8,
        },
        "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: 10
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#888"
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: "#555"
        }
    },
    kid: {
        minWidth: "23%",
        marginRight: 20,
        maxWidth:"23%",
        [theme.breakpoints.down("xs")]:{
            minWidth: "71%"
        }
    },
    createKid: {
        height: "100%",
        width: "100%",
        borderRadius: "2rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e0e0e0"
    },
    createKidText: {
        color: "grey"
    },
    createKidWrapper: {
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    addKidTitle: {
        fontFamily: "Raleway",
        fontSize: "1.3rem",
        fontWeight: "bold",
        color: "#585858",
        textAlign: "left",
        width: "100%",
        marginBottom: "0.5rem",
    }
}));
const ParentDashboard = () => {
    const classes = useStyles();
    return (
        <Box>
            <Head>
                <title>Codeshala Dashboard </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <Container className={classes.container}>
                <Kids/>
            </Container>
        </Box>
    )
};

const Kids = () => {
    const classes = useStyles();
    const kids = [1, 2, 3, 4, 5, 6];
    let {profile} = useContext(AuthContext);
    return (
        <Box>
            <Typography variant={"body1"} className={classes.title}>Total Kids</Typography>
            <Box className={classes.kidsWrapper}>
                {profile?.profile?.kids?.map((item, key) => {
                    return (
                        <Box className={classes.kid} key={key}>
                            <Student user={item}/>
                        </Box>
                    )
                })}
                <Box className={classes.kid}>
                    <CreateKid/>
                </Box>
            </Box>
        </Box>
    );
};
const ADDKID = gql`
    mutation ADDKID($name:String!, $email:String!, $grade:String,$password:String!, $gender:String, $dob:String){
        registerKid(input:{
            fName:$name,
            lName:"",
            email:$email,
            password:$password,
            gender:$gender,
            dob:$dob,
            grade:$grade,
            role:"kid"
        }){
            _id
            username
            profile{
                _id
                city
                profilePic
                name
                email
                dob
                grade
                school
                city
            }
        }
    }
`;
const CreateKid = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [gender, setGender] = useState("male");
    const [grade, setGrade] = useState("");
    const [dob, setDOB] = useState(format(new Date(2020, 0, 1), "yyyy-MM-dd"));
    const [addKid, {loading, data, error}] = useMutation(ADDKID);
    const [e, setE] = useState(false);
    const {setSuccess, setMessage, setError, setProfile, profile} = useContext(AuthContext);
    const [m, setM] = useState("");
    const submitForm = (e) => {
        e.preventDefault();
        if (name?.length > 0 && email?.length > 0 && EmailValidator.validate(email) && pass?.length >= 6) {
            addKid({variables: {name, email, password: pass, gender, grade, dob}})
                .then(({data}) => {
                    console.log(data);
                    let kids = profile?.profile?.kids;
                    kids.push(data?.registerKid);
                    let op = profile;
                    op.profile.kids = kids;
                    setProfile(op);
                    setMessage("Kid registered successfully.")
                    setSuccess(true);
                    setOpen(false)
                })
                .catch(e => {
                    console.log(e);
                    setE(true);
                    setM(e?.message);
                })
        } else {
            let m = "";
            if (name?.length <= 0) {
                m += "Name can't be empty. ";
            }
            if (email?.length <= 0) {
                m += "Email can't be empty. "
            }
            if (email?.length > 0 && !EmailValidator.validate(email)) {
                m += "Email is invalid. "
            }
            if (pass?.length < 6) {
                m += "Password can't have less than 6 characters. ";
            }
            setE(true);
            setM(m);
        }
        return false;
    }
    return (
        <>
            <Button className={classes.createKid} onClick={() => setOpen(true)}>
                <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
                    <AddIcon style={{fontSize: "6rem"}}/>
                    <Typography variant={"body1"} className={classes.createKidText}>Add new Kid</Typography>
                </Box>
            </Button>
            {open ?
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <form onSubmit={submitForm} method={"post"}>
                        <Box className={classes.createKidWrapper}>
                            <Typography variant={"body1"} className={classes.addKidTitle}>Add New Kid</Typography>
                            {(e || error) &&
                            <Collapse in={e || error}>
                                <Alert varaint={"filled"} severity={"error"} style={{maxWidth: "14rem"}}>{m}</Alert>
                            </Collapse>
                            }
                            <FormControl style={{marginBottom: 15, marginTop: "0.5rem"}}>
                                <TextField variant={"outlined"} value={name} onChange={e => setName(e.target.value)}
                                           label={"Name"} size={"small"}/>
                            </FormControl>
                            <FormControl style={{marginBottom: 15}}>
                                <TextField variant={"outlined"} value={email} onChange={e => setEmail(e.target.value)}
                                           label={"Email"} size={"small"}/>
                            </FormControl>
                            <FormControl style={{marginBottom: 15, width: "auto", minWidth: "14rem"}}>
                                <TextField variant={"outlined"} select value={gender}
                                           onChange={e => setGender(e.target.value)}
                                           label={"Gender"} size={"small"}>
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={"female"}>Female</MenuItem>
                                    <MenuItem value={"other"}>Other</MenuItem>
                                </TextField>
                            </FormControl>
                            <FormControl style={{marginBottom: 15, width: "auto", minWidth: "14rem"}}>
                                <TextField
                                    variant={"outlined"}
                                    type="date"
                                    label={"DOB"}
                                    size={"small"}
                                    value={dob}
                                    onChange={e => setDOB(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                            <FormControl style={{marginBottom: 15}}>
                                <TextField variant={"outlined"} value={grade} name={"grade"}
                                           type={"number"}
                                           onKeyDown={e => {
                                               let invalidChars = ["-", "e", "+", "E"];
                                               if (invalidChars.includes(e?.key)) {
                                                   e.preventDefault();
                                               }
                                           }}
                                           onChange={e => setGrade(e.target.value)}
                                           label={"Grade"} size={"small"}/>
                            </FormControl>
                            <FormControl style={{marginBottom: 15}}>
                                <TextField variant={"outlined"} value={pass} onChange={e => setPassword(e.target.value)}
                                           label={"Password"} size={"small"} type={"password"}/>
                            </FormControl>
                            <FormControl>
                                <Button varaint={"contained"} className={classes.createBtn} disabled={loading}
                                        type={"submit"}
                                        onClick={submitForm}>{loading ?
                                    <CircularProgress size={20} style={{color: "white"}}/> : "Save"}</Button>
                            </FormControl>
                        </Box>
                    </form>
                </Dialog>
                : ""
            }
        </>
    );
};

export default ParentDashboard;
