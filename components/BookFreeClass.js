/*
 * @author Gaurav Kumar
 */

import React, {useContext, useEffect, useState} from "react";
import {Box, Button, CircularProgress, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {gql, useMutation} from "@apollo/client";
import {AuthContext} from "../context/auth";

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
const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: "url(/assets/pattern.svg)",
        backgroundSize: "cover"
    },
    title: {
        fontWeight: 500,
        fontFamily: "Poppins",
        fontSize: "2em",
        textAlign: "center",
        color: "#282835",
        margin: "6rem auto 2rem"
    },
    phoneInputWrapper: {
        borderRadius: "3rem",
        backgroundColor: "white",
        border: "1px solid #38B6FF",
        padding: "0.3rem 1rem",
        display: "flex",
        alignItems: "center",
        color: "#527EE9",
        [theme.breakpoints.down('md')]: {
            minWidth: "12rem",
            width: "12rem"
        },
        minWidth: "14rem",
        "&:focus": {
            outline: "none"
        }
    },
    phoneInput: {
        borderRadius: "0rem",
        backgroundColor: "white",
        border: "0px",
        padding: "0.3rem 1rem",
        color: "#527EE9",
        [theme.breakpoints.down('md')]: {
            minWidth: "7rem",
        },
        minWidth: "14rem",
        "&:focus": {
            outline: "none"
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
    btn: {
        backgroundColor: "#38B6FF",
        marginLeft: "2em",
        color: "white",
        padding: "0.5rem 2rem",
        textTransform: "capitalize",
        boxShadow: "0px 19px 20px #656D7441",
        borderRadius: 10,
        [theme.breakpoints.down('md')]: {
            marginLeft: "1em",
        },
    }
}));

const BookFreeClass = () => {
    const classes = useStyles();
    const [bookDemoClass, {loading, data, error}] = useMutation(BOOKFREECLASS);
    const {setError, setMessage, setSuccess, list, code, setCode} = useContext(AuthContext);
    const [phone, setPhone] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        if (phone?.length === 10) {
            bookDemoClass({variables: {phone: `${code} ${phone}`}})
                .then(({data}) => {
                    console.log(data);
                    setSuccess(true);
                    setPhone("");
                    setMessage("Your query submitted successfully.")
                })
                .catch(e => {
                    console.log(e);
                    setError(true);
                    setMessage(e?.message)
                });
        } else {
            setError(true);
            setMessage("Phone number is not valid")
        }
        return false;
    };
    useEffect(() => {

    }, []);
    return (
        <Box className={classes.container}>
            <Typography variant={"h3"} className={classes.title}>Book a Free Class Now</Typography>
            <form onSubmit={submitForm} method={"post"}>
                <Box style={{display: "flex", marginBottom: "3rem"}}>
                    <Box className={classes.phoneInputWrapper}>
                        <Select onChange={e => setCode(e.target.value)} value={code} className={classes.codeInput}>
                            {list?.map((item, key) => {
                                return (
                                    <MenuItem value={item?.dial_code}>{item?.name}</MenuItem>
                                );
                            })}
                            {/*<MenuItem value="91">India</MenuItem>*/}
                            {/*<MenuItem value="90">Pakistan</MenuItem>*/}
                        </Select>
                        <input type={"number"} name={"phone"} className={classes.phoneInput}
                               placeholder={"Enter your phone"}
                               value={phone}
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
                               }}/>
                    </Box>
                    <Button className={classes.btn} onClick={submitForm} disabled={loading}>
                        {loading ? <CircularProgress size={30} style={{color: "white"}}/> : "Submit"}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default BookFreeClass;
