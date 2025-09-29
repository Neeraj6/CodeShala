/*
 * @author Gaurav Kumar
 */

import React, {useContext, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
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
import Head from 'next/head';
import Header from "../components/Header";
import {makeStyles} from "@material-ui/core/styles";
import {gql, useMutation, useQuery} from "@apollo/client";
import {useRouter} from 'next/router';
import {format} from 'date-fns';
import TablePagination from "@material-ui/core/TablePagination";
import Link from 'next/link';
import {StudentSelect} from "./classes";
import ErrorPage from "../components/ErrorPage";
import Loader from "../components/Loader";
import {AuthContext} from "../context/auth";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    addProject: {
        margin: "0rem 0rem 0rem 5px",
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
            marginLeft:5
        }
    },
    addProjectMobile:{
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
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
        marginBottom: 0,
        textTransform: "capitalize"
    },
    table: {
        // backgroundColor: "#D96D6D",
        fontFamily: "Raleway"
    },
    boxContainer: {
        backgroundColor: "rgba(217,109,109,0.18)",
        borderRadius: 10,
        padding: "2rem",
        border: "2px solid rgba(217,109,109,0.9)"
    },
    tableHead: {
        fontFamily: "Raleway",
        fontWeight: 700,
        textAlign: "center",
        color: "rgba(0,0,0,0.5)"
    },
    tableCell: {
        fontFamily: "Raleway",
        color: "rgba(0,0,0,0.78)",
        textAlign: "center"
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
        color: "white",
        "&:hover": {
            backgroundColor: "#38B6FF"
        }
    },
    textField: {
        margin: "5px 5px",
        maxWidth: 150
    },
    filterWrapper: {
        marginRight: "40px",
        [theme?.breakpoints?.down("sm")]: {
            marginRight: 0,
            "& > button": {
                display: "block"
            }
        },
        [theme?.breakpoints?.up("sm")]: {
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

const USERS = gql`
    query USERS($page:Int, $limit:Int, $role:String, $name:String, $startDate:String, $endDate:String){
        users(limit:$limit, orderBy:"-updatedAt", page:$page, role:$role, name: $name, startDate: $startDate, endDate: $endDate){
            docs{
                _id
                profile{
                    _id
                    name
                    email
                    phone
                    profilePic
                    status
                }
                role
                enabled
                createdAt
            }
            totalPages
            prevPage
            nextPage
            totalDocs
            hasNextPage
            hasPrevPage
            page
        }
    }
`;

const UPDATEUSER = gql`
    mutation UPDATEUSER($userId:ID!, $enabled:Boolean){
        updateUser(userId: $userId, enabled:$enabled){
            _id
            profile{
                _id
                name
                email
                phone
                profilePic
                status
            }
            role
            enabled
            createdAt
        }
    }
`;

const Users = () => {
    const classes = useStyles();
    const [student, setStudent] = useState(undefined);
    const [startDate, setStartDate] = useState(format(new Date(2020, 0, 1), "yyyy-MM-dd"));
    const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const router = useRouter();
    const {loading, data, error, fetchMore, refetch} = useQuery(USERS, {
        variables: {
            limit: 10,
            page: 1,
            role: router?.query?.role ? router?.query?.role : ""
        }
    });
    const [updateUser] = useMutation(UPDATEUSER);
    const {profile} = useContext(AuthContext);
    if (error) {
        return <ErrorPage message={error?.message}/>
    }
    if (loading) {
        return <Loader/>
    }
    const titles = {
        kid: "Student",
        parent: "Parent",
        teacher: "Teacher",
        manager: "Manager",
        super_admin: "Admin"
    }
    return (
        <div>
            <Head>
                <title>Codeshala Orders </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main>
                <Box className={classes.container}>
                    <Container>
                        <Box className={classes.boxContainer}>
                            <Box display={"flex"} alignItems={"center"} mb={1}>
                                <Typography varaint={"h3"}
                                            className={classes.title}>{router?.query?.role ? `${titles[router?.query?.role]}s` : "Users"}</Typography>
                                <Filters student={student}
                                         setStudent={setStudent}
                                         endDate={endDate} startDate={startDate} setEndDate={setEndDate}
                                         setStartDate={setStartDate}
                                         refetch={refetch}/>
                                {(profile?.role === "manager" || profile?.role === "super_admin") && (router?.query?.role === "teacher")  ?
                                    <Link href={"/teachers-register"}>
                                        <a style={{textDecoration: "none"}}>
                                            <Button className={classes.addProject} variant={"contained"}
                                                    startIcon={<AddIcon/>}>Add Teacher</Button>
                                            <IconButton
                                                className={classes.addProjectMobile}>
                                                <AddIcon/>
                                            </IconButton>
                                        </a>
                                    </Link>
                                    : ""}
                                {/*<Box ml={"auto"}>*/}
                                {/*    {(profile?.role === "manager" || profile?.role === "super_admin") && (router?.query?.role === "teacher") &&*/}
                                {/*    <Link href={"/teachers-register"}>*/}
                                {/*        <a style={{textDecoration: "none"}}>*/}
                                {/*            <Button startIcon={<CreateIcon/>}*/}
                                {/*                    className={classes.editBtn}*/}
                                {/*                    size={"small"}>Add New Teacher</Button>*/}
                                {/*        </a>*/}
                                {/*    </Link>*/}
                                {/*    }*/}
                                {/*</Box>*/}
                            </Box>
                            <TableContainer className={classes.table}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHead}>USER ID</TableCell>
                                            <TableCell className={classes.tableHead}>NAME</TableCell>
                                            <TableCell className={classes.tableHead}>EMAIL ID</TableCell>
                                            <TableCell className={classes.tableHead}>PHONE</TableCell>
                                            {/*<TableCell className={classes.tableHead}>ROLE</TableCell>*/}
                                            <TableCell align="center" className={classes.tableHead}>JOINING
                                                DATE</TableCell>
                                            <TableCell className={classes.tableHead}>STATUS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.users?.docs?.map((user, key) => {
                                            return (
                                                <TableRow key={key}>
                                                    <TableCell className={classes.tableCell}>{user?._id}</TableCell>
                                                    <TableCell
                                                        className={classes.tableCell}>
                                                        <Box display={"flex"} justifyContent={"center"}
                                                             flexDirection={"column"} alignItems={"center"}>
                                                            <Avatar src={user?.profile?.profilePic}/>
                                                            <Typography variant={"subtitle2"}
                                                                        className={classes.username}>{user?.profile?.name}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell
                                                        className={classes.tableCell}>{user?.profile?.email}</TableCell>
                                                    <TableCell
                                                        className={classes.tableCell}>{user?.profile?.phone}</TableCell>
                                                    {/*<TableCell*/}
                                                    {/*    className={classes.tableCell}>{user?.role}</TableCell>*/}
                                                    <TableCell
                                                        className={classes.tableCell}>{format(new Date(parseInt(user?.createdAt)), "dd-MM-yyyy")}</TableCell>
                                                    {/*<TableCell className={classes.tableCell}*/}
                                                    {/*           style={{textTransform: "uppercase"}}>{user?.status}</TableCell>*/}
                                                    <TableCell
                                                        align={"center"}
                                                        className={classes.tableCell}>
                                                        <Box display={"flex"} flexDirection={"column"}>
                                                            <Tooltip
                                                                title={user?.enabled ? `Disable ${user?.profile?.name}` : `Enable ${user?.profile?.name}`}
                                                                aria-label={user?.enabled ? `Disable ${user?.profile?.name}` : `Enable ${user?.profile?.name}`}>
                                                                <Button variant={"text"} onClick={() => {
                                                                    updateUser({
                                                                        variables: {
                                                                            userId: user?._id,
                                                                            enabled: !user?.enabled
                                                                        }
                                                                    })
                                                                        .then(r => {
                                                                            console.log(r);
                                                                            refetch({
                                                                                page: 1,
                                                                                name: student,
                                                                                startDate,
                                                                                endDate
                                                                            });
                                                                        })
                                                                        .catch(console.log)
                                                                }}
                                                                        style={{color: user?.enabled ? "red" : "green"}}>{user?.enabled ? "Disable" : "Enable"}</Button>
                                                            </Tooltip>
                                                            <Typography
                                                                variant={"caption"}
                                                                align={"center"}>{!user?.enabled ? "Disabled" : "Enabled"}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                    <TablePagination
                                        count={data?.users?.totalDocs}
                                        page={data?.users?.page - 1}
                                        rowsPerPage={data?.users?.docs?.length}
                                        onChangePage={(e, newPage) => {
                                            if ((data?.users?.hasNextPage && (newPage + 1) > data?.users?.page) || (data?.users?.hasPrevPage && (newPage + 1) < data?.users?.page)) {
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
                                                variables: {page: data?.users?.page, limit: e.target.value},
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
                        </Box>
                    </Container>
                </Box>
            </main>
        </div>
    );
};

const Filters = ({
                     student,
                     setStudent,
                     startDate,
                     setStartDate,
                     endDate,
                     setEndDate,
                     refetch,
                 }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    let {profile} = useContext(AuthContext);
    const titles = {
        kid: "Student",
        parent: "Parent",
        teacher: "Teacher",
        manager: "Manager",
        super_admin: "Admin"
    }
    const router = useRouter();
    return (
        <Box alignItems={"center"} display={"flex"} ml={"auto"} flexWrap={"wrap"} className={classes.filterWrapper}>
            <IconButton onClick={() => setOpen(true)}>
                <FilterListIcon/>
            </IconButton>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Filters</DialogTitle>
                <DialogContent dividers>
                    <Box>
                        {profile?.role === "super_admin" || profile?.role === "manager" ?
                            <>
                                <StudentSelect student={student} setStudent={setStudent}
                                               role={router?.query?.role ? router?.query?.role : ""}
                                               title={router?.query?.role ? `${titles[router?.query?.role]}` : "User"}/>
                            </>
                            : ""}
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
                                    page: 1, name: student, startDate, endDate
                                })
                                    .then(() => {
                                        setOpen(false)
                                    })
                                    .catch(e => {
                                        setOpen(false)
                                    })
                            }}>Apply Filter</Button>
                </DialogActions>
            </Dialog>
            <Box className={classes.filtersList} alignItems={"center"} ml={"auto"} flexWrap={"wrap"}>
                {profile?.role === "super_admin" || profile?.role === "manager" ?
                    <>
                        <StudentSelect student={student} setStudent={setStudent}
                                       role={router?.query?.role ? router?.query?.role : ""}
                                       title={router?.query?.role ? `${titles[router?.query?.role]}` : "User"}/>
                    </>
                    : ""}
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
                                page: 1, name: student, startDate, endDate
                            });
                        }}>Apply Filter</Button>
            </Box>
        </Box>
    )
}

export default Users;
