/*
 * @author Gaurav Kumar
 */
import React, {useContext, useState} from "react";
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
    InputAdornment,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import Head from "next/head";
import {makeStyles} from "@material-ui/core/styles";
import {gql, useMutation} from "@apollo/client";
import {Alert} from '@material-ui/lab';
import * as EmailValidator from 'email-validator';
import {useRouter} from "next/router";
import {AuthContext} from "../context/auth";
import CloseIcon from "@material-ui/icons/Close";

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
            minWidth: "100%",
            width: "100%"
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
        margin: "1rem 2rem",
        minWidth: "20rem",
        [theme.breakpoints.down("xs")]: {
            margin: "1rem 1rem",
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
    crossBtn: {
        position: "absolute",
        top: 30,
        right: 30,
        backgroundColor: "#00000042",
        color: "white",
        "&:hover": {
            backgroundColor: "#000000b8",
            color: "white"
        }
    }
}));

const REGISTER = gql`
    mutation REGISTER($name:String!, $password:String!, $email:String!, $phone:String, $city:String, $role:String){
        registerUser(input:{
            fName:$name,
            email:$email,
            password:$password,
            city:$city,
            phone:$phone,
            role:$role
        }){
            _id
            username
            profile{
                _id
                name
            }
        }
    }
`;

const Register = ({role}) => {
    const classes = useStyles();
    const [register, {data, loading, error}] = useMutation(REGISTER);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [cfPassword, setCfPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [e, setE] = useState(false);
    const [m, setM] = useState("");
    const {setSuccess, setError, setMessage, code, list, setCode} = useContext(AuthContext);
    const router = useRouter();
    const submitForm = (e) => {
        e.preventDefault();
        if (name?.length > 0 && email?.length > 0 && password?.length >= 6 && password === cfPassword && EmailValidator.validate(email) && phone?.length === 10) {
            register({
                variables: {
                    name, email, password, city, phone: `${code}-${phone}`, role: role ?? "parent"
                }
            })
                .then(({data}) => {
                    console.log(data);
                    setSuccess(true);
                    setMessage("You can login now.");
                    router.push("/login");
                }).catch(e => {
                console.log(e);
                setE(true);
                setM(e.message);
                // alert(e.message);
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
            if (password?.length < 6) {
                m += "Password can't have less than 6 characters. ";
            }
            if (cfPassword !== password) {
                m += "Password doesn't match. ";
            }
            if (phone?.length !== 10) {
                m += "Phone no. is not valid. ";
            }
            setE(true);
            setM(m);
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
                <Box className={classes.container}>
                    <IconButton aria-label={"close"} className={classes.crossBtn} onClick={() => {
                        router.back();
                    }}>
                        <CloseIcon/>
                    </IconButton>
                    <form className={classes.formContainer} method={"post"} onSubmit={submitForm}>
                        <Typography variant={"h2"} className={classes.title}>Create account and start learning from
                            today</Typography>
                        {(e || error) &&
                        <Collapse in={e || error}>
                            <Alert varaint={"filled"} severity={"error"}>{m}</Alert>
                        </Collapse>
                        }
                        <FormGroup row style={{marginTop: "2rem"}}>
                            <FormControl className={classes.formControl}>
                                <FormLabel className={classes.label}>Name</FormLabel>
                                <Input className={classes.input} name={"name"} value={name}
                                       onChange={e => setName(e.target.value)}
                                       placeholder={"Name"}/>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <FormLabel className={classes.label}>Phone number</FormLabel>
                                <Input className={classes.input} name={"phone"} value={phone}
                                       onChange={e => {
                                           if (!isNaN(e?.target?.value) && e?.target?.value?.length <= 10) {
                                               setPhone(e.target.value)
                                           }
                                       }}
                                       startAdornment={
                                           <InputAdornment position="start">
                                               <Select onChange={e => setCode(e.target.value)} value={code}
                                                       className={classes.codeInput}
                                                       inputProps={{'aria-label': 'naked'}}>
                                                   {list?.map((item, key) => {
                                                       return (
                                                           <MenuItem
                                                               value={item?.dial_code}>{item?.name}</MenuItem>
                                                       );
                                                   })}
                                               </Select>
                                           </InputAdornment>
                                       }
                                       placeholder={"+91 9999999999"}/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup row>
                            <FormControl className={classes.formControl}>
                                <FormLabel className={classes.label}>Email</FormLabel>
                                <Input className={classes.input} name={"email"} value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       placeholder={"Smith@domain.com"}/>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <FormLabel className={classes.label}>Password</FormLabel>
                                <Input className={classes.input} name={"password"} value={password}
                                       onChange={e => setPassword(e.target.value)} type={"password"}
                                       placeholder={"Password"}/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup row>
                            <FormControl className={classes.formControl}>
                                <FormLabel className={classes.label}>City</FormLabel>
                                <Input className={classes.input} name={"address"} value={city}
                                       onChange={e => setCity(e.target.value)}
                                       placeholder={"Block - B Paris, new york"}/>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <FormLabel className={classes.label}>Confirm Password</FormLabel>
                                <Input className={classes.input} name={"password"} value={cfPassword}
                                       onChange={e => setCfPassword(e.target.value)} type={"password"}
                                       placeholder={"Confirm Password"}/>
                            </FormControl>
                        </FormGroup>
                        <FormControl>
                            <Button className={classes.registerBtn} variant="contained"
                                    disabled={loading}
                                    onClick={submitForm}>
                                {loading ?
                                    <CircularProgress size={30} style={{color: "white"}}/> : "Create an account"}
                            </Button>
                        </FormControl>
                    </form>
                </Box>
            </main>
        </Box>
    )
};

export default Register;
