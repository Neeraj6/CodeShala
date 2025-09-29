/*
 * @author Gaurav Kumar
 */
import React, {useContext, useEffect, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Collapse,
    FormControl,
    FormGroup,
    FormLabel,
    IconButton,
    Input,
    Typography
} from "@material-ui/core";
import Head from "next/head";
import Link from 'next/link';
import {makeStyles} from "@material-ui/core/styles";
import {gql, useMutation} from "@apollo/client";
import {AuthContext} from "../context/auth";
import {Alert} from '@material-ui/lab';
import {useRouter} from 'next/router'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "rgba(229,229,229,0.3)",
        backgroundImage: "url(/assets/pattern-2.svg)",
        backgroundSize: "cover"
    },
    formContainer: {
        maxWidth: 658,
        minWidth: 500,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        [theme.breakpoints.down("xs")]: {
            minWidth: "90%",
            width:"90%"
        }
    },
    title: {
        fontFamily: "Raleway",
        textAlign: "center",
        color: "#0FBD8C",
        fontSize: "2.5rem",
        fontWeight: "bold",
        maxWidth: 400,
        marginBottom: "2rem",
        marginTop: "4rem",
        marginLeft: "auto",
        marginRight: "auto"
    },
    input: {
        fontFamily: "Raleway",
        color: "#828282",
        fontSize: "1rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 10,
        height: "3.0rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        backgroundColor: "white",
        "&:before": {
            position: "fixed"
        },
        "&:after": {
            position: "fixed"
        }
    },
    label: {
        fontFamily: "Raleway",
        color: "#828282",
        fontSize: "1rem"
    },
    loginBtn: {
        backgroundColor: "#38B6FF",
        boxShadow: "0px 4px 21px rgba(56, 182, 255, 0.4)",
        borderRadius: 10,
        color: "white",
        padding: "0.5rem 4rem",
        marginBottom: "2rem",
        "&:hover": {
            backgroundColor: "#38B6FF",
        }
    },
    forgotPass: {
        color: "#9C9C9C",
        fontFamily: "Raleway",
        marginBottom: "3rem"
    },
    registerBtn: {
        backgroundColor: "#0FBD8C",
        fontFamily: "Raleway",
        boxShadow: "0px 4px 20px rgba(15, 189, 140, 0.46)",
        borderRadius: 10,
        padding: "0.5rem 3rem",
        color: "white",
        textTransform: "capitalize",
        fontWeight: "bold",
        "&:hover": {
            backgroundColor: "#0FBD8C",
        }
    },
    crossBtn:{
        position:"absolute",
        top:30,
        right:30,
        backgroundColor:"#00000042",
        color:"white",
        "&:hover":{
            backgroundColor:"#000000b8",
            color:"white"
        },
        [theme.breakpoints.down("xs")]: {
            top: 15,
            right:15
        }
    }
}));
const LOGIN = gql`
    mutation LOGIN($email:String!, $password:String!){
        login(email:$email, password:$password){
            _id
            profile{
                _id
                name
                profilePic
                email
                phone
                dob
                gender
                grade
                school
                city
                skills
                insta
                linkedIn
                twitter
                fb
                games
                apps
                website
                youtube
                city
                bio
                projects{
                    _id
                    title
                    description
                    cover
                    link
                    projectType
                    linkType
                }
                kids{
                    _id
                    username
                    email
                    profile{
                        _id
                        name
                        city
                        profilePic
                        bio
                        school
                        grade
                        dob
                    }
                }
                courses{
                    course{
                        _id
                        title
                    }
                }
            }
            role
        }
    }
`;

const Login = () => {
    const classes = useStyles();
    const [login, {loading, data, error}] = useMutation(LOGIN);
    const {setProfile, setAuthenticated, isAuthenticated} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [e, setE] = useState(false);
    const [m, setM] = useState("");
    const router = useRouter();
    const {setSuccess, setError, setMessage} = useContext(AuthContext);
    const submitForm = (e) => {
        e.preventDefault();
        if (email?.length > 0 && password?.length >= 6) {
            login({variables: {email, password}})
                .then(({data}) => {
                    console.log(data);
                    localStorage.setItem("user", JSON.stringify(data?.login));
                    setProfile(data?.login);
                    setAuthenticated(true);
                    setSuccess(true);
                    setMessage("Login success");
                    router.push("/dashboard");
                })
                .catch(e => {
                    console.log(e);
                    setE(true);
                    setM(e.message);
                    // alert(e.message);
                })
        } else {
            let m = "";
            if (email?.length === 0) {
                m += "Email should not be empty."
            }
            if (password?.length < 6) {
                m += " Password can't be less than 6 characters."
            }
            setE(true);
            setM(m);
        }
        return false;
    };
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/dashboard");
        }
    }, []);
    return (
        <Box>
            <Head>
                <title>Codeshala Login </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Box className={classes.container}>
                    <IconButton aria-label={"close"} className={classes.crossBtn} onClick={()=>{
                        router.push('/');
                    }}>
                        <CloseIcon/>
                    </IconButton>
                    <form className={classes.formContainer} method={"post"} onSubmit={submitForm}>
                        <Typography variant={"h2"} className={classes.title}>Login and start learning from
                            today</Typography>
                        <FormGroup>
                            {(e || error) &&
                            <Collapse in={e || error}>
                                <Alert varaint={"filled"} severity={"error"}>{m}</Alert>
                            </Collapse>
                            }
                            <FormControl style={{marginBottom: "2rem", marginTop: "2rem"}}>
                                <FormLabel className={classes.label}>Email</FormLabel>
                                <Input className={classes.input} name={"email"} value={email}
                                       onChange={e => setEmail(e.target.value)}/>
                            </FormControl>
                            <FormControl style={{marginBottom: "2rem"}}>
                                <FormLabel className={classes.label}>Password</FormLabel>
                                <Input className={classes.input} name={"password"} value={password}
                                       onChange={e => setPassword(e.target.value)} type={"password"}/>
                            </FormControl>
                            <FormControl style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <Button className={classes.loginBtn} variant="contained" disabled={loading} type={"submit"}
                                        onClick={submitForm}> {loading ?
                                    <CircularProgress size={30} style={{color: "white"}}/> : "Login"}</Button>
                                <Link href={"/resetpass"}>
                                    <a className={classes.forgotPass}>
                                        Forget Password ?
                                    </a>
                                </Link>
                            </FormControl>
                            <FormControl>
                                <Button className={classes.registerBtn} variant="contained">
                                    <Link href={"/register"}>
                                        <a style={{color: "white", textDecoration: "none"}}>Create an account
                                        </a>
                                    </Link>
                                </Button>
                            </FormControl>
                        </FormGroup>
                    </form>
                </Box>
            </main>
        </Box>
    )
};

export default Login;
