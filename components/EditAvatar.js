/*
 * @author Gaurav Kumar
 */

import React, {useContext, useState} from "react";
import {Avatar, Box, Button, Dialog, FormControl, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import {AuthContext} from "../context/auth";
import {gql, useMutation} from "@apollo/client";

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: "1rem",
        minWidth: "22rem",
        [theme.breakpoints.down("xs")]: {
            minWidth: "auto"
        }
    },
    title: {
        fontFamily: "Raleway",
        fontSize: "1em",
        color: "#565656",
        fontWeight: 800,
        marginBottom: "1rem"
    },
    avatar: {
        height: "10rem",
        width: "10rem"
    },
    fileInput: {
        backgroundColor: "#0FBD8C",
        marginTop: 20,
        "&:hover": {
            backgroundColor: "#0FBD8C",
        }
    },
    fileInputText: {
        color: "white",
        display: "flex",
        alignItems: "center",
        fontSize: 13,
        fontWeight: 600,
        fontFamily: "Raleway",
        textTransform: "capitalize"
    },
    cancelBtn: {
        backgroundColor: "#D96D6D",
        borderRadius: 8,
        paddingLeft: 15,
        paddingRight: 15,
        color: "white",
        fontFamily: "Raleway",
        "&:hover": {
            backgroundColor: "#D96D6D",
        }

    },
    doneBtn: {
        backgroundColor: "#0FBD8C",
        borderRadius: 8,
        marginLeft: 15,
        paddingLeft: 15,
        paddingRight: 15,
        color: "white",
        fontFamily: "Raleway",
        "&:hover": {
            backgroundColor: "#0FBD8C",
        }
    }
}));

const UPLOADFILE = gql`
    mutation UPLOADFILE($file:Upload!){
        uploadFile(file:$file){
            filename
            mimetype
            encoding
        }
    }
`;

const UPDATEPROFILEPIC = gql`
    mutation UPDATEPROFILEPIC($url:String!){
        updateProfilePic(url:$url){
            _id
            profile{
                _id
                profilePic
            }
        }
    }
`;

const EditAvatar = ({open, setOpen}) => {
    const classes = useStyles();
    let {profile, setProfile, setSuccess, setError, setMessage} = useContext(AuthContext);
    const [image, setImage] = useState(profile?.profile?.profilePic);
    const [uploadFile] = useMutation(UPLOADFILE);
    const [saveProfilePic] = useMutation(UPDATEPROFILEPIC);
    const [fetching, setFetching] = useState(false);
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Box display={"flex"} flexDirection={"column"} justifyContent="center" alignItems={"center"}
                 className={classes.wrapper}>
                <Typography variant={"body1"} className={classes.title}>Set Profile Image</Typography>
                <Avatar src={`${process.env.S3_URL}${image ? image : profile?.profile?.profilePic}`}
                        className={classes.avatar}/>
                <FormControl style={{marginBottom: "4rem"}}>
                    <Button variant={"contained"} component={"label"} size={"small"} className={classes.fileInput}
                            disabled={fetching}>
                        <Typography variant={"body1"}
                                    className={classes.fileInputText}>{fetching ? 'Uploading...' : 'Upload'} &nbsp;&nbsp;&nbsp;
                            <BackupOutlinedIcon/>
                        </Typography>
                        <input type={"file"} hidden={true} accept={"image/*"} onChange={e => {
                            setImage(e.target.files[0]);
                            setFetching(true);
                            uploadFile({variables: {file: e.target.files[0]}})
                                .then(({data}) => {
                                    console.log(data)
                                    saveProfilePic({variables: {url: data?.uploadFile?.filename}})
                                        .then(({data}) => {
                                            console.log(data);
                                            let p = profile;
                                            p.profile.profilePic = data?.updateProfilePic?.profile?.profilePic;
                                            setProfile(p);
                                            setSuccess(true);
                                            setMessage("Profile edited successfully.")
                                            setOpen(false);
                                            setFetching(false);
                                        })
                                        .catch(e => {
                                            console.log(e);
                                            setMessage(e?.message);
                                            setError(true)
                                            setFetching(false);
                                        })
                                })
                                .catch(e => {
                                    console.log(e);
                                    setMessage(e?.message);
                                    setError(true);
                                    setFetching(false);
                                })
                        }}/>
                    </Button>
                </FormControl>
                <Box display={"flex"} justifyContent={"flex-end"} style={{width: "100%"}}>
                    <Button startIcon={<CancelOutlinedIcon/>} className={classes.cancelBtn} size={"small"}
                            disabled={fetching}
                            onClick={() => setOpen(false)}>Cancel</Button>
                    <Button startIcon={<CheckCircleOutlineRoundedIcon/>} className={classes.doneBtn}
                            disabled={fetching}
                            size={"small"}>Done</Button>
                </Box>
            </Box>
        </Dialog>
    )
};

export default EditAvatar;

