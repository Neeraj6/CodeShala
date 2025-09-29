/*
 * @author Gaurav Kumar
 */

import React, {useContext, useState} from "react";
import {
    Box,
    Button,
    Container,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import Head from 'next/head';
import Header from "./Header";
import {makeStyles} from "@material-ui/core/styles";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import EditCourse from "./EditCourse";
import {gql, useMutation, useQuery} from "@apollo/client";
import NewCourse from "./NewCourse";
import {AuthContext} from "../context/auth";
import ErrorPage from "./ErrorPage";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: "6rem",
        paddingBottom: "6rem",
    },
    title: {
        fontFamily: "Raleway",
        fontSize: "2rem",
        fontWeight: 700,
        color: "rgba(0,0,0,0.5)",
        paddingLeft: 10,
    },
    table: {
        // backgroundColor: "rgba(56,182,255,0.09)",
        fontFamily: "Raleway"
    },
    boxContainer: {
        backgroundColor: "rgba(56,182,255,0.18)",
        borderRadius: 10,
        padding: "2rem",
        border: "2px solid rgba(56,182,255,0.09)"
    },
    tableHead: {
        fontFamily: "Raleway",
        fontWeight: 700,
        color: "rgba(0,0,0,0.5)"
    },
    tableCell: {
        fontFamily: "Raleway",
        color: "rgba(0,0,0,0.78)"
    },
    username: {
        fontFamily: "Raleway"
    },
    searchInput: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: "5px 10px"
    },
    editBtn: {
        backgroundColor: "#38B6FF",
        marginLeft: "auto",
        color: "white",
        "&:hover": {
            backgroundColor: "#38B6FF"
        }
    },
    addProject: {
        backgroundColor: "#38B6FF",
        marginLeft: "auto",
        color: "white",
        "&:hover": {
            backgroundColor: "#38B6FF"
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
        marginLeft: "auto",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    deleteBtn: {
        backgroundColor: "#F06C6C",
        color: "white",
        marginLeft: 10,
        "&:hover": {
            backgroundColor: "#F06C6C"
        }
    }
}));
const COURSES = gql`
    query courses{
        courses(page: 1,limit: 10){
            docs{
                _id
                cover
                slug
                createdAt
                description
                discountPrice
                modules{
                    _id
                    title
                    description
                    watchTime
                    lectures{
                        _id
                        watchTime
                        title
                        description
                    }
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
        }
    }
`;
const Courses = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [editCourse, setEditCourse] = useState(undefined);
    const [addCourse, setAddCourse] = useState(false);
    const {loading, error, data, refetch} = useQuery(COURSES);
    let {profile, isAuthenticated} = useContext(AuthContext);

    if (error) {
        return (
            <ErrorPage error={error} message={error?.message}/>
        )
    }
    return (
        <div>
            <Head>
                <title>Codeshala courses </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main>
                {isAuthenticated && profile?.role === "super_admin" ?
                    <Box className={classes.container}>
                        <Container>
                            <Box className={classes.boxContainer}>
                                <Box display={"flex"} alignItems={"center"} width={"100%"}>
                                    <Typography varaint={"h3"} className={classes.title}>Courses</Typography>
                                    {profile?.role === "super_admin" || profile?.role === "manager" ?
                                        <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"}
                                             ml={"auto"}>
                                            <IconButton onClick={() => setAddCourse(true)}
                                                        className={classes.addProjectMobile}>
                                                <AddIcon/>
                                            </IconButton>
                                            <Button startIcon={<AddIcon/>}
                                                    size={"small"}
                                                    className={classes.addProject}
                                                    onClick={() => {
                                                        setAddCourse(true);
                                                    }}
                                                    variant={"contained"}>Add Course</Button>
                                            {addCourse &&
                                            <NewCourse open={addCourse} setOpen={setAddCourse} refetch={refetch}/>
                                            }
                                        </Box>
                                        : ""}
                                </Box>
                                <TableContainer className={classes.table}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.tableHead}>NAME</TableCell>
                                                <TableCell className={classes.tableHead}>AMOUNT</TableCell>
                                                <TableCell className={classes.tableHead}>DISCOUNT PRICE</TableCell>
                                                <TableCell align="center"
                                                           className={classes.tableHead}>ACTIONS</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data?.courses?.docs?.map((item, key) => {
                                                return (
                                                    <Item item={item} key={key} setOpen={setOpen}
                                                          setEditCourse={setEditCourse}/>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {open ?
                                    <EditCourse open={open} setOpen={setOpen} course={editCourse}/>
                                    : ""}
                            </Box>
                        </Container>
                    </Box>
                    :
                    <ErrorPage error={error} message={"You are not authorized."}/>
                }
            </main>
        </div>
    );
};

const DELETECOURSE = gql`
    mutation DELETECOURSE($id:ID!){
        deleteCourse(courseId:$id){
            _id
            title
        }
    }
`;
const Item = ({setOpen, setEditCourse, item}) => {
    const {profile, setSuccess, setMessage, setError} = useContext(AuthContext);
    const classes = useStyles();
    const [deleteCourse,
        {
            data, loading, error
        }
    ] = useMutation(DELETECOURSE);
    const [deleted, setDeleted] = useState(false);
    return (
        <TableRow>
            {deleted ? "" :
                <>
                    <TableCell className={classes.tableCell}>{item?.title}</TableCell>
                    <TableCell className={classes.tableCell}>{item?.price}</TableCell>
                    <TableCell
                        className={classes.tableCell}>{item?.discountPrice}</TableCell>
                    <TableCell className={classes.tableCell}>
                        {profile?.role === "super_admin" || profile?.role === "manager" ?
                            <Box display={"flex"} justifyContent={"center"}
                                 alignItems={"center"}>
                                <Button startIcon={<CreateIcon/>}
                                        size={"small"}
                                        className={classes.editBtn}
                                        onClick={() => {
                                            setEditCourse(item);
                                            setOpen(true);
                                        }}
                                        variant={"contained"}>Edit</Button>
                                <Button startIcon={<DeleteIcon/>}
                                        size={"small"}
                                        disabled={loading}
                                        onClick={() => {
                                            deleteCourse({
                                                variables: {
                                                    id: item?._id
                                                }
                                            })
                                                .then(({data}) => {
                                                    console.log(data);
                                                    setSuccess(true);
                                                    setMessage(`${data?.deleteCourse?.title} deleted successfully.`)
                                                    setDeleted(true)
                                                })
                                                .catch(e => {
                                                    console.log(e);
                                                    setError(true);
                                                    setMessage(e?.message);
                                                })
                                        }}
                                        className={classes.deleteBtn}
                                        variant={"contained"}>Delete</Button>
                            </Box>
                            : ""}
                    </TableCell>
                </>}
        </TableRow>
    )
};

export default Courses;
