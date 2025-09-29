/*
 * @author Gaurav Kumar
 */
import React, {useContext, useState} from "react";
import {Box, Button, Collapse, FormControl, FormLabel, Input, Typography} from "@material-ui/core";
import Head from "next/head";
import {makeStyles} from "@material-ui/core/styles";
import {gql, useMutation} from "@apollo/client";
import {useRouter} from 'next/router'
import * as EmailValidator from 'email-validator';
import {Alert} from '@material-ui/lab';
import {AuthContext} from "../context/auth";
import Success from "../components/Success";

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
        // maxWidth: 658,
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
        color: "#38B6FF",
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
        },
        margin: "3rem 5rem"
    },
    formControl: {
        margin: "1rem 0rem",
        minWidth: "20rem"
    }
}));

const SENDOTP = gql`
    mutation SENDOTP($email:String!){
        sendOTPResetPass(email:$email)
    }
`;
const RESETPASS = gql`
    mutation SENDOTP($email:String!, $otp:Int!, $password:String!){
        resetPass(email:$email, otp:$otp, password:$password)
    }
`;
const ResetPass = () => {
    const router = useRouter();
    const classes = useStyles();
    const [otp, setOTP] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sendOtp] = useMutation(SENDOTP);
    const [resetPass] = useMutation(RESETPASS);
    const [otpSent, setOtpSent] = useState(false);
    const [e, setE] = useState(false);
    const [m, setM] = useState("");
    const {setSuccess, setError, setMessage, message, success, error} = useContext(AuthContext);
    const submitForm = (e) => {
        e.preventDefault();
        if (otpSent) {
            if (password?.length >= 0 && otp?.length > 0) {
                resetPass({
                    variables: {
                        email,
                        password,
                        otp: parseInt(otp)
                    }
                })
                    .then(({data}) => {
                        console.log(data);
                        // alert("Password saved successfully")
                        if (data?.resetPass) {
                            setSuccess(true);
                            setMessage("Password saved successfully");
                            router.push('/login');
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        // alert(e?.message)
                        setE(true);
                        setM(e?.message);
                    })
            } else {
                setE(true);
                let m = "";
                if (otp?.length <= 0) {
                    m += "OTP can't be empty. ";
                }
                if (password?.length < 6) {
                    m += "Password can't be less than 6 character."
                }
                setM(m);
            }
        } else {
            if (EmailValidator.validate(email)) {
                sendOtp({variables: {email: email}})
                    .then(({data}) => {
                        console.log(data);
                        setSuccess(true);
                        setMessage("OTP sent to your email")
                        setOtpSent(true);
                    })
                    .catch(e => {
                        console.log(e);
                        // alert(e?.message)
                        setE(true);
                        setM(e?.message);
                    })
            } else {
                setE(true);
                setM("Email address is invalid");
            }
        }
        return false;
    }
    return (
        <Box>
            <Head>
                <title>Codeshala Registration </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Success/>
                <Box className={classes.container}>
                    <form className={classes.formContainer} method={"post"} onSubmit={submitForm}>
                        <Typography variant={"h2"} className={classes.title}>Reset your password</Typography>
                        {(e) &&
                        <Collapse in={e}>
                            <Alert varaint={"filled"} severity={"error"}>{m}</Alert>
                        </Collapse>
                        }
                        <FormControl className={classes.formControl} style={{marginTop: "2rem"}}>
                            <FormLabel className={classes.label}>Email</FormLabel>
                            <Input className={classes.input} name={"email"} value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   readOnly={otpSent}
                                   placeholder={"Smith@domain.com"}/>
                        </FormControl>

                        {otpSent ?
                            <>
                                <FormControl className={classes.formControl}>
                                    <FormLabel className={classes.label}>Enter OTP here</FormLabel>
                                    <Input className={classes.input} name={"otp"} value={otp}
                                           onChange={e => setOTP(e.target.value)}
                                           placeholder={"1234"}
                                           type={"number"}/>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <FormLabel className={classes.label}>Enter New Pass</FormLabel>
                                    <Input className={classes.input} name={"otp"} value={password}
                                           onChange={e => setPassword(e.target.value)}
                                           placeholder={"New Password"}
                                           type={"password"}/>
                                </FormControl>
                            </>
                            : ""}
                        <FormControl>
                            <Button className={classes.registerBtn} variant="contained" type={"submit"}
                                    disabled={!otpSent ? email?.length === 0 : otp?.length !== 4 && password?.length < 6}
                                    onClick={submitForm}>Submit</Button>
                        </FormControl>
                    </form>
                </Box>
            </main>
        </Box>
    )
};

export default ResetPass;
