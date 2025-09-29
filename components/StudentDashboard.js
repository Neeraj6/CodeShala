/*
 * @author Gaurav Kumar
 */

import React, {useContext, useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Collapse,
    Container,
    Dialog,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import Iframe from 'react-iframe'
import {makeStyles} from "@material-ui/core/styles";
import Head from "next/head";
import Header from "../components/Header";
import {Swiper, SwiperSlide} from "swiper/react";
import AddIcon from '@material-ui/icons/Add';
import {gql, useMutation, useQuery} from '@apollo/client';
import {AuthContext} from "../context/auth";
import {Alert} from '@material-ui/lab';
import urlRegex from "url-regex";

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
        padding: "0.5rem 2rem"
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
        textAlign: "right",
        marginRight:20
    },
    courseProgress: {
        margin: "0.7rem 20px",
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
        fontWeight: 600,
        margin:"10px 0px",
        padding:"0rem 20px",
        display: "-webkit-box",
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
    },
    courseDesc: {
        fontFamily: "Raleway",
        color: "#7C7C7C",
        fontSize: "0.9rem",
        marginBottom: "1rem",
        fontWeight: 500,
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        minHeight: 64,
        padding:"0rem 20px"
    },
    courseImage: {
        height: 195,
        width: "100%"
    },
    courseItem: {
        padding: "0rem 0rem",
        margin: "2rem 10px",
        borderRadius:10,
        backgroundColor:"#e0e0e0",
        overflow:"hidden",
        "&:hover":{
            boxShadow:"20px 20px 60px #bebebe, -20px -20px 60px #ffffff"
        }
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
    }
}));

const StudentDashboard = () => {
    const classes = useStyles();
    return (
        <Box>
            <Head>
                <title>Codeshala Dashboard </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <Container className={classes.container}>
                <Stats/>
                <Courses/>
                <Projects/>
                <Apps/>
            </Container>
        </Box>
    );
};

const CLASSES = gql`
    query CLASSES($startDate:String, $endDate:String,$page:Int, $limit:Int){
        classes(limit:$limit,page:$page, startDate:$startDate, endDate:$endDate,status: "complete") {
            docs{
                _id

            }
            hasPrevPage
            hasNextPage
            page
            prevPage
            nextPage
            totalPages
            totalDocs
        }
        orders(limit:$limit, orderBy:"-updatedAt", page:$page){
            docs{
                _id
                transactionId
                orderId
                item{
                    _id
                    title
                    description
                    cover
                    modules{
                        _id
                        title
                        description
                        watchTime
                    }
                }
                amount
                status
                updatedAt
                purchasedFor{
                    _id
                    profile{
                        _id
                        name
                        profilePic
                    }
                }
            }
            totalDocs
            hasNextPage
            hasPrevPage
            page
        }
    }
`;

const Stats = () => {
    const classes = useStyles();
    const {data} = useQuery(CLASSES);
    const {profile} = useContext(AuthContext);
    return (
        <Grid container spacing={5}>
            <Grid item xs={6} md={4}>
                <Card className={classes.statsBox}>
                    <CardContent style={{padding: 0}}>
                        <Typography variant={"h6"} className={classes.statsName}>TOTAL CLASSES</Typography>
                        <Typography variant={"h3"}
                                    className={classes.statsNum}>{data?.classes?.totalDocs ? data?.classes?.totalDocs : 0}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={4}>
                <Card className={classes.statsBox}>
                    <CardContent style={{padding: 0}}>
                        <Typography variant={"h6"} className={classes.statsName}>TOTAL COURSES</Typography>
                        <Typography variant={"h3"}
                                    className={classes.statsNum}>{profile?.profile?.courses?.length ?? 0}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Card className={classes.statsBox}>
                    <CardContent style={{padding: 0}}>
                        <Typography variant={"h6"} className={classes.statsName}>TOTAL PROJECTS</Typography>
                        <Typography variant={"h3"}
                                    className={classes.statsNum}>{profile?.profile?.projects ? profile?.profile?.projects?.length : 0}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
const ORDERS = gql`
    query ORDERS($page:Int, $limit:Int){
        orders(limit:$limit, orderBy:"-updatedAt", page:$page){
            docs{
                _id
                transactionId
                orderId
                classes
                item{
                    _id
                    title
                    description
                    cover
                    modules{
                        _id
                        title
                        description
                        watchTime
                    }
                }
                amount
                status
                updatedAt
                purchasedFor{
                    _id
                    profile{
                        _id
                        name
                        profilePic
                    }
                }
            }
            totalDocs
            hasNextPage
            hasPrevPage
            page
        }
    }
`;
const Courses = () => {
    const classes = useStyles();
    const {data} = useQuery(ORDERS, {
        variables: {
            limit: 20,
            page: 1
        }
    });
    return (
        <Box style={{marginTop: "5rem"}}>
            <Typography variant={"h3"} className={classes.title}>Courses</Typography>
            <Swiper
                slidesPerView={3}
                navigation
                className={classes.coursesBox}
                breakpoints={{
                    0: {
                        slidesPerView: 1.5,
                        spaceBetween: 0,
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    }
                }}>
                {data?.orders?.docs?.map((order, key) => {
                    return (
                        <SwiperSlide key={key}>
                            <Course order={order}/>
                        </SwiperSlide>
                    )
                })}
                {data?.orders?.totalDocs === 0 &&
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} minHeight={"15rem"} pt={2} pb={2}>
                    <img src={"/assets/nothing.gif"} alt={"nothing found"} width={"20%"}/>
                </Box>
                }
            </Swiper>
        </Box>
    );
}

const ORDERCLASSES = gql`
    query CLASSES($page:Int, $limit:Int, $student:String, $course:String, $classType:String, $order:ID, $status:String){
        classes(limit:$limit,page:$page,  student: $student,  course: $course,classType:$classType, order:$order, status: $status) {
            hasPrevPage
            hasNextPage
            page
            prevPage
            nextPage
            totalPages
            totalDocs
        }
    }
`;

const Course = ({order}) => {
    const classes = useStyles();
    const {loading, error, data} = useQuery(ORDERCLASSES, {
        variables: {
            student: order?.purchasedFor?._id,
            classType: "lecture",
            order: order?._id,
            status: "complete"
        }
    });
    return (
        <Box className={classes.courseItem}>
            <img
                src={order?.item?.cover ? `${process.env.S3_URL}${order?.item?.cover}` : "/assets/hero-home-banner.png"}
                className={classes.courseImage}
                alt={"courseImage"}/>
            <LinearProgress value={parseInt((data?.classes?.totalDocs * 100) / order?.classes)}
                            className={classes.courseProgress} variant={loading ? "indeterminate" : "determinate"}/>
            <Typography variant={"subtitle2"}
                        className={classes.courseProgressText}>{`${data?.classes?.totalDocs}/ ${order?.classes}`}</Typography>
            <Typography variant={"h3"}
                        className={classes.courseName}>{order?.item?.title}</Typography>
            {/*<Typography variant={"body1"}*/}
            {/*            className={classes.courseDesc}>{order?.item?.description}</Typography>*/}
            {/*<Button variant={"contained"} className={classes.startClassBtn}>Start Class</Button>*/}
        </Box>
    )
}

const Projects = () => {
    const classes = useStyles();
    let courses = [1, 2, 3, 4];
    const [open, setOpen] = useState(false);
    const {profile} = useContext(AuthContext);
    const [games, setGames] = useState([]);
    useEffect(() => {
        let g = [];
        for (let i = 0; i < profile?.profile?.projects?.length; i++){
            let project = profile?.profile?.projects?.[i];
            if (project?.projectType === "game") {
                g = [...g, project];
            }
        }
        setGames(g);

    }, [profile])
    return (
        <Box style={{marginTop: "5rem"}}>
            <Box style={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant={"h3"} className={classes.title}>Games</Typography>
                <Button className={classes.addProject} variant={"contained"}
                        startIcon={<AddIcon/>}
                        onClick={() => setOpen(true)}>Add Game</Button>
                {open && <AddProject open={open} setOpen={setOpen}/>}
            </Box>
            <Swiper
                slidesPerView={3}
                className={classes.coursesBox}
                navigation={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1.5,
                        spaceBetween: 0,
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    }
                }}>
                {games?.map((item, key) => {
                    if (item?.projectType === "game") {
                        return (
                            <SwiperSlide key={key}>
                                <Project item={item}/>
                            </SwiperSlide>
                        )
                    }
                })}
                {games?.length === 0 &&
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} minHeight={"15rem"} pt={2} pb={2}
                     width={"100%"}>
                    <img src={"/assets/nothing.gif"} alt={"nothing found"} width={"20%"}/>
                </Box>
                }
            </Swiper>
        </Box>
    );
}

const Apps = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {profile} = useContext(AuthContext);
    const [apps, setApps] = useState([]);
    useEffect(() => {
        let g = [];
        for (let i = 0; i < profile?.profile?.projects?.length; i++){
            let project = profile?.profile?.projects?.[i];
            if (project?.projectType === "app") {
                g = [...g, project];
            }
        }
        setApps(g);
    }, [profile])
    return (
        <Box style={{marginTop: "5rem"}}>
            <Box style={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant={"h3"} className={classes.title}>Apps</Typography>
                <Button className={classes.addProject} variant={"contained"}
                        startIcon={<AddIcon/>}
                        onClick={() => setOpen(true)}>Add App</Button>
                {open && <AddProject open={open} setOpen={setOpen}/>}
            </Box>
            <Swiper
                slidesPerView={3}
                navigation={true}
                className={classes.coursesBox}
                breakpoints={{
                    0: {
                        slidesPerView: 1.5,
                        spaceBetween: 0,
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    }
                }}>
                {apps?.map((item, key) => {
                    if (item?.projectType === "app") {
                        return (
                            <SwiperSlide key={key}>
                                <Project item={item}/>
                            </SwiperSlide>
                        )
                    }
                })}
                {apps?.length === 0 &&
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} minHeight={"15rem"} pt={2}
                     pb={2} width={"100%"}>
                    <img src={"/assets/nothing.gif"} alt={"nothing found"} width={"20%"}/>
                </Box>
                }
            </Swiper>
        </Box>
    );
}

export const Project = ({item}) => {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    return (
        <Box className={classes.courseItem}>
            <img
                src={item?.cover ? `${process.env.S3_URL}${item?.cover}` : item?.thumbnail ? item?.thumbnail : "/assets/projects/default.jpg"}
                className={classes.courseImage}
                alt={"courseImage"}/>
            {/*<LinearProgress value={30} className={classes.courseProgress} variant={"determinate"}/>*/}
            {/*<Typography variant={"subtitle2"}*/}
            {/*            className={classes.courseProgressText}></Typography>*/}
            <Typography variant={"h3"} className={classes.courseName}>{item?.title}</Typography>
            <Typography variant={"body1"}
                        className={classes.courseDesc}>{item?.description}</Typography>
            <Box textAlign={"center"} pl={2} pb={2} pr={2}>
                {item?.linkType?.toLowerCase() === "link" &&
                <a href={item?.link} target={"_blank"} style={{textDecoration: "none"}}>
                    <Button variant={"contained"} className={classes.editProject}>View</Button>
                </a>
                }
                {item?.linkType?.toLowerCase() === "embed" &&
                <Button variant={"contained"} className={classes.editProject}
                        onClick={() => setModal(true)}>View</Button>}
                {/*<Button variant={"contained"} className={classes.moreProject}>View</Button>*/}
            </Box>
            <EmbedLink open={modal} setOpen={setModal} project={item}/>
        </Box>
    )
    /* return (
         <ListItem className={classes.courseItem}>
             <Avatar src={project?.cover ? `${process.env.S3_URL}${project?.cover}` : "/assets/pavan.png"}
                     className={classes.courseImage}/>
             <Box>
                 <Typography variant={"h3"}
                             className={classes.courseName}>{project?.title}</Typography>
                 <Typography variant={"body1"}
                             className={classes.courseDesc}>{project?.description}</Typography>
                 {project?.linkType?.toLowerCase() === "link" &&
                 <a href={project?.link} target={"_blank"} style={{textDecoration: "none"}}>
                     <Button variant={"contained"} startIcon={<VisibilityOutlinedIcon/>}
                             className={classes.viewBtn}
                             style={{marginTop: "1rem"}}>
                         View Code
                     </Button>
                 </a>
                 }
                 {project?.linkType?.toLowerCase() === "embed" &&
                 <Button variant={"contained"} startIcon={<VisibilityOutlinedIcon/>}
                         className={classes.viewBtn}
                         onClick={() => setModal(true)}
                         style={{marginTop: "1rem"}}>
                     View Code
                 </Button>}
                 <EmbedLink open={modal} setOpen={setModal} project={project}/>
             </Box>
         </ListItem>
     );*/
};

const EmbedLink = ({open, project, setOpen}) => {
    const classes = useStyles();
    return (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title">
            <Iframe url={`${project?.link}/embed`}
                    width="450px"
                    height="450px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>
        </Dialog>
    );
}

const ADDPROJECT = gql`
    mutation ADDPROJECT($title:String!, $type:String,$description:String, $link:String, $linkType:String, $cover:String){
        createProject(projectInput:{
            title:$title,
            description:$description,
            link:$link,
            cover:$cover,
            linkType:$linkType
            projectType:$type
        }){
            _id
            title
            description
            link
            cover
            projectType
            linkType
            createdAt
        }
    }
`;

const AddProject = ({open, setOpen}) => {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [cover, setCover] = useState("");
    const [type, setType] = useState("game");
    const [linkType, setLinkType] = useState("embed");
    const [addProject, {data, loading, error}] = useMutation(ADDPROJECT);
    const [e, setE] = useState(false);
    const [message, setM] = useState("");
    const {setSuccess, setError, setMessage, profile, setProfile} = useContext(AuthContext);
    const submitForm = (e) => {
        e.preventDefault();
        if (title?.length > 0 && link?.length > 0 && urlRegex().test(link)) {
            addProject({variables: {title, description, link, cover, linkType, type}})
                .then(({data}) => {
                    console.log(data?.createProject);
                    setMessage("Project added successfully.");
                    let project = data?.createProject;
                    let p = profile;
                    p.profile.projects.push(project);
                    setProfile(Object.assign({}, p));
                    setSuccess(true);
                    setOpen(false);
                })
                .catch(e => {
                    console.log(e);
                    setE(true);
                    setM(e.message);
                    // alert(e.message);
                })
        } else {
            let m = "";
            if (title?.length === 0) {
                m += "Title should not be empty. ";
            }
            if (link?.length === 0 || !urlRegex().test(link)) {
                m += "Link is not valid. "
            }
            setE(true);
            setM(m);
        }
        return true;
    }
    return (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title">
            <DialogTitle id={"simple-dialog-title"}>Create New Project</DialogTitle>
            <form onSubmit={submitForm} method={"post"}>
                <Box display={"flex"} flexDirection={"column"} className={classes.addProjectWrapper}>

                    {(e || error) &&
                    <Collapse in={e || error}>
                        <Alert varaint={"filled"} severity={"error"}>{message}</Alert>
                    </Collapse>
                    }
                    <FormControl style={{marginBottom: "2rem", marginTop: "2rem"}}>
                        <TextField variant={"outlined"} label={"Title"} size={"small"} value={title}
                                   onChange={e => setTitle(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <TextField variant={"outlined"} label={"Description"} size={"small"} multiline={true} rows={3}
                                   value={description} onChange={e => setDescription(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}} variant={"outlined"} size={"small"}>
                        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            label="Age"
                        >
                            <MenuItem value={"game"}>Game</MenuItem>
                            <MenuItem value={"app"}>App</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}} variant={"outlined"} size={"small"}>
                        <InputLabel id="demo-simple-select-outlined-label">Link Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={linkType}
                            onChange={(e) => setLinkType(e.target.value)}
                            label="Age"
                        >
                            <MenuItem value={"embed"}>Embed</MenuItem>
                            <MenuItem value={"link"}>Link</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <TextField variant={"outlined"} label={"Link "} size={"small"} value={link}
                                   onChange={e => setLink(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <UploadCover cover={cover} setCover={setCover}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <Button variant={"contained"} className={classes.createBtn} onClick={submitForm}
                                type={"submit"}
                                disabled={loading}>
                            {loading ?
                                <CircularProgress size={30} style={{color: "white"}}/> : "Create Project"}</Button>
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
    const [uploadFile, {loading}] = useMutation(UPLOADFILE);
    const [file, setFile] = useState();
    let {setSuccess, setError, setMessage} = useContext(AuthContext);
    return (
        <>
            {cover && <img src={`${process.env.S3_URL}${cover}`}/>}
            <Button variant={"contained"} component={"label"} size={"small"} disabled={loading}>
                {loading ? 'Uploading..' : 'Upload Cover Image'}
                <input type={"file"} hidden={true} accept={"image/*"} onChange={e => {
                    setFile(e.target.files[0]);
                    uploadFile({variables: {file: e.target.files[0]}})
                        .then(({data}) => {
                            console.log(data)
                            setMessage("File uploaded successfully.");
                            setSuccess(true)
                            setCover(data?.uploadFile?.filename)
                        })
                        .catch(e => {
                            console.log(e);
                            setMessage(e?.message);
                            setError(true)
                        })
                }}/>
            </Button>
        </>
    )
};

export default StudentDashboard;
