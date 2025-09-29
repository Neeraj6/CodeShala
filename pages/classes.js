/*
 * @author Gaurav Kumar
 */

import React, {useContext, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Collapse,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import 'date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from "@material-ui/core/styles";
import Head from "next/head";
import Header from "../components/Header";
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import {gql, useMutation, useQuery} from "@apollo/client";
import {AuthContext} from "../context/auth";
import AddIcon from '@material-ui/icons/Add';
import {format} from 'date-fns';
import TablePagination from "@material-ui/core/TablePagination";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Alert} from '@material-ui/lab';
import urlRegex from 'url-regex';
import {CourseSelect, KidSelect, TeacherSelect} from "./orders";
import {useRouter} from "next/router";
import Link from "next/link";
import ErrorPage from "../components/ErrorPage";
import Loader from "../components/Loader";
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: "6rem"
    },
    title: {
        fontFamily: "Raleway",
        fontWeight: "bold",
        color: "#494949",
        fontSize: "2rem",
        margin: "2rem 0rem"
    },
    tableHead: {
        backgroundColor: "#0FBD8C"
    },
    tableHeadCell: {
        color: "white",
        textTransform: "uppercase",
        fontWeight: 500,
        fontFamily: "Raleway"
    },
    tableContainer: {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.13)",
        borderRadius: 10, border: "1px solid #f6f1f1",
    },
    startBtn: {
        backgroundColor: "#0FBD8C",
        color: "white",
        "&:hover": {
            backgroundColor: "#0FBD8C",
        },
        fontSize: 12
    },
    cancelBtn: {
        backgroundColor: "#D96D6D",
        color: "white",
        fontSize: 12,
        "&:hover": {
            backgroundColor: "#D96D6D",
        }
    },
    addProject: {
        margin: "0rem 0rem",
        backgroundColor: "#0FBD8C",
        color: "white",
        boxShadow: "0px 7px 8px rgba(15, 189, 140, 0.32)",
        borderRadius: 10,
        "&:hover": {
            backgroundColor: "#0FBD8C"
        },
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
        [theme.breakpoints.up("sm")]: {
            display: "flex",
            marginLeft: 5
        }
    },
    addProjectMobile: {
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
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
    classStatus: {
        fontSize: 14,
        textTransform: "capitalize"
    },
    classFeedback: {
        fontSize: 10,
        color: "#6f6d6d"
    },
    textField: {
        margin: "5px 5px",
        maxWidth: 150
    },
    filterWrapper: {
        marginRight: "40px",
        [theme.breakpoints.down("sm")]: {
            marginRight: 0,
            "& > button": {
                display: "block"
            }
        },
        [theme.breakpoints.up("sm")]: {
            marginRight: 0,
            "& > button": {
                display: "none"
            }
        },

    },
    filtersList: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }
}));
const CLASSES = gql`
    query CLASSES($startDate:String, $endDate:String,$page:Int, $limit:Int, $student:String,$teacher:String, $course:String, $classType:String){
        classes(limit:$limit,page:$page, startDate:$startDate, endDate:$endDate, student: $student, teacher: $teacher, course: $course,classType:$classType) {
            docs {
                _id
                course {
                    _id
                    title
                }
                link
                title
                feedback
                createdAt
                homework
                scheduledAt
                teacher{
                    _id
                    profile{
                        _id
                        name
                        profilePic
                    }
                }
                createdFor{
                    _id
                    profile{
                        _id
                        name
                        profilePic
                    }
                    parent{
                        _id
                        profile{
                            _id
                            name
                            profilePic
                        }
                    }
                }
                status
                createdBy {
                    _id
                    profile{
                        _id
                        name
                        profilePic
                    }
                }
                updatedAt
                classType
                createdAt
            }
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

const UPDATECLASS = gql`
    mutation UPDATECLASS($id:ID!, $title:String!, $status:String!, $feedback:String, $link:String!, $teacher:ID, $scheduledAt:String, $homework:String){
        updateClass(classId:$id, title:$title, status:$status, feedback:$feedback, link:$link, teacher:$teacher, scheduledAt: $scheduledAt,homework: $homework){
            _id
            course {
                _id
                title
            }
            link
            title
            feedback
            createdAt
            homework
            scheduledAt
            createdFor{
                _id
                profile{
                    _id
                    name
                    profilePic
                }
                parent{
                    _id
                    profile{
                        _id
                        name
                        profilePic
                    }
                }
            }
            status
            createdBy {
                _id
                profile{
                    _id
                    name
                    profilePic
                }
            }
            updatedAt
            createdAt
        }
    }
`;

const Classes = () => {
    const router = useRouter();
    const classes = useStyles();
    const {loading, error, data, fetchMore, refetch} = useQuery(CLASSES, {
        variables: {
            student: router?.query?.kid,
            classType: router?.query?.classType
        },
        fetchPolicy:"network-only"
    });
    const [student, setStudent] = useState(undefined);
    const [teacher, setTeacher] = useState(undefined);
    const [course, setCourse] = useState("");
    const [parentName, setParentName] = useState("");
    const [noOfClasses, setNoOfClasses] = useState(undefined);
    let {profile} = useContext(AuthContext);
    const [startDate, setStartDate] = useState(format(new Date(2020, 0, 1), "yyyy-MM-dd"));
    const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [addClass, setAddClass] = useState(false);

    if (error) {
        return (
            <ErrorPage error={error} message={error?.message}/>
        )
    }
    if (loading) {
        return (
            <Loader/>
        )
    }
    return (
        <Box>
            <Head>
                <title>Codeshala Classes </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main>
                <Box className={classes.container}>
                    <Container>
                        <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
                             flexWrap={"wrap"}>
                            <Typography variant={"h2"} className={classes.title}>Classes</Typography>
                            <Filters student={student} teacher={teacher} course={course} parentName={parentName}
                                     setStudent={setStudent} setTeacher={setTeacher} setCourse={setCourse}
                                     setParentName={setParentName}
                                     endDate={endDate} startDate={startDate} setEndDate={setEndDate}
                                     setStartDate={setStartDate}
                                     refetch={refetch}/>
                            {profile?.role === "teacher" || profile?.role === "manager" || profile?.role === "super_admin" ?
                                <Box>
                                    <Button className={classes.addProject} variant={"contained"}
                                            startIcon={<AddIcon/>}
                                            onClick={() => setAddClass(true)}>Create Class</Button>
                                    <IconButton onClick={() => setAddClass(true)}
                                                className={classes.addProjectMobile}>
                                        <AddIcon/>
                                    </IconButton>
                                    {addClass && <CreateClass open={addClass} setOpen={setAddClass} refetch={refetch}/>}
                                </Box>
                                : ""}

                        </Box>
                        <TableContainer className={classes.tableContainer}>
                            <Table>
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell className={classes.tableHeadCell} align={"center"}>S.no.</TableCell>
                                        <TableCell className={classes.tableHeadCell} align={"center"}>Class
                                            Count</TableCell>
                                        <TableCell className={classes.tableHeadCell} align={"center"}>Course
                                            Name</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Parent</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Students</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Teacher</TableCell>
                                        <TableCell className={classes.tableHeadCell} align={"center"}>Date</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Actions</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Homework</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.classes?.docs?.map((item, key) => {
                                        return (
                                            <Item item={item} key={key} index={key}/>
                                        )
                                    })}
                                </TableBody>
                                <TablePagination
                                    count={data?.classes?.totalDocs}
                                    page={data?.classes?.page - 1}
                                    rowsPerPage={data?.classes?.docs?.length}
                                    onChangePage={(e, newPage) => {
                                        if ((data?.classes?.hasNextPage && (newPage + 1) > data?.classes?.page) || (data?.classes?.hasPrevPage && (newPage + 1) < data?.classes?.page)) {
                                            fetchMore({
                                                variables: {page: newPage + 1},
                                                updateQuery: (prev, {fetchMoreResult}) => {
                                                    console.log(fetchMoreResult)
                                                    if (!fetchMoreResult) {
                                                        return prev;
                                                    }
                                                    return fetchMoreResult;
                                                }
                                            })
                                                .then(res => {
                                                    console.log(res);
                                                })
                                                .catch(e => {
                                                    console.log(e)
                                                })
                                        }
                                    }}
                                    onChangeRowsPerPage={(e) => {
                                        fetchMore({
                                            variables: {
                                                page: data?.classes?.page,
                                                limit: e.target.value,
                                                startDate,
                                                endDate
                                            },
                                            updateQuery: (prev, {fetchMoreResult}) => {
                                                if (!fetchMoreResult) {
                                                    return prev;
                                                }
                                                return fetchMoreResult;
                                            }
                                        })
                                            .then(res => {
                                                console.log(res);
                                            })
                                            .catch(e => {
                                                console.log(e)
                                            })
                                    }}
                                />
                            </Table>
                        </TableContainer>
                    </Container>
                </Box>
            </main>

        </Box>
    )
};

const Filters = ({
                     student,
                     setStudent,
                     teacher,
                     setTeacher,
                     course,
                     setCourse,
                     startDate,
                     setStartDate,
                     endDate,
                     setEndDate,
                     refetch
                 }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    let {profile} = useContext(AuthContext);
    return (
        <Box alignItems={"center"} display={"flex"} ml={"auto"} flexWrap={"wrap"} className={classes.filterWrapper}>
            <IconButton onClick={() => setOpen(true)}>
                <FilterListIcon/>
            </IconButton>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Filters</DialogTitle>
                <DialogContent dividers>
                    <Box>
                        {profile?.role === "parent" ?
                            <KidSelect student={student} setStudent={setStudent}/> : ""}
                        {profile?.role === "super_admin" || profile?.role === "manager" ?
                            <>
                                <KidSelect student={student} setStudent={setStudent}/>
                                <TeacherSelect teacher={teacher} setTeacher={setTeacher}/>
                                <CourseSelect course={course} setCourse={setCourse}/>
                            </> : ""}
                        <TextField
                            label="Start Date"
                            type="date"
                            variant={"outlined"}
                            size={"small"}
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className={classes.textField}
                        />
                        <TextField
                            style={{marginLeft: 10}}
                            label="End Date"
                            type="date"
                            variant={"outlined"}
                            size={"small"}
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className={classes.textField}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} style={{margin: "5px 15px 5px"}}
                            onClick={() => {
                                refetch({
                                    page: 1, startDate, endDate, student, teacher, course
                                })
                                    .then(() => {
                                        setOpen(false);
                                    })
                                    .catch(e => {
                                        setOpen(false);
                                    })
                            }}>Apply Filter</Button>
                </DialogActions>
            </Dialog>
            <Box className={classes.filtersList} alignItems={"center"} ml={"auto"} flexWrap={"wrap"}>
                {profile?.role === "parent" ?
                    <KidSelect student={student} setStudent={setStudent}/> : ""}
                {profile?.role === "super_admin" || profile?.role === "manager" ?
                    <>
                        <KidSelect student={student} setStudent={setStudent}/>
                        <TeacherSelect teacher={teacher} setTeacher={setTeacher}/>
                        <CourseSelect course={course} setCourse={setCourse}/>
                    </> : ""}
                <TextField
                    label="Start Date"
                    type="date"
                    variant={"outlined"}
                    size={"small"}
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className={classes.textField}
                />
                <TextField
                    style={{marginLeft: 10}}
                    label="End Date"
                    type="date"
                    variant={"outlined"}
                    size={"small"}
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className={classes.textField}
                />
                <Button variant={"contained"} style={{margin: "5px 15px 5px"}}
                        onClick={() => {
                            refetch({
                                page: 1, startDate, endDate, student, teacher, course
                            })
                        }}>Apply Filter</Button>
            </Box>
        </Box>
    )
}

const Item = ({item, index}) => {
    const classes = useStyles();
    let {profile} = useContext(AuthContext);
    const [homework, setHomework] = useState(false);
    const [edit, setEdit] = useState(false);
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <TableRow>
            <TableCell align={"center"}>{(index + 1)}</TableCell>
            <TableCell align={"center"}>{item?.title}</TableCell>
            <TableCell align={"center"}>{item?.course?.title}</TableCell>
            <TableCell align={"left"}>
                {/*<Box style={{*/}
                {/*    display: "flex",*/}
                {/*    alignItems: "center",*/}
                {/*    justifyContent: "center"*/}
                {/*}}>*/}
                {/*    <AvatarGroup max={1}>*/}
                {/*<Tooltip title={item?.createdFor?.parent?.profile?.name}>*/}
                <Box style={{
                    display: "flex",
                    alignItems: "center",
                    textTransform: "capitalize",
                    justifyContent: "center",
                    flexDirection: "column",
                }}>
                    {item?.classType === "demo" ?
                        <Typography style={{color: "#bbb8b8"}} align={"center"}>Demo class</Typography> :
                        <>
                            <Avatar
                                src={`${process.env.S3_URL}${item?.createdFor?.parent?.profile?.profilePic}`}/>
                            <Typography align={"center"}>
                                {item?.createdFor?.parent?.profile?.name}
                            </Typography>
                        </>
                    }
                </Box>
                {/*<Avatar src={`${process.env.S3_URL}${item?.createdFor?.parent?.profile?.profilePic}`}/>*/}
                {/*</Tooltip>*/}
                {/*</AvatarGroup>*/}
                {/*</Box>*/}
            </TableCell>
            <TableCell align={"left"}>
                <Box style={{
                    display: "flex",
                    alignItems: "center",
                    textTransform: "capitalize",
                    justifyContent: "center",
                    flexDirection: "column",
                }}>
                    {item?.classType === "demo" ?
                        <Typography style={{color: "#bbb8b8"}} align={"center"}>Demo class</Typography> :
                        <>
                            <Avatar
                                src={`${process.env.S3_URL}${item?.createdFor?.profile?.profilePic}`}/>
                            <Typography
                                align={"center"}>{item?.classType === "demo" ? "Demo class" : item?.createdFor?.profile?.name}</Typography>
                        </>
                    }
                </Box>
            </TableCell>
            <TableCell align={"left"}>
                {/*<Box style={{*/}
                {/*    display: "flex",*/}
                {/*    alignItems: "center",*/}
                {/*    justifyContent: "center"*/}
                {/*}}>*/}
                {/*<AvatarGroup max={1}>*/}
                {/*<Tooltip title={item?.teacher?.profile?.name}>*/}
                <Box style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textTransform: "capitalize"
                }}>
                    <Avatar
                        src={`${process.env.S3_URL}${item?.teacher?.profile?.profilePic}`}/>
                    <Typography align={"center"}>
                        {item?.teacher?.profile?.name}
                    </Typography>
                </Box>
                {/*<Avatar src={`${process.env.S3_URL}${item?.teacher?.profile?.profilePic}`}/>*/}
                {/*</Tooltip>*/}
                {/*</AvatarGroup>*/}
                {/*</Box>*/}
            </TableCell>
            <TableCell
                align={"center"}>
                <Typography
                    align={"center"} noWrap={true}>{format(new Date(parseInt(item?.scheduledAt ? item?.scheduledAt : item?.updatedAt)), "dd-MM-yyyy 'T' p")}
                </Typography>
            </TableCell>
            <TableCell align={"center"}>
                {item?.status === "not-completed" ?
                    <ButtonGroup orientation={mobile ? "vertical" : "horizontal"}
                                 style={{borderRadius: 10, overflow: "hidden"}} disabled={item?.status === "cancelled"}>
                        <a href={item?.status === "cancelled" ? "#" : item?.link} target={"_blank"}
                           onClick={item?.status === "cancelled" ? (e) => {
                               e?.preventDefault();
                               return false;
                           } : undefined}
                           style={{textDecoration: "none"}}>
                            <Button variant={"contained"} className={classes.startBtn}
                                    disabled={item?.status === "cancelled"}
                                    startIcon={
                                        <CheckCircleOutlineOutlinedIcon/>}>Start</Button>
                        </a>
                        {
                            (profile?.role === "super_admin" || profile?.role === "manager" || profile?._id === item?.createdBy?._id || profile?._id === item?.teacher?._id) ?
                                <Button variant={"contained"} className={classes.cancelBtn}
                                        startIcon={<MoreVertIcon/>}
                                        onClick={() => setEdit(true)}>
                                    Edit
                                </Button>
                                : ""

                        }
                    </ButtonGroup>
                    :
                    <Box>
                        <Typography className={classes.classStatus}
                                    style={{color: item?.status?.toLowerCase() === "complete" ? "green" : "red"}}>{item?.status}</Typography>
                        <Typography className={classes.classFeedback}>{item?.feedback}</Typography>
                    </Box>
                }
            </TableCell>
            <TableCell align={"center"}>
                <Button variant={"text"} size={"small"} color={"primary"}
                        onClick={() => setHomework(true)}>View</Button>
            </TableCell>
            {edit &&
            <EditClass open={edit} setOpen={setEdit} item={item}/>
            }
            <Dialog open={homework} onClose={() => setHomework(false)}
                    aria-labelledby={`${item?.title}-homework`}
                    aria-describedby={`${item?.title}-homework-description`}>
                <DialogTitle id={`${item?.title}-homework`}>{`${item?.title} homework`}</DialogTitle>
                <Box p={2}>
                    <Typography>{item?.homework ? item?.homework : 'No homework for this class'}</Typography>
                </Box>
            </Dialog>
        </TableRow>
    )
}

const EditClass = ({open, setOpen, item, s}) => {
    const classes = useStyles();
    let {profile, setSuccess, setError, setMessage} = useContext(AuthContext);
    const [status, setStatus] = useState(item?.status ? item?.status : "");
    const [feedback, setFeedback] = useState("");
    const [homework, setHomework] = useState(item?.homework);
    const [updateCourse, {data, loading, error}] = useMutation(UPDATECLASS);
    const [title, setTitle] = useState(item?.title ? item?.title : "");
    const [link, setLink] = useState(item?.link ? item?.link : "");
    const [scheduleDate, setScheduleDate] = useState(format(item?.scheduledAt ? new Date(parseInt(item?.scheduledAt?.toString())) : new Date(), "yyyy-MM-dd'T'hh:mm"));
    const [e, setE] = useState(false);
    const [m, setM] = useState("");
    const submitForm = (e) => {
        e.preventDefault();
        if (title?.length > 0 && link?.length > 0 && urlRegex().test(link)) {
            updateCourse({
                variables: {
                    id: item?._id,
                    title,
                    feedback,
                    link,
                    status,
                    scheduledAt: scheduleDate,
                    homework
                }
            })
                .then(({data}) => {
                    console.log(data);
                    // alert("Class Edited successfully.")
                    setSuccess(true);
                    setMessage("Class Edited successfully");
                    setOpen(false)
                })
                .catch(e => {
                    console.log(e);
                    setE(true);
                    setM(e?.message);
                })
        } else {
            let m = "";
            if (title?.length === 0) {
                m += "Title should not be empty. "
            }
            if (link?.length === 0 && !urlRegex().test(link)) {
                m += "Link is not valid. "
            }

            setE(true);
            setM(m);
        }
        return false;
    };
    return (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title">
            <DialogTitle id={"simple-dialog-title"}>Edit class</DialogTitle>
            <form onSubmit={submitForm} method={"post"}>
                <Box display={"flex"} flexDirection={"column"} className={classes.addProjectWrapper}>
                    {(e || error) &&
                    <Collapse in={e || error}>
                        <Alert varaint={"filled"} severity={"error"}>{m}</Alert>
                    </Collapse>
                    }
                    <FormControl style={{marginBottom: "2rem", marginTop: "2rem"}}>
                        <TextField variant={"outlined"} label={"Title"} size={"small"} value={title}
                                   onChange={e => setTitle(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}} variant={"outlined"} size={"small"}>
                        <InputLabel id="demo-simple-select-outlined-label">Select Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            label="Age"
                        > <MenuItem value={"not-completed"}>Not completed</MenuItem>
                            <MenuItem value={"cancelled"}>Cancel</MenuItem>
                            <MenuItem value={"complete"}>Completed</MenuItem>
                            <MenuItem value={"absent"}>Student is absent</MenuItem>
                            <MenuItem value={"error"}>Technical Error</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <TextField variant={"outlined"} label={"Feedback"} size={"small"} value={feedback}
                                   onChange={e => setFeedback(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <TextField variant={"outlined"} label={"Homework"} size={"small"} value={homework}
                                   multiline={true}
                                   rows={5}
                                   onChange={e => setHomework(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <TextField variant={"outlined"} label={"Link"} size={"small"} value={link}
                                   onChange={e => setLink(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <TextField
                            id="date"
                            label="Schedule Date"
                            type="datetime-local"
                            size={"small"}
                            variant={"outlined"}
                            value={scheduleDate}
                            onChange={e => setScheduleDate(e.target.value)}
                        />
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <Button variant={"contained"} className={classes.createBtn} onClick={submitForm}
                                type={"submit"}>
                            {loading ? <CircularProgress size={30} style={{color: "white"}}/> : "Save"}</Button>
                    </FormControl>
                </Box>
            </form>
        </Dialog>
    );
}

const AddCLASS = gql`
    mutation AddCLASS($course:ID!, $student:ID, $link:String, $title:String, $teacher:ID!, $scheduledAt:String){
        scheduleClass(classInput: {course: $course, createdFor: $student, teacher: $teacher, title:$title, link:$link, scheduledAt: $scheduledAt}){
            _id
            course {
                _id
                title
            }
            link
            title
            feedback
            homework
            createdAt
            scheduledAt
            teacher{
                _id
                profile{
                    _id
                    name
                    profilePic
                }
            }
            createdFor{
                _id
                profile{
                    _id
                    name
                    profilePic
                }
                parent{
                    _id
                    profile{
                        _id
                        name
                        profilePic
                    }
                }
            }
            status
            createdBy {
                _id
                profile{
                    _id
                    name
                    profilePic
                }
            }
            updatedAt
            createdAt
        }
    }
`;

const COURSES = gql`
    query courses{
        courses(page: 1,limit: 10){
            docs{
                _id
                cover
                createdAt
                description
                discountPrice
                modules{
                    _id
                    title
                }
                price
                title
            }
            hasNextPage
            hasPrevPage
            nextPage
            page
            prevPage
            totalDocs
            totalPages
        },
        teachers: users(role:"teacher", limit:1000){
            docs{
                _id
                profile{
                    _id
                    name
                }
            }
        },
        students : users(role:"kid", limit:1000){
            docs{
                _id
                profile{
                    _id
                    name
                }
            }
        }
    }
`;

const CreateClass = ({open, setOpen, item, refetch}) => {
    const classes = useStyles();
    const {profile, isAuthenticated, setSuccess, setMessage} = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [course, setCourse] = useState(item ? item?._id : "");
    const [teacher, setTeacher] = useState(profile?.role?.toLowerCase() === "teacher" ? profile?._id : "");
    const [student, setStudent] = useState("");
    const [scheduleDate, setScheduleDate] = useState(format(new Date(), "yyyy-MM-dd'T'hh:mm"));
    const {data} = useQuery(COURSES);
    const [addClass, {loading, error}] = useMutation(AddCLASS);
    const [e, setE] = useState(false);
    const [message, setM] = useState("");
    const submitForm = (e) => {
        e.preventDefault();
        if (title?.length > 0 && course?.length > 0 && link?.length > 0 && urlRegex().test(link) && teacher?.length > 0 && student?.length > 0) {
            addClass({variables: {title, course, link, teacher: teacher, student, scheduledAt: scheduleDate}})
                .then(({data}) => {
                    refetch({page: 1})
                    setSuccess(true);
                    setMessage("Class created successfully.")
                    setOpen(false);
                })
                .catch(e => {
                    console.log(e);
                    setE(true);
                    setM(e?.message);
                })
        } else {
            let m = "";
            if (title?.length === 0) {
                m += "Title should not be empty. "
            }
            if (course?.length <= 0) {
                m += "Course can't be empty. "
            }
            if (teacher?.length <= 0) {
                m += "Teacher can't be empty. "
            }
            if (student?.length <= 0) {
                m += "Student can't be empty. "
            }
            if (link?.length === 0 || !urlRegex().test(link)) {
                m += "Link is not valid. "
            }

            setE(true);
            setM(m);
        }
        return false;
    }
    return (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title">
            <DialogTitle id={"simple-dialog-title"}>Create New Class</DialogTitle>
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
                    <FormControl style={{marginBottom: "2rem"}} variant={"outlined"} size={"small"}>
                        <InputLabel id="demo-simple-select-outlined-label">Course</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            label="Age"
                        >
                            {data?.courses?.docs?.map((course, key) => {
                                return (
                                    <MenuItem value={course?._id} key={key}>{course?.title}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    {isAuthenticated && profile?.role === "teacher" ?
                        <FormControl style={{marginBottom: "2rem"}}>
                            <TextField variant={"outlined"} label={"Teacher"} size={"small"}
                                       value={profile?.profile?.name}
                                       readOnly={true}
                                       disabled/>
                        </FormControl>
                        : ""
                    }
                    {isAuthenticated && (profile?.role === "super_admin" || profile?.role === "manager") ?
                        <FormControl style={{marginBottom: "2rem"}} variant={"outlined"} size={"small"}>
                            <TeacherSelect teacher={teacher} setTeacher={setTeacher}/>
                            {/*<InputLabel id="demo-simple-select-outlined-label">Teacher</InputLabel>*/}
                            {/*<Select*/}
                            {/*    labelId="demo-simple-select-outlined-label"*/}
                            {/*    id="demo-simple-select-outlined"*/}
                            {/*    value={teacher}*/}
                            {/*    onChange={(e) => setTeacher(e.target.value)}*/}
                            {/*    label="Age"*/}
                            {/*>*/}
                            {/*    {data?.teachers?.docs?.map((t, key) => {*/}
                            {/*        return (*/}
                            {/*            <MenuItem value={t?._id} key={key}>{t?.profile?.name}</MenuItem>*/}
                            {/*        )*/}
                            {/*    })}*/}
                            {/*</Select>*/}
                        </FormControl>
                        : ""}
                    <StudentSelect student={student} setStudent={setStudent} role={"kid"}/>
                    <FormControl style={{marginBottom: "2rem", marginTop:"2rem"}}>
                        <TextField variant={"outlined"} label={"Link"} size={"small"} value={link}
                                   onChange={e => setLink(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <TextField
                            id="date"
                            label="Schedule Date"
                            type="datetime-local"
                            size={"small"}
                            variant={"outlined"}
                            value={scheduleDate}
                            onChange={e => setScheduleDate(e.target.value)}
                        />
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <Button variant={"contained"} className={classes.createBtn} onClick={submitForm}
                                disabled={loading}
                                type={"submit"}>
                            {loading ? <CircularProgress size={30} style={{color: "white"}}/> : "Create Class"}</Button>
                    </FormControl>
                </Box>
            </form>
        </Dialog>
    )
};

const SEARCH_USER = gql`
    query SEARCH_USER($name:String, $role:String){
        searchUser(name: $name, limit:20, page:1, role:$role){
            docs{
                _id
                active
                profile{
                    _id
                    name
                    email
                    profilePic
                }
            }
            totalDocs
            page
        }
    }
`;

const StudentSelect = ({student, setStudent, role, title}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const {loading, data, error, refetch} = useQuery(SEARCH_USER, {
        variables: {
            name: "",
            role: role
        }
    });
    return (
        <FormControl style={{marginBottom: "0rem"}} variant={"outlined"} size={"small"}>
            <Autocomplete
                size={"small"}
                id="asynchronous-demo"
                open={open}
                fullWidth={true}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onChange={(e, v) => {
                    console.log(v?._id)
                    if (v?._id) {
                        setStudent(v?._id)
                    } else {
                        setStudent("");
                    }
                }}
                getOptionSelected={(option, value) => option?.profile?.name === value?.profile?.name}
                getOptionLabel={(option) => `${option?.profile?.email ?? ""} @ ${option?.profile?.name}`}
                options={data?.searchUser?.docs ? data?.searchUser?.docs : []}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={title ? title : "Student"}
                        variant="outlined"
                        fullWidth={true}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                        onChange={e => {
                            console.log(e?.target?.value)
                            refetch({name: e?.target?.value});
                        }}
                    />
                )}
            />

        </FormControl>
    );
};

export default Classes;

export {StudentSelect};
