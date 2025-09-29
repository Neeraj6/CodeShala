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
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {gql, useMutation} from "@apollo/client";
import * as EmailValidator from "email-validator";
import {Alert} from "@material-ui/lab";
import {AuthContext} from "../context/auth";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem 0rem"
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
    formContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "60%",
        position: "relative",
        [theme.breakpoints.down('xs')]: {
            width: "90%"
        }
    },
    callUs: {
        position: "absolute",
        left: "-15rem",
        transform: "rotate(-90deg)",
        display: "flex",
        alignItems: "center",
        bottom: "45%",
        [theme.breakpoints.down('xs')]: {
            display: "none"
        }
    },
    callUsBtn: {
        backgroundColor: "#38B6FF",
        color: 'white',
        padding: "0.5rem 3rem",
        borderRadius: "3rem",
        marginLeft: "2rem",
        "&:hover": {
            backgroundColor: "#48b4f8"
        }
    },
    title: {
        fontFamily: "Raleway",
        fontWeight: 600,
        color: "#333333",
        [theme.breakpoints.down('xs')]: {
            fontSize: "4em"
        }
    },
    subTitle: {
        fontFamily: "Raleway",
        fontSize: "1.1em",
        maxWidth: "70%",
        textAlign: "center",
        color: "#333333",
        marginBottom: "2rem",
        [theme.breakpoints.down('xs')]: {
            maxWidth: "100%",
            textAlign: "left",
            fontSize: "1em"
        }
    },
    input: {
        width: "90%",
        margin: "1rem 0rem"
    },
    submitBtn: {
        borderRadius: 10,
        backgroundColor: "#FFBF00",
        boxShadow: "0px 20px 20px #656D7441",
        fontSize: "1.5em",
        fontWeight: 500,
        color: "white",
        padding: "0.5rem 2rem",
        "&:hover": {
            backgroundColor: "#FFBF00",
        }
    }
}));
const CONTACT = gql`
    mutation contact($name:String,$email:String,$phone:String,$message:String){
        careerQuery(input: {
            name: $name,
            email: $email,
            phone: $phone,
            message: $message
        })
    }
`;
const CareerForm = () => {
    const classes = useStyles();
    const [contact, {loading, data, error}] = useMutation(CONTACT);
    const {setSuccess, setError, setMessage, code, list, setCode} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMe] = useState("");
    const [e, setE] = useState(false);
    const [m, setM] = useState("");
    const submitForm = (e) => {
        e.preventDefault();
        if (name?.length > 0 && email?.length > 0 && EmailValidator.validate(email) && (phone ? phone?.length === 10 : true)) {
            contact({
                variables: {
                    name,
                    email,
                    phone: `${code}-${phone}`,
                    message: message
                }
            })
                .then(({data}) => {
                    console.log(data)
                    setSuccess(true);
                    setMessage("Your query has been submitted successfully.");
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMe("");
                    setE(false);
                    setM("");
                })
                .catch(e => {
                    console.log(e)
                    setError(true);
                    setMessage(e?.message);
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
            if(phone && phone?.length !== 10){
                m+="Phone no. invalid ";
            }
            setE(true);
            setM(m);
        }
        return false;
    }

    return (
        <Box style={{backgroundImage: "url(/assets/pattern.svg)"}}>

            <form method={"post"} onSubmit={submitForm}>
                <Container className={classes.container}>
                    <Box className={classes.formContainer}>
                        <Typography variant={"h1"} className={classes.title}>Contact Form</Typography>
                        <Typography variant={"body1"} className={classes.subTitle}>Leave us a Message, Query, Suggestion
                            or
                            Feedback We'll be happy to have a conversation with you</Typography>
                        {(e || error) &&
                        <Collapse in={e || error}>
                            <Alert varaint={"filled"} severity={"error"}>{m}</Alert>
                        </Collapse>
                        }
                        <TextField className={classes.input} variant={"outlined"} label={"Name"} value={name}
                                   required={true}
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}/>
                        <TextField className={classes.input} variant={"outlined"} label={"E-mail"} type={"email"}
                                   value={email}
                                   onChange={e => {
                                       setEmail(e.target.value)
                                   }}/>
                        <TextField className={classes.input} variant={"outlined"} label={"Phone"} type={"number"}
                                   value={phone}
                                   onKeyDown={e => {
                                       let invalidChars = ["-", "e", "+", "E"];
                                       if (invalidChars.includes(e?.key)) {
                                           e.preventDefault();
                                       }
                                   }}
                                   onChange={e => {
                                       if (!isNaN(e?.target?.value) && e?.target?.value?.length <= 10) {
                                           setPhone(e.target.value)
                                       }
                                   }}
                                   InputProps={{
                                       startAdornment: <InputAdornment position="start">
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
                                       </InputAdornment>,
                                   }}/>
                        <TextField className={classes.input} variant={"outlined"} label={"Your Message"}
                                   multiline={true}
                                   rows={10}
                                   value={message}
                                   onChange={e => {
                                       let value = e.target.value;
                                       if (value.length < 500) {
                                           setMe(value);
                                       }
                                   }}/>
                        <Button className={classes.submitBtn} onClick={submitForm} disabled={loading} type={"submit"}>
                            {loading ? <CircularProgress size={30} style={{color: "white"}}/> : "Submit"}
                        </Button>
                        {/*<a href={"tel:+919485878080"} target={"_blank"} style={{textDecoration: "none"}}>*/}
                        {/*    <Box className={classes.callUs}>*/}
                        {/*        <Typography variant={"body1"} style={{fontFamily: "Raleway", color: "#212121"}}>+91 9485878080</Typography>*/}
                        {/*        <Button className={classes.callUsBtn}>Call Us</Button>*/}
                        {/*    </Box>*/}
                        {/*</a>*/}
                    </Box>
                </Container>

            </form>
        </Box>
    );
};

export default CareerForm;
