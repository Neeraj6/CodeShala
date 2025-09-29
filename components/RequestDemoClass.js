/*
 * @author Gaurav Kumar
 */

import React, {useContext, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Collapse,
    Dialog,
    FormControl,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Alert} from '@material-ui/lab';
import {gql, useMutation} from "@apollo/client";
import * as EmailValidator from 'email-validator';
import {AuthContext} from "../context/auth";

const BOOKFREECLASS = gql`
    mutation BOOKFREECLASS($parentName:String, $phone:String!, $email:String, $kidName:String, $age:String, $grade:String){
        bookDemoClass(classInput:{
            parentName:$parentName,
            phone:$phone,
            email:$email,
            kidName:$kidName,
            age:$age,
            grade:$grade
        }){
            _id
            age
            parentName
            createdAt
            updatedAt
        }
    }
`;
const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: "2rem"
    },
    title: {
        fontFamily: "Raleway",
        color: "#524d4d",
        fontWeight: 600,
        marginBottom: 10
    },
    createBtn: {
        backgroundColor: "#0FBD8C",
        color: "white",
        width: "50%",
        "&:hover": {
            backgroundColor: "#0FBD8C"
        },
        margin: "auto"
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
}));
const RequestDemoClass = ({open, setOpen, course}) => {
    const classes = useStyles();
    const [bookDemoClass, {loading, data, error}] = useMutation(BOOKFREECLASS);
    const [parentName, setParentName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [kidName, setKidName] = useState("");
    const [grade, setGrade] = useState("");
    const [age, setAge] = useState("");
    const [e, setE] = useState(false);
    const [m, setM] = useState("");
    const {setError, setMessage, setSuccess, code, list, setCode} = useContext(AuthContext);
    const submitForm = (e) => {
        e.preventDefault();
        if (parentName?.length > 0 && email?.length > 0 && phone?.length === 10) {
            bookDemoClass({variables: {parentName, email, phone: `${code}-${phone}`, kidName, grade, age: age}})
                .then(({data}) => {
                    console.log(data);
                    setSuccess(true);
                    setMessage("Your query submitted successfully.");
                    setOpen(false);
                })
                .catch(e => {
                    console.log(e)
                    setE(true);
                    setM(e?.message);
                });
        } else {
            let m = "";
            if (parentName?.length <= 0) {
                m += "Name can't be empty. ";
            }
            if (email?.length <= 0) {
                m += "Email can't be empty. "
            }
            if (email?.length > 0 && !EmailValidator.validate(email)) {
                m += "Email is invalid. "
            }
            if (phone?.length < 10 || phone?.length > 12) {
                m += "Phone no. is not valid"
            }
            setE(true);
            setM(m);
        }
        return false;
    };
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Box className={classes.wrapper}>
                <form onSubmit={submitForm} method={"post"}>
                    <Typography variant={"body1"} className={classes.title}>Start your kid’s coding journey</Typography>
                    {(e || error) &&
                    <Collapse in={e || error}>
                        <Alert varaint={"filled"} severity={"error"}>{m}</Alert>
                    </Collapse>
                    }
                    {/*<FormControl style={{width: "100%", marginBottom: 15}}>*/}
                    {/*    <TextField variant={"outlined"} select label={"Select Course"} size={"small"}*/}
                    {/*               value={course}*/}
                    {/*               onChange={e => setCourse(e.target.value)}>*/}
                    {/*        <MenuItem value={"course1"}>Course 1</MenuItem>*/}
                    {/*        <MenuItem value={"course2"}>Course 2</MenuItem>*/}
                    {/*        <MenuItem value={"course3"}>Course 3</MenuItem>*/}
                    {/*    </TextField>*/}
                    {/*</FormControl>*/}
                    {/*<FormControl style={{width: "100%", marginBottom: 15}}>*/}
                    {/*    <TextField label={"Select Date"} type={"date"}*/}
                    {/*               size={"small"}*/}
                    {/*               defaultValue={date}*/}
                    {/*               value={date}*/}
                    {/*               variant={"outlined"}*/}
                    {/*               onChange={e => setDate(e.target.value)}/>*/}
                    {/*</FormControl>*/}
                    <FormControl style={{width: "100%", marginBottom: 15, marginTop: 10}}>
                        <TextField label={"Name"}
                                   name={"name"}
                                   size={"small"}
                                   value={parentName}
                                   variant={"outlined"}
                                   required
                                   onChange={e => setParentName(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{width: "100%", marginBottom: 15}}>
                        <TextField label={"Email"}
                                   size={"small"}
                                   value={email}
                                   name={"email"}
                                   required
                                   variant={"outlined"}
                                   onChange={e => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{width: "100%", marginBottom: 15}}>
                        <TextField label={"Phone"}
                                   size={"small"}
                                   name={"phone"}
                                   type={"number"}
                                   value={phone}
                                   required
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
                                   }}
                                   variant={"outlined"}
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
                    </FormControl>
                    <FormControl style={{width: "100%", marginBottom: 15}}>
                        <TextField label={"Kid's Name"}
                                   size={"small"}
                                   name={"kid-name"}
                                   value={kidName}
                                   variant={"outlined"}
                                   onChange={e => setKidName(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{width: "100%", marginBottom: 15}}>
                        <TextField label={"Kid's Age"}
                                   size={"small"}
                                   name={"age"}
                                   type={"number"}
                                   value={age}
                                   variant={"outlined"}
                                   onChange={e => setAge(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{width: "100%", marginBottom: 15}}>
                        <TextField label={"Kid's Grade"}
                                   size={"small"}
                                   name={"grade"}
                                   type={"number"}
                                   value={grade}
                                   variant={"outlined"}
                                   onChange={e => setGrade(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{width: "100%", marginTop: 30}}>
                        <Button variant={"contained"} type={"submit"} className={classes.createBtn}
                                onClick={submitForm}>
                            {loading ? <CircularProgress size={30} style={{color: "white"}}/> : "Book Class"}
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </Dialog>
    )
};

export default RequestDemoClass;
