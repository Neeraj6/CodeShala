/*
 * @author Gaurav Kumar
 */

import React, {useContext, useState} from "react";
import {Box, Button, Collapse, Dialog, FormControl, Grid, TextField, Typography,} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import {gql, useMutation} from "@apollo/client";
import {Alert} from "@material-ui/lab";
import {AuthContext} from "../context/auth";

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: "1rem"
    },
    title: {
        fontFamily: "Raleway",
        color: "#585858",
        fontSize: "1.5rem",
        fontWeight: 700
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
    courseImage: {
        maxHeight: "10rem",
        borderRadius: 5,
        border: "1px solid #0000001f"
    },
    moduleTitle: {
        fontFamily: "Raleway",
        fontSize: "0.8rem",
        margin: 7
    },
    moduleWrapper: {
        backgroundColor: "#e0dede",
        padding: "0.5rem",
        borderRadius: 5
    },
    lectureWrapper: {
        backgroundColor: "#eceaea",
        padding: "0.5rem",
        borderRadius: 5
    },
    addBtn: {
        marginTop: 15,
        width: "100%",
        backgroundColor: "#bbb8b8",
        "&:hover": {
            backgroundColor: "#bbb8b8",
        }
    },
    saveBtn: {
        marginLeft: 10,
        backgroundColor: "#0FBD8C",
        color: "white",
        "&:hover": {
            backgroundColor: "#0FBD8C",
        }
    },
    deleteBtn: {
        backgroundColor: "#F06C6C",
        color: "white",
        "&:hover": {
            backgroundColor: "#F06C6C",
        }
    },
    editIcon: {
        color: "#474545"
    }
}));

const EDITCOURSE = gql`
    mutation EDITCOURSE($courseId:ID!, $title:String, $description:String,$slug:String!, $price:Float, $discountPrice:Float, $cover:String) {
        updateCourse(courseId: $courseId, updatedCourse: {
            description: $description,
            discountPrice: $discountPrice,
            price: $price,
            cover:$cover,
            slug:$slug,
            title: $title}){
            _id
            title
            price
            slug
            cover
            discountPrice
            description
        }
    }

`;

const EditCourse = ({open, setOpen, course}) => {
    const classes = useStyles();
    const [updateCourse, {data, loading, error}] = useMutation(EDITCOURSE);
    const [title, setTitle] = useState(course?.title);
    const [description, setDescription] = useState(course?.description);
    const [price, setPrice] = useState(course?.price);
    const [discountPrice, setDiscountPrice] = useState(course?.discountPrice);
    const [module, setModule] = useState(false);
    const [editModule, setEditModule] = useState(undefined);
    const [cover, setCover] = useState(course?.cover);
    const [e, setE] = useState(false);
    const [message, setMe] = useState("");

    const {setSuccess, setError, setMessage} = useContext(AuthContext)
    const submitForm = (e) => {
        e.preventDefault();
        if (title?.length > 0 && parseFloat(price) > 0 && parseFloat(discountPrice) < parseFloat(price) && course?.slug?.length > 0) {
            updateCourse({
                variables: {
                    courseId: course?._id,
                    title, description,
                    cover: cover,
                    slug: course?.slug,
                    price: parseFloat(price),
                    discountPrice: parseFloat(discountPrice)
                }
            })
                .then(({data}) => {
                    console.log(data);
                    setSuccess(true);
                    setMessage("Course edited successfully");
                    setOpen(false);
                })
                .catch(e => {
                    console.log(e);
                    setE(true);
                    setMe(e?.message);
                })
        } else {
            let m = "";
            if (title?.length === 0) {
                m += "Title should not be empty. "
            }
            if (parseFloat(price) < 0) {
                m += "Price can't negative number."
            }
            if (parseFloat(price) < parseFloat(discountPrice)) {
                m += "Discounted price can't be greater than price."
            }
            setE(true);
            setMe(m);
        }
        return false;
    }
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <form onSubmit={submitForm} method={"post"}>
                <Box className={classes.wrapper}>
                    <Typography variant={"h2"} className={classes.title}>Create Course</Typography>
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={7}>
                            <Box display={"flex"} flexDirection={"column"}>
                                {(e || error) &&
                                <Collapse in={e || error}>
                                    <Alert varaint={"filled"} severity={"error"}>{message}</Alert>
                                </Collapse>
                                }
                                <FormControl style={{marginBottom: 15, marginTop: 15}}>
                                    <TextField label={"Title"} size={"small"} variant={"outlined"} value={title}
                                               onChange={e => setTitle(e.target.value)}/>
                                </FormControl>
                                <FormControl style={{marginBottom: 15}}>
                                    <TextField label={"Description"} size={"small"} variant={"outlined"}
                                               multiline={true}
                                               rows={3}
                                               value={description}
                                               onChange={e => setDescription(e.target.value)}/>
                                </FormControl>
                                <FormControl style={{marginBottom: 15}}>
                                    <TextField label={"Price"} size={"small"} variant={"outlined"}
                                               type={"number"}
                                               value={price}
                                               onChange={e => setPrice(e.target.value)}/>
                                </FormControl>
                                <FormControl style={{marginBottom: 15}}>
                                    <TextField label={"Discount Price"} size={"small"} variant={"outlined"}
                                               type={"number"}
                                               value={discountPrice}
                                               onChange={e => setDiscountPrice(e.target.value)}/>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item sm={12} md={5}>
                            <Box display={"flex"} flexDirection={"column"}>
                                <img src={cover ? `${process.env.S3_URL}${cover}` : "/assets/about-us-laptop.svg"}
                                     alt={""}
                                     className={classes.courseImage}/>
                                <UploadCover cover={cover} setCover={setCover}/>
                            </Box>
                        </Grid>
                    </Grid>
                    {/*<Typography variant={"h2"} className={classes.title}>Course Content</Typography>*/}
                    {/*<Box className={classes.moduleWrapper}>*/}
                    {/*    {course?.modules?.map((module, key) => {*/}
                    {/*        return (*/}
                    {/*            <Box key={key}>*/}
                    {/*                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>*/}
                    {/*                    <Typography variant={"body1"} className={classes.moduleTitle}>*/}
                    {/*                        {key + 1}. {module?.title}</Typography>*/}
                    {/*                    <Button size={"small"} variant={"text"} onClick={() => setModule(true)}>*/}
                    {/*                        <EditRoundedIcon*/}
                    {/*                            className={classes.editIcon}/></Button>*/}
                    {/*                </Box>*/}
                    {/*                <Box className={classes.lectureWrapper}>*/}
                    {/*                    {module?.lectures?.map((item, key) => {*/}
                    {/*                        return (*/}
                    {/*                            <Box key={key}>*/}
                    {/*                                <Typography variant={"body1"} className={classes.moduleTitle}>*/}
                    {/*                                    {key + 1}. {item?.title}</Typography>*/}
                    {/*                            </Box>*/}
                    {/*                        )*/}
                    {/*                    })}*/}
                    {/*                </Box>*/}
                    {/*            </Box>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*    <Button className={classes.addBtn} onClick={() => setModule(true)}>*/}
                    {/*        + Add Module*/}
                    {/*    </Button>*/}
                    {/*    <AddModule open={module} setOpen={setModule} module={editModule}/>*/}
                    {/*</Box>*/}
                    <FormControl
                        style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 15}}>
                        <Button size={"small"} className={classes.deleteBtn}>Delete</Button>
                        <Button size={"small"} className={classes.saveBtn}
                                disabled={loading}
                                type={"submit"}
                                onClick={submitForm}>Save</Button>
                    </FormControl>
                </Box>
            </form>
        </Dialog>
    )
};
const UPLOADFILE = gql`
    mutation UPLOADFILE($file:Upload!){
        uploadFile(file:$file){
            filename
            mimetype
            encoding
        }
    }
`;

const UploadCover = ({cover, setCover}) => {
    const classes = useStyles();
    const [uploadFile, {loading}] = useMutation(UPLOADFILE);
    const [file, setFile] = useState();
    const {setSuccess, setError, setMessage} = useContext(AuthContext);
    return (
        <>
            <Button variant={"contained"} component={"label"} size={"small"}
                    className={classes.fileInput} disabled={loading}>
                <Typography variant={"body1"}
                            className={classes.fileInputText}>{loading ? 'Uploading...' : 'Upload'} &nbsp;&nbsp;&nbsp;
                    <BackupOutlinedIcon/>
                </Typography>
                <input type={"file"} hidden={true} onChange={e => {
                    setFile(e.target.files[0]);
                    uploadFile({variables: {file: e.target.files[0]}})
                        .then(({data}) => {
                            console.log(data)
                            setSuccess(true);
                            setMessage("File uploaded successfully.")
                            setCover(data?.uploadFile?.filename)
                        })
                        .catch(e => {
                            console.log(e);
                            setMessage(e?.message);
                            setError(true)
                        })
                }}
                       accept={"image/*"}/>
            </Button>
        </>
    )
};

const AddModule = ({open, setOpen, module}) => {
    const classes = useStyles();
    const [title, setTitle] = useState(module?.title);
    const [description, setDescription] = useState(module?.description);
    const [watchTime, setWatchTime] = useState(module?.watchTime);
    const [lecture, setLecture] = useState(false);
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Box className={classes.wrapper} display={"flex"} flexDirection={"column"}>
                <Typography variant={"h2"} className={classes.title}>Create Module</Typography>
                <FormControl style={{marginBottom: 15}}>
                    <TextField label={"Title"} size={"small"}
                               value={title}
                               onChange={e => setTitle(e.target.value)}/>
                </FormControl>
                <FormControl style={{marginBottom: 15}}>
                    <TextField label={"Description"} size={"small"}
                               value={description}
                               onChange={e => setDescription(e.target.value)}/>
                </FormControl>
                <Box className={classes.moduleWrapper}>
                    {module?.lectures?.map((item, key) => {
                        return (
                            <Box key={key} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Typography variant={"body1"} className={classes.moduleTitle}>
                                    {key + 1}. This is
                                    the lecture title</Typography>
                                <Button size={"small"} variant={"text"} onClick={() => setLecture(true)}>
                                    <EditRoundedIcon className={classes.editIcon}/>
                                </Button>
                            </Box>
                        )
                    })}
                </Box>
                <Button className={classes.addBtn} onClick={() => setLecture(true)}>
                    + Add Lecture
                </Button>
                <FormControl style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 15}}>
                    <Button size={"small"} className={classes.deleteBtn}>Delete</Button>
                    <Button size={"small"} className={classes.saveBtn}>Save</Button>
                </FormControl>
                <AddLecture open={lecture} setOpen={setLecture}/>
            </Box>
        </Dialog>
    );
}

const AddLecture = ({open, setOpen}) => {
    const classes = useStyles();
    const modules = [1, 2, 3];
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Box className={classes.wrapper} display={"flex"} flexDirection={"column"}>
                <Typography variant={"h2"} className={classes.title}>Create Lecture</Typography>
                <FormControl style={{marginBottom: 15}}>
                    <TextField label={"Title"} size={"small"}/>
                </FormControl>
                <FormControl style={{marginBottom: 15}}>
                    <TextField label={"Description"} size={"small"}/>
                </FormControl>
                <FormControl style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                    <Button size={"small"} className={classes.deleteBtn}>Delete</Button>
                    <Button size={"small"} className={classes.saveBtn}>Save</Button>
                </FormControl>
            </Box>
        </Dialog>
    );
}

export default EditCourse;
