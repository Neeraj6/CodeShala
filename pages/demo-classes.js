/*
 * @author Gaurav Kumar
 */

import React, {useContext, useState} from "react";
import {
    Avatar,
    Box,
    Button,
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
    Tooltip,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Head from "next/head";
import Header from "../components/Header";
import AddIcon from '@material-ui/icons/Add';
import {gql, useMutation, useQuery} from '@apollo/client';
import {format} from 'date-fns';
import TablePagination from "@material-ui/core/TablePagination";
import {AuthContext} from "../context/auth";
import urlRegex from "url-regex";
import {Alert} from "@material-ui/lab";
import {TeacherSelect} from "./orders";
import ErrorPage from "../components/ErrorPage";
import Loader from "../components/Loader";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";

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
    wrapper: {
        padding: "1rem"
    },
    subTitle: {
        fontFamily: "Raleway",
        fontWeight: "bold",
        color: "#494949",
        fontSize: "1.3rem",
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
    teacherListItem: {
        backgroundColor: "#e7e4e4",
        padding: 5,
        borderRadius: 5
    },
    addProjectWrapper: {
        padding: "0rem 4rem",
        [theme.breakpoints.down("sm")]: {
            padding: "0rem 2rem"
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
    filterWrapper: {
        marginRight: "40px",
        [theme?.breakpoints?.down("sm")]: {
            marginRight: 0,
            "& > button":{
                display: "block"
            }
        },
        [theme?.breakpoints?.up("sm")]: {
            marginRight: 0,
            "& > button":{
                display: "none"
            }
        },

    },
    filtersList: {
        display:"flex",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }
}));

const DEMOCLASSES = gql`
    query DEMOCLASSES($page:Int, $limit:Int,$startDate:String, $endDate:String){
        demoClasses(limit:$limit,page:$page, startDate:$startDate, endDate:$endDate){
            totalPages
            docs{
                _id
                parentName
                email
                phone
                kidName
                age
                grade
                scheduledClass{
                    _id
                    classType
                    status
                    link
                    feedback
                    scheduledAt
                }
                updatedAt
                createdAt
            }
            totalDocs
            page
            hasPrevPage
            hasNextPage
            prevPage
            nextPage
        }
    }
`;

const DemoClasses = () => {
    const classes = useStyles();
    const {loading, data, error, fetchMore, refetch} = useQuery(DEMOCLASSES, {variables: {limit: 10, page: 1}});
    const [startDate, setStartDate] = useState(format(new Date(2020, 0, 1), "yyyy-MM-dd"));
    const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
    if (error) {
        return <ErrorPage message={error?.message}/>
    }
    if (loading) {
        return <Loader/>
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
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography variant={"h2"} className={classes.title}>Demo Classes</Typography>
                            <Filters
                                     endDate={endDate} startDate={startDate} setEndDate={setEndDate}
                                     setStartDate={setStartDate}
                                     refetch={refetch}/>
                        </Box>
                        <TableContainer className={classes.tableContainer}>
                            <Table>
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell className={classes.tableHeadCell} align={"center"}>Date</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Parent Name</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Email ID</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Phone</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Kid Name</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Age</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Grade</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}>Actions</TableCell>
                                        <TableCell className={classes.tableHeadCell}
                                                   align={"center"}/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.demoClasses?.docs?.map((item, key) => {
                                        return (
                                            <Item key={key} item={item} refetch={refetch}/>
                                        )
                                    })}
                                </TableBody>
                                <TablePagination
                                    count={data?.demoClasses?.totalDocs}
                                    page={data?.demoClasses?.page - 1}
                                    rowsPerPage={data?.demoClasses?.docs?.length}
                                    onChangePage={(e, newPage) => {
                                        if ((data?.demoClasses?.hasNextPage && (newPage + 1) > data?.demoClasses?.page) || (data?.demoClasses?.hasPrevPage && (newPage + 1) < data?.demoClasses?.page)) {
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
                                            variables: {page: data?.payments?.page, limit: e.target.value},
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
                     startDate,
                     setStartDate,
                     endDate,
                     setEndDate,
                     refetch,
                 }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    return (
        <Box alignItems={"center"} display={"flex"} ml={"auto"} flexWrap={"wrap"} className={classes.filterWrapper}>
            <IconButton onClick={() => setOpen(true)}>
                <FilterListIcon/>
            </IconButton>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Filters</DialogTitle>
                <DialogContent dividers>
                    <Box>
                        <TextField
                            id="date"
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
                            id="date"
                            label="End Date"
                            type="date"
                            size={"small"}
                            variant={"outlined"}
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} style={{marginLeft: 15}}
                            onClick={() => {
                                refetch({
                                    page: 1, startDate, endDate
                                })
                                    .then(()=>{
                                        setOpen(false)
                                    })
                                    .catch(e=>{
                                        setOpen(false)
                                    })
                            }}>Apply Filter</Button>
                </DialogActions>
            </Dialog>
            <Box className={classes.filtersList} alignItems={"center"} ml={"auto"} flexWrap={"wrap"}>
                <TextField
                    id="date"
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
                    id="date"
                    label="End Date"
                    type="date"
                    size={"small"}
                    variant={"outlined"}
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button variant={"contained"} style={{marginLeft: 15}}
                        onClick={() => {
                            refetch({
                                page: 1, startDate, endDate
                            });
                        }}>Apply Filter</Button>
            </Box>
        </Box>
    )
}

const DELETECLASS = gql`
    mutation DELETECLASS($id:ID!){
        deleteDemoClass(id: $id){
            _id
            age

        }
    }
`;

const Item = ({item, refetch}) => {
    const classes = useStyles();
    const [addClass, setAddClass] = useState(false);
    const [deleteClass, {data, loading, error}] = useMutation(DELETECLASS);
    const [deleted, setDeleted] = useState(false)
    return (
        <>
            {deleted ? "" :
                <TableRow>
                    <TableCell
                        align={"center"}>{format(new Date(parseInt(item?.createdAt)), "dd-MM-yyyy")}</TableCell>
                    <TableCell align={"center"}>
                        <Box style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {/*<Avatar/> &nbsp;&nbsp;*/}
                            {item?.parentName}
                        </Box>
                    </TableCell>
                    <TableCell align={"center"}>
                        {item?.email}
                    </TableCell>
                    <TableCell align={"center"}>
                        {item?.phone}
                    </TableCell>
                    <TableCell align={"center"}>
                        {item?.kidName}
                    </TableCell>
                    <TableCell align={"center"}>
                        {item?.age}
                    </TableCell>
                    <TableCell align={"center"}>
                        {item?.grade}
                    </TableCell>
                    <TableCell align={"center"}>
                        {item?.scheduledClass ?
                            (item?.scheduledClass?.status === "not-completed" ?
                                    <Box>
                                        <a href={item?.scheduledClass?.link} target={"_blank"}
                                           className={classes.classStatus}
                                           style={{textDecoration: "none"}}>Class Link</a>
                                        <Typography className={classes.classFeedback}
                                                    style={{color: "grey"}}>{item?.scheduledClass?.status}</Typography>
                                    </Box> :

                                    <Box>
                                        <Typography className={classes.classStatus}
                                                    style={{color: item?.scheduledClass?.status?.toLowerCase() === "complete" ? "green" : "red"}}>{item?.scheduledClass?.status}</Typography>
                                        <Typography
                                            className={classes.classFeedback}>{item?.scheduledClass?.feedback}</Typography>
                                    </Box>
                            )
                            :
                            <Button variant={"text"} color={"primary"} onClick={() => setAddClass(true)}>Schedule
                                Demo</Button>
                        }
                    </TableCell>
                    <TableCell align={"center"}>
                        {item?.scheduledClass ? "" :
                            <Tooltip title={"Delete"}>
                                <IconButton onClick={() => {
                                    deleteClass({variables: {id: item?._id}})
                                        .then(r => {
                                            setDeleted(true);
                                            console.log(r)
                                        })
                                        .catch(e => {
                                            console.log(e)
                                        })
                                }}>
                                    {loading ? <CircularProgress size={15}/> : <CloseIcon style={{color: "red",fontSize:15}}/>}
                                </IconButton>
                            </Tooltip>
                        }
                    </TableCell>
                    {/*<TableCell align={"center"}>*/}
                    {/*    <Box style={{*/}
                    {/*        display: "flex",*/}
                    {/*        alignItems: "center",*/}
                    {/*        justifyContent: "center"*/}
                    {/*    }}>*/}
                    {/*        <AvatarGroup max={3}>*/}
                    {/*            <Avatar size={"small"}/>*/}
                    {/*            <Avatar size={"small"}/>*/}
                    {/*            <Avatar size={"small"}/>*/}
                    {/*        </AvatarGroup>*/}
                    {/*        &nbsp;&nbsp;*/}
                    {/*        <IconButton size={"small"}*/}
                    {/*                    onClick={() => setTeacher(true)}><AddIcon/></IconButton>*/}
                    {/*        <AddTeacher open={teacher} setOpen={setTeacher}/>*/}
                    {/*    </Box>*/}
                    {/*</TableCell>*/}
                    {addClass && <CreateClass open={addClass} setOpen={setAddClass} refetch={refetch} item={item}/>}
                </TableRow>
            }
        </>
    );
};
const AddCLASS = gql`
    mutation AddCLASS($course:ID!, $student:ID, $link:String, $title:String, $teacher:ID!, $scheduledAt:String, $demoClassId:ID){
        scheduleClass(classInput: {course: $course, createdFor: $student, teacher: $teacher, title:$title, link:$link, scheduledAt: $scheduledAt, classType: "demo"},demoClassId: $demoClassId){
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
    const [scheduleDate, setScheduleDate] = useState(format(new Date(), "yyyy-MM-dd'T'hh:mm"));
    const {data} = useQuery(COURSES);
    const [addClass, {loading, error}] = useMutation(AddCLASS);
    const [e, setE] = useState(false);
    const [message, setM] = useState("");
    const submitForm = (e) => {
        e.preventDefault();
        if (title?.length > 0 && course?.length > 0 && link?.length > 0 && urlRegex().test(link) && teacher?.length > 0) {
            addClass({
                variables: {
                    title,
                    course,
                    link,
                    teacher: teacher,
                    scheduledAt: scheduleDate,
                    demoClassId: item?._id
                }
            })
                .then(({data}) => {
                    console.log(data?.createClass);
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
            <DialogTitle id={"simple-dialog-title"}>Demo Class</DialogTitle>
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
                                disabled={loading}
                                type={"submit"}>
                            {loading ? <CircularProgress size={30} style={{color: "white"}}/> : "Create Class"}</Button>
                    </FormControl>
                </Box>
            </form>
        </Dialog>
    )
};
const AddTeacher = ({open, setOpen}) => {
    const classes = useStyles();
    let teachers = [1, 2, 3, 4, 5];
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Box className={classes.wrapper}>
                <FormControl>
                    <TextField label={"Search"} size={"small"} variant={"outlined"}/>
                </FormControl>
                <Typography variant={"h3"} className={classes.subTitle}>Results</Typography>
                <Box display={"flex"} flexWrap={"wrap"}>
                    {teachers.map((item, key) => {
                        return (
                            <Box display={"flex"} alignItems={"center"} m={1} className={classes.teacherListItem}>
                                <Avatar size={"small"}/> &nbsp;&nbsp;Rahul
                                <IconButton size={"small"} onClick={() => {
                                    setOpen(false)
                                }}><AddIcon/></IconButton>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Dialog>
    )
}

export default DemoClasses;
