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
    Typography
} from "@material-ui/core";
import Head from 'next/head';
import Header from "../components/Header";
import {makeStyles} from "@material-ui/core/styles";
import {gql, useMutation, useQuery} from "@apollo/client";
import {format} from 'date-fns';
import TablePagination from "@material-ui/core/TablePagination";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {AuthContext} from "../context/auth";
import ErrorPage from "../components/ErrorPage";
import Loader from "../components/Loader";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import urlRegex from "url-regex";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
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
        marginBottom: 0
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
    textField: {
        margin: "5px 5px"
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
}));

const ORDERS = gql`
    query ORDERS($page:Int, $limit:Int, $startDate:String, $endDate:String, $kidName:String, $noOfClasses:Int, $parentName:String){
        orders(limit:$limit, orderBy:"-updatedAt", page:$page,startDate:$startDate, endDate:$endDate, kidName: $kidName, noOfClasses: $noOfClasses, parentName:$parentName){
            docs{
                _id
                transactionId
                orderId
                item{
                    _id
                    title
                }
                amount
                status
                classes
                updatedAt
                createdAt
                purchasedFor{
                    _id
                    profile{
                        _id
                        name
                        profilePic
                    }
                }
                purchasedBy{
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

const Orders = () => {
    const classes = useStyles();
    const [createOrder, setCreateOrder] = useState(false);
    const [kidName, setKidName] = useState(undefined);
    const [courseName, setCourseName] = useState("");
    const [parentName, setParentName] = useState("");
    const [noOfClasses, setNoOfClasses] = useState(undefined);
    const [status, setStatus] = useState("");
    const {profile} = useContext(AuthContext);
    const {loading, data, error, fetchMore, refetch} = useQuery(ORDERS, {
        variables: {
            limit: 10,
            page: 1
        }
    });
    const [startDate, setStartDate] = useState(format(new Date(2020, 0, 1), "yyyy-MM-dd"));
    const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
    if (error) {
        return <ErrorPage message={error?.message}/>
    }
    if (loading) {
        return <Loader/>
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
                                <Typography varaint={"h3"} className={classes.title}>Orders</Typography>
                                <Filters student={kidName} parentName={parentName}
                                         setStudent={setKidName}
                                         setParentName={setParentName}
                                         endDate={endDate} startDate={startDate} setEndDate={setEndDate}
                                         setStartDate={setStartDate}
                                         noOfClasses={noOfClasses} setNoOfClasses={setNoOfClasses}
                                         refetch={refetch}/>
                                {profile?.role === "manager" || profile?.role === "super_admin" ?
                                    <Box>
                                        {/*<Button className={classes.addProject} variant={"contained"}*/}
                                        {/*        startIcon={<AddIcon/>}*/}
                                        {/*        onClick={() => setCreateOrder(true)}/>*/}
                                        <IconButton onClick={() => setCreateOrder(true)}
                                                    >
                                            <AddIcon/>
                                        </IconButton>
                                        {createOrder &&
                                        <CreateOrder open={createOrder} setOpen={setCreateOrder} refetch={refetch}/>}
                                    </Box>
                                    : ""}
                            </Box>
                            <TableContainer className={classes.table}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHead}>ORDER ID</TableCell>
                                            <TableCell className={classes.tableHead}>DATE</TableCell>
                                            <TableCell className={classes.tableHead}>PARENT NAME</TableCell>
                                            <TableCell align="center" className={classes.tableHead}>STUDENT
                                                NAME</TableCell>
                                            <TableCell className={classes.tableHead}>PRODUCT NAME</TableCell>
                                            <TableCell className={classes.tableHead}>NO. OF CLASSES</TableCell>
                                            <TableCell className={classes.tableHead}>AMOUNT</TableCell>
                                            <TableCell className={classes.tableHead}>STATUS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.orders?.docs?.map((order, key) => {
                                            return (
                                                <TableRow key={key}>
                                                    <TableCell
                                                        className={classes.tableCell}>{order?.orderId}</TableCell>
                                                    <TableCell
                                                        className={classes.tableCell}>{format(new Date(parseInt(order?.updatedAt)), "dd-MM-yyyy H:m OOOO")}</TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Box display={"flex"} justifyContent={"center"}
                                                             flexDirection={"column"} alignItems={"center"}>
                                                            <Avatar
                                                                src={`${process.env.S3_URL}${order?.purchasedBy?.profile?.profilePic}`}/>
                                                            <Typography variant={"subtitle2"}
                                                                        className={classes.username}>{order?.purchasedBy?.profile?.name}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Box display={"flex"} justifyContent={"center"}
                                                             flexDirection={"column"} alignItems={"center"}>
                                                            <Avatar
                                                                src={`${process.env.S3_URL}${order?.purchasedFor?.profile?.profilePic}`}/>
                                                            <Typography variant={"subtitle2"}
                                                                        className={classes.username}>{order?.purchasedFor?.profile?.name}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell
                                                        className={classes.tableCell}>{order?.item?.title}</TableCell>
                                                    <TableCell
                                                        className={classes.tableCell}>{order?.classes}</TableCell>
                                                    <TableCell
                                                        className={classes.tableCell}>{order?.amount / 100}</TableCell>

                                                    <TableCell className={classes.tableCell}
                                                               style={{
                                                                   textTransform: "uppercase",
                                                                   color: order?.status === "paid" ? "green" : order?.status === "pending" ? "#ffc107" : "red"
                                                               }}>{order?.status}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                    <TablePagination
                                        count={data?.orders?.totalDocs}
                                        page={data?.orders?.page - 1}
                                        rowsPerPage={data?.orders?.docs?.length}
                                        onChangePage={(e, newPage) => {
                                            if ((data?.orders?.hasNextPage && (newPage + 1) > data?.orders?.page) || (data?.demoClasses?.hasPrevPage && (newPage + 1) < data?.demoClasses?.page)) {
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
                     setNoOfClasses,
                     noOfClasses,
                     parentName,
                     setParentName
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
                        {profile?.role === "super_admin" || profile?.role === "manager" ?
                            <>
                                <KidSelect student={student} setStudent={setStudent}/>
                                <ParentSelect parent={parentName} setParent={setParentName}/>
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
                        <TextField
                            label="No. of Classes"
                            type={"number"}
                            size={"small"}
                            variant={"outlined"}
                            value={noOfClasses}
                            style={{maxWidth: 140}}
                            onChange={e => setNoOfClasses(e.target.value)}
                            className={classes.textField}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} style={{marginLeft: 15}}
                            onClick={() => {
                                refetch({
                                    page: 1,
                                    startDate,
                                    endDate,
                                    kidName: student,
                                    parentName,
                                    noOfClasses: parseInt(noOfClasses?.toString())
                                });
                            }}>Apply Filter</Button>
                </DialogActions>
            </Dialog>
            <Box className={classes.filtersList} alignItems={"center"} ml={"auto"} flexWrap={"wrap"}>
                {profile?.role === "super_admin" || profile?.role === "manager" ?
                    <>
                        <KidSelect student={student} setStudent={setStudent}/>
                        <ParentSelect parent={parentName} setParent={setParentName}/>
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
                <TextField
                    label="No. of Classes"
                    type={"number"}
                    size={"small"}
                    variant={"outlined"}
                    value={noOfClasses}
                    style={{maxWidth: 140}}
                    onChange={e => setNoOfClasses(e.target.value)}
                    className={classes.textField}
                />
                <Button variant={"contained"} style={{marginLeft: 15}}
                        onClick={() => {
                            refetch({
                                page: 1,
                                startDate,
                                endDate,
                                kidName: student,
                                parentName,
                                noOfClasses: parseInt(noOfClasses?.toString())
                            });
                        }}>Apply Filter</Button>
            </Box>
        </Box>
    )
}

const SEARCH_USER = gql`
    query SEARCH_USER($name:String ,$role:String){
        searchUser(name: $name, limit:20, page:1, role:$role){
            docs{
                _id
                active
                profile{
                    _id
                    name
                    profilePic
                }
            }
            totalDocs
            page
        }
    }
`;

const KidSelect = ({student, setStudent}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([])
    const {loading, data, error, refetch} = useQuery(SEARCH_USER, {
        variables: {
            name: "",
            role: "kid"
        }
    });
    return (
        <FormControl variant={"outlined"} size={"small"}
                     className={classes.textField}>
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
                getOptionLabel={(option) => option?.profile?.name}
                options={data?.searchUser?.docs ? data?.searchUser?.docs : []}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Student"
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

const ParentSelect = ({parent, setParent}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([])
    const {loading, data, error, refetch} = useQuery(SEARCH_USER, {
        variables: {
            name: "",
            role: "parent"
        }
    });
    return (
        <FormControl variant={"outlined"} size={"small"}
                     className={classes.textField}>
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
                        setParent(v?._id)
                    } else {
                        setParent("");
                    }
                }}
                getOptionSelected={(option, value) => option?.profile?.name === value?.profile?.name}
                getOptionLabel={(option) => option?.profile?.name}
                options={data?.searchUser?.docs ? data?.searchUser?.docs : []}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Parent"
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

const TeacherSelect = ({teacher, setTeacher}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([])
    const {loading, data, error, refetch} = useQuery(SEARCH_USER, {
        variables: {
            name: "",
            role: "teacher"
        }
    });
    return (
        <FormControl variant={"outlined"} size={"small"}
                     className={classes.textField}>
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
                        setTeacher(v?._id)
                    } else {
                        setTeacher("");
                    }
                }}
                getOptionSelected={(option, value) => option?.profile?.name === value?.profile?.name}
                getOptionLabel={(option) => option?.profile?.name}
                options={data?.searchUser?.docs ? data?.searchUser?.docs : []}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Teacher"
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

const SEARCH_COURSE = gql`
    query SEARCH_COURSE($name:String){
        courses(search: $name, limit: 10, page: 1){
            docs{
                _id
                title
                description
                cover
                discountPrice
                price
            }
            hasNextPage
            hasPrevPage
            page
            prevPage
            nextPage
            totalDocs
            totalPages
        }
    }
`;

const CourseSelect = ({course, setCourse}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([])
    const {loading, data, error, refetch} = useQuery(SEARCH_COURSE, {
        variables: {
            name: "",
        }
    });
    return (
        <FormControl variant={"outlined"} size={"small"}
                     className={classes.textField}>
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
                        setCourse(v?._id)
                    } else {
                        setCourse("");
                    }
                }}
                getOptionSelected={(option, value) => option?.title === value?.title}
                getOptionLabel={(option) => option?.title}
                options={data?.courses?.docs ? data?.courses?.docs : []}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Course"
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

export {KidSelect, TeacherSelect, CourseSelect};
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
const CREATE_ORDER = gql`
    mutation CREATE_ORDER($order:OrderInput){
        createOrder(orderInput: $order){
            transactionId
            orderId
            item{
                _id
                title
            }
            amount
            status
            classes
            updatedAt
            createdAt
            purchasedFor{
                _id
                profile{
                    _id
                    name
                    profilePic
                }
            }
            purchasedBy{
                _id
                profile{
                    _id
                    name
                    profilePic
                }
            }
        }
    }
`;

const CreateOrder = ({open, setOpen, refetch}) => {
    const classes = useStyles();
    const {profile, isAuthenticated, setSuccess, setMessage} = useContext(AuthContext);
    const [course, setCourse] = useState("");
    const [parent, setParent] = useState("");
    const [student, setStudent] = useState("");
    const [amount, setAmount] = useState(0);
    const [gateway, setGateway] = useState("cash");
    const [method, setMethod] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [levels, setLevels] = useState(1);
    const {data} = useQuery(COURSES);
    const [createProduct, {loading, error}] = useMutation(CREATE_ORDER);
    const [e, setE] = useState(false);
    const [message, setM] = useState("");
    const submitForm = (e) => {
        e.preventDefault();
        if (course?.length > 0 && parent?.length > 0 && student?.length > 0 && parseInt(levels) > 0) {
            createProduct({
                variables: {
                    order: {
                        item: course,
                        purchasedFor: student,
                        purchasedBy: parent,
                        amount:parseFloat(amount),
                        gateway,
                        method,
                        transactionId,
                        classes: parseInt(levels)
                    }
                }
            })
                .then(({data}) => {
                    refetch({page: 1})
                    setSuccess(true);
                    setMessage("Order created successfully.")
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
            <DialogTitle id={"simple-dialog-title"}>Create New Order</DialogTitle>
            <form onSubmit={submitForm} method={"post"}>
                <Box display={"flex"} flexDirection={"column"} className={classes.addProjectWrapper}>
                    {(e || error) &&
                    <Collapse in={e || error}>
                        <Alert varaint={"filled"} severity={"error"}>{message}</Alert>
                    </Collapse>
                    }
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
                    <FormControl style={{marginBottom: "2rem"}}>
                        <TextField variant={"outlined"} label={"Classes"} size={"small"}  type={"number"} value={levels}
                                   onChange={e => setLevels(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}} variant={"outlined"} size={"small"}>
                        <ParentSelect parent={parent} setParent={setParent}/>
                    </FormControl>
                    <KidSelect student={student} setStudent={setStudent}/>
                    {/*<FormControl style={{marginBottom: "2rem", marginTop: "2rem"}}>*/}
                    {/*    <TextField variant={"outlined"} label={"Gateway"} size={"small"} value={gateway}*/}
                    {/*               onChange={e => setGateway(e.target.value)}/>*/}
                    {/*</FormControl>*/}
                    <FormControl style={{marginBottom: "2rem",  marginTop: "2rem"}}>
                        <TextField variant={"outlined"} label={"Mode of payment"} size={"small"} value={method}
                                   onChange={e => setMethod(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <TextField variant={"outlined"} label={"Amount"} type="number" size={"small"} value={amount}
                                   onChange={e => setAmount(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <TextField variant={"outlined"} label={"Transaction ID"} size={"small"} value={transactionId}
                                   onChange={e => setTransactionId(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <Button variant={"contained"} className={classes.createBtn} onClick={submitForm}
                                disabled={loading}
                                type={"submit"}>
                            {loading ? <CircularProgress size={30} style={{color: "white"}}/> : "Create Order"}</Button>
                    </FormControl>
                </Box>
            </form>
        </Dialog>
    )
};

export default Orders;
