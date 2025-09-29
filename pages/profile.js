/*
 * @author Gaurav Kumar
 */

import React, {useContext, useState} from "react";
import {
    Avatar,
    Badge,
    Box,
    Button,
    CircularProgress,
    Collapse,
    Container,
    Dialog,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    LinearProgress,
    List,
    ListItem,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Head from "next/head";
import Header from "../components/Header";
import EditAvatar from "../components/EditAvatar";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import WhatshotRoundedIcon from '@material-ui/icons/WhatshotRounded';
import {AuthContext} from "../context/auth";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import {gql, useMutation, useQuery} from "@apollo/client";
import {Alert} from '@material-ui/lab';
import {format} from "date-fns";
import urlRegex from "url-regex";
import Iframe from "react-iframe";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import CakeIcon from '@material-ui/icons/Cake';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import YouTubeIcon from '@material-ui/icons/YouTube';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: "6rem",
        paddingBottom: "4rem"
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
    coverImage: {
        backgroundImage: "url(/assets/pattern.svg)",
        backgroundSize: "cover",
        minHeight: "14rem",
        borderRadius: 10,
        backgroundColor: "grey"
    },
    userDetails: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        transform: "translateY(-45px)",
        padding: "0 3.5rem",
        marginBottom: "-2.2rem"
    },
    avatar: {
        borderRadius: "50%",
        border: "4px solid #0FBD8C",
        height: 90,
        width: 90
    },
    name: {
        fontFamily: "Raleway",
        fontSize: "2rem",
        color: "#585858",
        fontWeight: 600,
        textTransform: "capitalize"
    },
    primary: {
        fontFamily: "Raleway",
        fontSize: "1rem",
        color: "#868686",
        whiteSpace:"pre-line"
    },
    secondary: {
        fontFamily: "Raleway",
        fontSize: "0.85rem",
        color: "#9F9F9F",
        alignItems: "center",
        display: "flex",
        margin: "5px 0px"
    },
    title: {
        fontFamily: "Raleway",
        fontSize: "1.8rem",
        fontWeight: 800,
        color: "#7A7A7A",
        margin: "0.5rem 0rem"
    },
    courseItem: {
        backgroundColor: "#F6F6F6",
        padding: "1.5rem 1.5rem"
    },
    courseName: {
        fontFamily: "Raleway",
        color: "#7C7C7C",
        fontSize: "1.6rem",
        fontWeight: 600
    },
    courseDesc: {
        fontFamily: "Raleway",
        color: "#7C7C7C",
        fontSize: "1rem",
        fontWeight: 500
    },
    courseImage: {
        width: 90,
        height: 90,
        marginRight: 20
    },
    courseProgressText: {
        fontFamily: "Raleway",
        color: "rgba(123, 123, 123, 0.62)",
        fontSize: "0.8rem",
        fontWeight: 500
    },
    courseProgress: {
        backgroundColor: "#C4C4C4",
        borderRadius: 4,
        height: 7,
        "& .MuiLinearProgress-bar": {
            backgroundColor: "#0FBD8C"
        }
    },
    viewBtn: {
        backgroundColor: '#0FBD8C',
        color: "white",
        boxShadow: "0px 4px 4px rgba(15, 189, 140, 0.28)",
        borderRadius: 5,
        "&:hover": {
            backgroundColor: '#0FBD8C',
        }
    },
    skillItem: {
        backgroundColor: "#F6F6F6",
        padding: "1rem 2rem"
    },
    skillName: {
        fontFamily: "Raleway",
        color: "#7C7C7C",
        fontSize: "1.3rem",
        fontWeight: 500,
        marginRight: 20
    },
    input: {
        fontFamily: "Raleway",
        color: "#828282",
        fontSize: "1rem",
        border: "1px solid #0FBD8C",
        // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 10,
        minHeight: "2.5rem",
        width: 462,
        marginTop: "9px !important",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        backgroundColor: "white",
        "&:before": {
            position: "fixed"
        },
        "&:after": {
            position: "fixed"
        }
    },
    label: {
        fontFamily: "Raleway",
        color: "#686868",
        fontSize: "1rem"
    },
    editProfileWrapper: {
        padding: "0rem 4rem",
        [theme.breakpoints.down("sm")]: {
            padding: "0rem 2rem"
        }
    },
    socialLink: {
        textDecoration: "none",
        color: "grey",
        marginRight: 6,
        "&:hover": {
            color: "black"
        }
    },
    deleteBtn: {
        color: "white",
        backgroundColor: "#e03333",
        marginLeft: 10,
        "&:hover": {
            backgroundColor: "#e03333c7"
        }
    }
}));

const Profile = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [editAvatar, setEditAvatar] = useState(false);
    const {profile, isAuthenticated} = useContext(AuthContext);
    return (
        <Box>
            <Head>
                <title>Codeshala Profile </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main>
                <Box className={classes.container}>
                    <Container>
                        <Box className={classes.coverImage}/>
                        <Box className={classes.userDetails}>
                            <Box display={"flex"}>
                                <Badge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    badgeContent={
                                        <IconButton
                                            style={{width: 30, height: 30, backgroundColor: "#38b6ff", padding: "10px"}}>
                                            <AddAPhotoOutlinedIcon fontSize={"20px"}
                                                                   style={{color: "white", fontSize:17}}/>
                                        </IconButton>}
                                    onClick={() => setEditAvatar(true)}
                                >
                                    <Avatar src={`${process.env.S3_URL}${profile?.profile?.profilePic}`}
                                            variant={"circle"}
                                            className={classes.avatar}/>
                                </Badge>
                                <Box mt={"auto"} ml={2}>
                                    {profile?.profile?.linkedIn &&
                                    <a href={profile?.profile?.linkedIn} className={classes.socialLink}
                                       target={"_blank"}>
                                        <LinkedInIcon/>
                                    </a>
                                    }
                                    {profile?.profile?.insta &&
                                    <a href={`https://www.instagram.com/${profile?.profile?.insta}`}
                                       className={classes.socialLink} target={"_blank"}>
                                        <InstagramIcon/>
                                    </a>
                                    }
                                    {profile?.profile?.twitter &&
                                    <a href={`https://twitter.com/${profile?.profile?.twitter}`}
                                       className={classes.socialLink} target={"_blank"}>
                                        <TwitterIcon/>
                                    </a>
                                    }
                                    {profile?.profile?.fb &&
                                    <a href={`https://www.facebook.com/${profile?.profile?.fb}`}
                                       className={classes.socialLink} target={"_blank"}>
                                        <FacebookIcon/>
                                    </a>
                                    }
                                    {profile?.profile?.games &&
                                    <a href={profile?.profile?.games}
                                       className={classes.socialLink} target={"_blank"}>
                                        <SportsEsportsIcon/>
                                    </a>
                                    }
                                    {profile?.profile?.youtube &&
                                    <a href={profile?.profile?.youtube}
                                       className={classes.socialLink} target={"_blank"}>
                                        <YouTubeIcon/>
                                    </a>
                                    }
                                    {profile?.profile?.website &&
                                    <a href={profile?.profile?.website}
                                       className={classes.socialLink} target={"_blank"}>
                                        <LanguageIcon/>
                                    </a>
                                    }
                                    {profile?.profile?.apps &&
                                    <a href={profile?.profile?.apps}
                                       className={classes.socialLink} target={"_blank"}>
                                        <PhoneAndroidIcon/>
                                    </a>
                                    }

                                </Box>
                            </Box>
                            <Button onClick={() => setOpen(true)}>
                                <MoreHorizIcon/>
                            </Button>
                            {open && <EditProfile open={open} setOpen={setOpen}/>}
                            <EditAvatar open={editAvatar} setOpen={setEditAvatar}/>
                        </Box>
                        <Box style={{padding: "0 3.5rem"}}>
                            <Typography variant={"h3"}
                                        className={classes.name}>{profile?.profile?.name}</Typography>
                            <Typography variant={"body1"}
                                        className={classes.primary}>{profile?.profile?.bio}</Typography>
                            <Typography variant={"subtitle"}
                                        className={classes.secondary}>
                                <LocationOnIcon/>&nbsp;&nbsp;
                                {profile?.profile?.city}</Typography>
                            <Typography variant={"subtitle"}
                                        className={classes.secondary}>
                                <EmailIcon/>&nbsp;&nbsp;
                                {profile?.profile?.email}</Typography>
                            <Typography variant={"subtitle"}
                                        className={classes.secondary}>
                                <CakeIcon/>&nbsp;&nbsp;
                                {/*{format(new Date(parseInt(profile?.profile?.dob?.toString())), "dd-MM-yyyy")}*/}
                            </Typography>
                            <Typography variant={"subtitle"}
                                        className={classes.secondary}>
                                <PhoneIcon/> &nbsp;&nbsp;
                                {profile?.profile?.phone}</Typography>
                            {/*<Grid container spacing={2}>*/}
                            {/*    <Grid item xs={6} md={4}>*/}
                            {/*        <Typography variant={"subtitle"}*/}
                            {/*                    className={classes.secondary}>*/}
                            {/*            <LocationOnIcon/>*/}
                            {/*            {profile?.profile?.city}</Typography>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={6}>*/}
                            {/*        /!*<Typography variant={"h3"} className={classes.name}>Sam</Typography>*!/*/}
                            {/*        /!*<Typography variant={"body1"} className={classes.primary}*!/*/}
                            {/*        /!*            style={{marginTop: "2rem"}}>Love to*!/*/}
                            {/*        /!*    programming</Typography>*!/*/}
                            {/*        <Typography variant={"subtitle"}*/}
                            {/*                    className={classes.secondary}>{profile?.profile?.email}</Typography>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </Box>
                        {profile?.role === "kid" ?
                            <Grid container spacing={2} style={{marginTop: "3rem"}}>
                                <Grid item md={6} xs={12}>
                                    <Courses/>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Projects/>
                                </Grid>
                                {/*<Grid item md={4} xs={12}>*/}
                                {/*    <Skills/>*/}
                                {/*</Grid>*/}
                            </Grid>
                            : ""}
                    </Container>
                </Box>
            </main>
        </Box>
    );
};

const UPDATEPROFILE = gql`
    mutation($name:String, $profilePic:String, $email:String, $phone:String,$dob:String, $city:String,
        $insta:String, $fb:String, $twitter:String, $linkedIn:String, $games:String,
        $apps:String,
        $bio:String,
        $website:String,
        $youtube:String){
        updateProfile(updatedProfile:{
            name: $name,
            profilePic: $profilePic,
            email: $email,
            phone: $phone,
            city:$city,
            games:$games,
            apps:$apps,
            website:$website,
            youtube:$youtube,
            insta:$insta,
            fb:$fb,
            dob:$dob,
            bio: $bio
            linkedIn:$linkedIn,
            twitter:$twitter
        }){
            _id
            profile{
                _id
                name
                profilePic
                email
                phone
                dob
                gender
                grade
                school
                city
                skills
                insta
                linkedIn
                twitter
                fb
                games
                website
                apps
                youtube
                city
                bio
                projects{
                    _id
                    cover
                    createdAt
                    description
                    link
                    linkType
                    title
                    updatedAt
                }
            }
        }
    }
`;

const EditProfile = ({open, setOpen}) => {
    const classes = useStyles();
    const {profile, setProfile, setSuccess, setError, setMessage, code, list, setCode} = useContext(AuthContext);
    const [name, setName] = useState(profile?.profile?.name);
    const [email, setEmail] = useState(profile?.profile?.email);
    const [phone, setPhone] = useState(profile?.profile?.phone ? profile?.profile?.phone?.substr(profile?.profile?.phone?.indexOf('-') + 1) : "");
    const [dob, setDOB] = useState(format(profile?.profile?.dob ? new Date(parseInt(profile?.profile?.dob)) : new Date(), "yyyy-MM-dd"));
    const [address, setAddress] = useState(profile?.profile?.city);
    const [games, setGames] = useState(profile?.profile?.games ? profile?.profile?.games : "");
    const [apps, setApps] = useState(profile?.profile?.apps ? profile?.profile?.apps : "");
    const [youtube, setYoutube] = useState(profile?.profile?.youtube ? profile?.profile?.youtube : "");
    const [website, setWebsites] = useState(profile?.profile?.website ? profile?.profile?.website : "");
    const [updateProfile, {loading, error, data}] = useMutation(UPDATEPROFILE);
    const [e, setE] = useState(false);
    const [bio, setBio] = useState(profile?.profile?.bio);
    const [message, setM] = useState("");
    const submitForm = (e) => {
        e.preventDefault();
        if ((apps?.length === 0 || urlRegex().test(apps))
            && (website?.length === 0 || urlRegex().test(website))
            && (games?.length === 0 || urlRegex().test(games))
            && (youtube?.length === 0 || urlRegex().test(youtube))
            && (phone?.length === 0 || phone?.length === 10)) {
            updateProfile({
                variables: {
                    name,
                    email: profile?.profile?.email,
                    phone: `${code}-${phone}`,
                    city: address,
                    profilePic: profile?.profile?.profilePic,
                    games,
                    website,
                    dob,
                    bio,
                    apps,
                    youtube
                }
            })
                .then(({data}) => {
                    console.log(data);
                    setProfile(data?.updateProfile);
                    setSuccess(true);
                    setMessage("Profile Updated");
                    localStorage.setItem("user", JSON.stringify(data?.updateProfile));
                    setOpen(false);
                })
                .catch(e => {
                    console.log(e);
                    setE(true);
                    setM(e?.message);
                })
        } else {
            let m = "";
            if (name?.length <= 0) {
                m += "Name can't be empty. ";
            }
            if (!urlRegex().test(apps) && apps?.length > 0) {
                m += "Apps Url is not valid. ";
            }
            if (!urlRegex().test(website) && website?.length > 0) {
                m += "Website Url is not valid. ";
            }
            if (!urlRegex().test(games) && games?.length > 0) {
                m += "Games Url is not valid. ";
            }
            if (!urlRegex().test(youtube) && youtube?.length > 0) {
                m += "Youtube Url is not valid. ";
            }
            if (phone?.length !== 10) {
                m += "Phone is not valid. ";
            }
            setE(true);
            setM(m);
        }
        return false;
    }
    return (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title">
            {/*<DialogTitle id={"simple-dialog-title"}>Create New Project</DialogTitle>*/}
            <Box display={"flex"} flexDirection={"column"} className={classes.editProfileWrapper}>
                <form method={"post"} onSubmit={submitForm}>
                    <FormControl style={{marginBottom: "2rem", marginTop: "2rem"}}>
                        <FormLabel className={classes.label}>Name</FormLabel>
                        <Input className={classes.input} size={"small"} value={name}
                               onChange={e => setName(e.target.value)}/>
                    </FormControl>
                    {/*<FormControl style={{marginBottom: "2rem"}}>*/}
                    {/*    <FormLabel className={classes.label}>Bio</FormLabel>*/}
                    {/*    <Input className={classes.input} size={"small"} value={bio ? bio : profile?.profile?.bio}*/}
                    {/*           onChange={e => setBio(e.target.value)}/>*/}
                    {/*</FormControl>*/}
                    <FormControl style={{marginBottom: "2rem"}} variant={"outlined"} size={"small"}>
                        <FormLabel className={classes.label}>Phone</FormLabel>
                        <Input className={classes.input} size={"small"} type={"number"}
                               value={phone}
                               onKeyDown={e => {
                                   let invalidChars = ["-", "e", "+", "E"];
                                   if (invalidChars.includes(e?.key)) {
                                       e.preventDefault();
                                   }
                               }}
                               startAdornment={
                                   <InputAdornment position="start">
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
                                   </InputAdornment>
                               }
                               onChange={e => {
                                   if (!isNaN(e?.target?.value) && e?.target?.value?.length <= 10) {
                                       setPhone(e.target.value)
                                   }
                               }}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <FormLabel className={classes.label}>DOB</FormLabel>
                        <Input
                            id="date"
                            type="date"
                            size={"small"}
                            value={dob}
                            onChange={e => setDOB(e.target.value)}
                            className={classes.input}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <FormLabel className={classes.label}>City</FormLabel>
                        <Input className={classes.input} size={"small"}
                               value={address}
                            // multiline={true}
                            // rows={3}
                               onChange={e => setAddress(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <FormLabel className={classes.label}>About Me</FormLabel>
                        <Input className={classes.input} size={"small"} value={bio}
                               onChange={e => setBio(e.target.value)}
                               multiline={true}
                               rows={3}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <FormLabel className={classes.label}>My Games</FormLabel>
                        <Input className={classes.input} size={"small"} value={games}
                               onChange={e => setGames(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <FormLabel className={classes.label}>My Apps</FormLabel>
                        <Input className={classes.input} size={"small"}
                               value={apps}
                               onChange={e => setApps(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "2rem"}}>
                        <FormLabel className={classes.label}>My Website</FormLabel>
                        <Input className={classes.input} size={"small"} value={website}
                               onChange={e => setWebsites(e.target.value)}/>
                    </FormControl>
                    <FormControl style={{marginBottom: "1rem"}}>
                        <FormLabel className={classes.label}>Youtube</FormLabel>
                        <Input className={classes.input} size={"small"}
                               value={youtube}
                               onChange={e => setYoutube(e.target.value)}/>
                    </FormControl>
                    {(e || error) &&
                    <Collapse in={e || error}>
                        <Alert varaint={"filled"} severity={"error"}>{message}</Alert>
                    </Collapse>
                    }
                    <FormControl style={{marginBottom: "2rem", marginTop: "1rem"}}>
                        <Button variant={"contained"} className={classes.createBtn} onClick={submitForm} type={"submit"}
                                disabled={loading}>Edit
                            Profile</Button>
                    </FormControl>
                </form>
            </Box>
        </Dialog>
    )
}
const ORDERS = gql`
    query ORDERS($page:Int, $limit:Int){
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
const Courses = () => {
    const classes = useStyles();
    let courses = [1, 2, 3, 4];
    const {loading, data, error, fetchMore} = useQuery(ORDERS, {
        variables: {
            limit: 20,
            page: 1
        }
    });
    let {profile} = useContext(AuthContext);
    return (
        <Box style={{height: "100%"}}>
            <Typography variant={"h2"} className={classes.title}>Courses Done</Typography>
            <List style={{backgroundColor: "#F6F6F6", borderRadius: 10, height: "92%"}}>
                {data?.orders?.docs?.map(({item}, key) => {
                    return (
                        <ListItem className={classes.courseItem} key={key}>
                            <Avatar src={item?.cover ? `${process?.env?.S3_URL}${item?.cover}` : "/assets/pavan.png"}
                                    className={classes.courseImage}/>
                            <Box width={"100%"}>
                                <Typography variant={"h3"} className={classes.courseName}>{item?.title}</Typography>
                                {/*<Typography variant={"body1"}*/}
                                {/*            className={classes.courseDesc}>{item?.description}</Typography>*/}
                                <Box style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                                    <Typography variant={"subtitle1"} className={classes.courseProgressText}>300
                                        EXP</Typography>
                                    <Typography variant={"subtitle1"}
                                                className={classes.courseProgressText}>79/100</Typography>
                                </Box>
                                <LinearProgress variant={"determinate"} className={classes.courseProgress}
                                                value={40}/>
                            </Box>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    )
};

const PROJECTS = gql`
    query PROJECTS {
        projects {
            docs {
                _id
                cover
                createdAt
                description
                link
                linkType
                title
                updatedAt
            }
        }
    }
`;

const Projects = () => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(PROJECTS);
    return (
        <Box style={{height: "100%"}}>
            <Typography variant={"h2"} className={classes.title}>Projects</Typography>
            <List style={{backgroundColor: "#F6F6F6", borderRadius: 10, height: "92%"}}>
                {loading ? <CircularProgress size={30}/>
                    : error ? <Box>
                            <Typography variant={"h4"}>Something went wrong.</Typography>
                        </Box>
                        :
                        data?.projects?.docs?.map((project, key) => {
                            return (
                                <Project project={project} key={key}/>
                            );
                        })}
            </List>
        </Box>
    )
};

const Games = ({data, loading, error}) => {
    const classes = useStyles();
    return (
        <Box style={{height: "100%"}}>
            <Typography variant={"h2"} className={classes.title}>Games</Typography>
            <List style={{backgroundColor: "#F6F6F6", borderRadius: 10, height: "92%"}}>
                {loading ? <CircularProgress size={30}/>
                    : error ? <Box>
                            <Typography variant={"h4"}>Something went wrong.</Typography>
                        </Box>
                        :
                        data?.projects?.docs?.map((project, key) => {
                            return (
                                <Project project={project} key={key}/>
                            );
                        })}
            </List>
        </Box>
    )
};

const Apps = ({data, loading, error}) => {
    const classes = useStyles();
    return (
        <Box style={{height: "100%"}}>
            <Typography variant={"h2"} className={classes.title}>Apps</Typography>
            <List style={{backgroundColor: "#F6F6F6", borderRadius: 10, height: "92%"}}>
                {loading ? <CircularProgress size={30}/>
                    : error ? <Box>
                            <Typography variant={"h4"}>Something went wrong.</Typography>
                        </Box>
                        :
                        data?.projects?.docs?.map((project, key) => {
                            return (
                                <Project project={project} key={key}/>
                            );
                        })}
            </List>
        </Box>
    )
};

const DELETEPROJECT = gql`
    mutation DELETEPROJECT($projectId:ID!){
        deleteProject(projectId: $projectId)
    }
`;

const Project = ({project}) => {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [deleteProject, {data, loading, error}] = useMutation(DELETEPROJECT);
    const {setSuccess, setMessage, setError} = useContext(AuthContext);
    if (deleted) {
        return <></>
    } else {
        return (
            <ListItem className={classes.courseItem}>
                <Avatar
                    src={project?.cover ? `${process.env.S3_URL}${project?.cover}` : "/assets/pavan.png"}
                    className={classes.courseImage}/>
                <Box>
                    <Typography variant={"h3"}
                                className={classes.courseName}>{project?.title}</Typography>
                    <Typography variant={"body1"}
                                className={classes.courseDesc}>{project?.description}</Typography>
                    <Box mt={2}>
                        {project?.linkType?.toLowerCase() === "link" &&
                        <a href={project?.link} target={"_blank"} style={{textDecoration: "none"}}>
                            <Button variant={"contained"} className={classes.editProject}>View</Button>
                        </a>
                        }
                        {project?.linkType?.toLowerCase() === "embed" &&
                        <Button variant={"contained"} className={classes.editProject}
                                onClick={() => setModal(true)}>View</Button>}
                        <EmbedLink open={modal} setOpen={setModal} project={project}/>
                        <Button variant={"contained"} className={classes.deleteBtn}
                                disabled={loading}
                                onClick={() => {
                                    deleteProject({variables: {projectId: project?._id}})
                                        .then(r => {
                                            console.log(r)
                                            setSuccess(true);
                                            setMessage("Project deleted")
                                            setDeleted(true);
                                        })
                                        .catch(e => {
                                            setError(true);
                                            setMessage(e?.message);
                                            console.log(e);
                                        })
                                }}>Delete</Button>
                    </Box>
                </Box>
            </ListItem>
        )
    }
}

const EmbedLink = ({open, project, setOpen}) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title">
            <Iframe url={project?.link}
                    width="450px"
                    height="450px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>
        </Dialog>
    );
}

const Skills = () => {
    const classes = useStyles();
    let courses = [1, 2, 3, 4];
    let {profile} = useContext(AuthContext);
    return (
        <Box style={{height: "100%"}}>
            <Typography variant={"h2"} className={classes.title}>Skills</Typography>
            <List style={{backgroundColor: "#F6F6F6", borderRadius: 10, height: "92%"}}>
                {profile?.skills?.map((course, key) => {
                    return (
                        <ListItem className={classes.skillItem} key={key}>
                            <Typography variant={"h3"} className={classes.skillName}>Python
                                automation</Typography>
                            <Button variant={"contained"} startIcon={<WhatshotRoundedIcon style={{color: "#FFE8A5"}}/>}
                                    className={classes.viewBtn}>
                                70/100
                            </Button>

                        </ListItem>
                    );
                })}
            </List>
        </Box>
    )
};

export default Profile;
