/*
 * @author Gaurav Kumar
 */

import React, {useContext, useEffect, useState} from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    ClickAwayListener,
    Container,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    SwipeableDrawer,
    Toolbar,
    Typography
} from "@material-ui/core";
import Link from 'next/link';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import {makeStyles} from "@material-ui/core/styles";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {AuthContext} from "../context/auth";
import RequestDemoClass from "./RequestDemoClass";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles(theme => ({
    header: {
        boxShadow: "none",
        display: "flex",
        backgroundColor: "transparent",
        transition: "background-color 0.4s ease"
    },
    logoWrapper: {
        height: 20
    },
    logo: {
        width: 30
    },
    navItem: {
        textTransform: "uppercase",
        color: "#000000",
        fontSize: 17,
        fontWeight: 500,
        textDecoration: "none",
        margin: 10,
        fontFamily: "Raleway"
    },
    navItemBtn: {
        color: "white",
        boxShadow: "0px 20px 20px #656D7441",
        textTransform: "uppercase",
        fontSize: 16,
        fontWeight: 500,
        textDecoration: "none",
        margin: 10,
        borderRadius: 10,
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        fontFamily: "Montserrat, Poppins, Raleway, sans-serif"
    },
    rightNav: {
        alignItems: "center",
        [theme.breakpoints.down('md')]: {
            display: "none",
        },
        [theme.breakpoints.up('lg')]: {
            display: "flex",
        }
    },
    rightNavBtn: {
        marginLeft: "auto",
        borderRadius: "50%",
        height: "4rem",
        width: "4rem",
        backgroundColor: "#f9fbf5",
        [theme.breakpoints.down('md')]: {
            display: "flex",
        },
        [theme.breakpoints.up('lg')]: {
            display: "none",
        },
    },
    drawerLinkWrapper: {
        width: "100%",
        padding: "0.6rem 3rem"
    },
    drawerLinkText: {
        textTransform: "uppercase",
        color: "#000000",
        fontSize: "1.5em",
        fontWeight: 300,
        textDecoration: "none",
    },
    avatarMenu: {
        position: "relative",
        border: "2px solid #0FBD8C",
        borderRadius: "50%",
        width: 50,
        height: 50,
        boxShadow: "0px 3px 8px #656D7441"
    },
    avatarMenuList: {
        paddingTop: 16,
        "&:before": {
            position: "absolute",
            top: 10,
            width: 20,
            height: 20,
            transform: "rotate(45deg)",
            left: "50%",
            content: '""',
            backgroundColor: "white",
            borderRadius: 5,
        }
    },
    menuItem: {
        fontFamily: "Raleway",
        alignItems: 'center',
        textDecoration: "none",
        color: "rgba(0, 0, 0, 0.65)"
    }
}));

const Header = () => {
    const classes = useStyles();
    const [drawerOpened, setDrawer] = useState(false);
    const [menu, setMenu] = useState(null);
    const [demoClass, setDemoClass] = useState(false);
    const {isAuthenticated, profile, logout} = useContext(AuthContext);
    const toggleMenu = (e) => {
        setMenu(e.currentTarget)
        // setMenu(prev => Boolean(prev) ? null : e.currentTarget)
    }
    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            let nav = document.getElementById("nav-bar");
            if (nav !== null) {
                let scrollY = window.scrollY;
                if (scrollY > 10 && nav) {
                    nav.style["background-color"] = "white";
                } else if (nav) {
                    nav.style["background-color"] = "transparent";
                }
            }
        });
    })
    return (
        <AppBar position="fixed" className={classes.header} id={"nav-bar"}>
            <Toolbar variant={"dense"} disableGutters={true}>
                <Container>
                    <Box style={{display: "flex", alignItems: "center", height: "6rem", width: "100%"}}>
                        <Box className={classes.navItem}>
                            <Link href={"/"}>
                                <a style={{textDecoration: "none"}}>
                                    <Typography variant={"p"} style={{fontWeight: 600, fontSize: 36, color: "black"}}>
                                        <Typography variant={"p"} style={{color: "#0FBD8C"}}>C</Typography>
                                        ODE
                                        <Typography variant={"p"} style={{color: "#0FBD8C"}}>S</Typography>
                                        HALA
                                    </Typography>
                                </a>
                            </Link>
                        </Box>
                        <Box style={{marginLeft: "auto"}} className={classes.rightNav}>
                            {/*{isAuthenticated ?*/}
                            {/*    <Link href="/dashboard">*/}
                            {/*        <a className={classes.navItem}>*/}
                            {/*            Dashboard*/}
                            {/*        </a>*/}
                            {/*    </Link>*/}
                            {/*    : ""}*/}
                            <Link href={"/"}>
                                <a className={classes.navItem}>
                                    Home
                                </a>
                            </Link>
                            <Link href={"/about"}>
                                <a className={classes.navItem}>
                                    About
                                </a>
                            </Link>
                            <Link href={"/courses"}>
                                <a className={classes.navItem}>
                                    Courses
                                </a>
                            </Link>
                            <Link href={"/contact"}>
                                <a className={classes.navItem}>
                                    Contact Us
                                </a>
                            </Link>
                            <Button className={classes.navItemBtn} style={{backgroundColor: "#0FBD8C"}}
                                    onClick={() => setDemoClass(true)}>
                                Book A Free Class
                            </Button>
                            {isAuthenticated ?
                                <Box className={classes.avatarMenu} style={{border: "none"}}>
                                    <Avatar alt={profile?.name}
                                            src={`${process.env.S3_URL}${profile?.profile?.profilePic}`}
                                            onClick={toggleMenu}
                                            variant={"circle"}
                                            className={classes.avatarMenu}/>
                                    <Popper open={Boolean(menu)}
                                            anchorEl={menu}
                                            role={undefined} transition
                                            disablePortal
                                            className={classes.avatarMenuList}>
                                        {({TransitionProps, placement}) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={() => setMenu(null)}>
                                                        <MenuList autoFocusItem={Boolean(menu)} id="menu-list-grow">
                                                            <Link href={"/dashboard"}>
                                                                <a className={classes.menuItem}>
                                                                    <MenuItem onClick={() => setMenu(null)}>
                                                                        <HomeOutlinedIcon
                                                                            style={{marginRight: 20}}/>
                                                                        Dashboard
                                                                    </MenuItem>
                                                                </a>
                                                            </Link>
                                                            <Link href={`/profile/${profile?._id}`}>
                                                                <a className={classes.menuItem}>
                                                                    <MenuItem onClick={() => setMenu(null)}>
                                                                        <PersonOutlineOutlinedIcon
                                                                            style={{marginRight: 20}}/>My
                                                                        Profile</MenuItem>
                                                                </a>
                                                            </Link>
                                                            <Link href={"/classes"}>
                                                                <a className={classes.menuItem}>
                                                                    <MenuItem onClick={() => setMenu(null)}>
                                                                        <VideocamOutlinedIcon
                                                                            style={{marginRight: 20}}/> Classes</MenuItem>
                                                                </a>
                                                            </Link>
                                                            {profile?.role !== "kid" ?
                                                                <>
                                                                    {profile?.role !== "teacher" ?
                                                                        <Link href={"/orders"}>
                                                                            <a className={classes.menuItem}>
                                                                                <MenuItem onClick={() => setMenu(null)}>
                                                                                    <ShoppingCartIcon
                                                                                        style={{marginRight: 20}}/> Orders</MenuItem>
                                                                            </a>
                                                                        </Link>
                                                                        : ""}
                                                                    {profile?.role === "super_admin" || profile?.role === "manager" ?
                                                                        <Link href={"/demo-classes"}>
                                                                            <a className={classes.menuItem}>
                                                                                <MenuItem onClick={() => setMenu(null)}>
                                                                                    <VideocamOutlinedIcon
                                                                                        style={{marginRight: 20}}/> Demo
                                                                                    Classes</MenuItem>
                                                                            </a>
                                                                        </Link>
                                                                        : ""}
                                                                </>
                                                                : ""}
                                                            {/*<Link href={"/logout"}>*/}
                                                            <Box className={classes.menuItem}>
                                                                <MenuItem onClick={() => {
                                                                    logout();
                                                                    setMenu(null)
                                                                }}>
                                                                    <ExitToAppOutlinedIcon
                                                                        style={{marginRight: 20}}/> Logout</MenuItem>
                                                            </Box>
                                                            {/*</Link>*/}
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </Box>
                                :
                                <Link href={"/login"}>
                                    <Button className={classes.navItemBtn} style={{backgroundColor: "#38B6FF"}}>
                                        <a className={classes.navItem} style={{color: "white", margin: "0 1rem"}}>
                                            Login
                                        </a>
                                    </Button>
                                </Link>
                            }
                        </Box>
                        <Button className={classes.rightNavBtn} onClick={() => setDrawer(true)}>
                            <MenuOpenIcon style={{fontSize: "3em"}}/>
                        </Button>
                    </Box>
                </Container>
                <SwipeableDrawer
                    anchor={"right"}
                    open={drawerOpened} onClose={() => setDrawer(false)} onOpen={() => setDrawer(true)}>
                    <Box style={{width: "16rem", paddingTop: "2rem"}}>
                        <Button className={classes.drawerLinkWrapper}>
                            <Link href={"/"}>
                                <a className={classes.drawerLinkText}>Home</a>
                            </Link>
                        </Button>
                        {isAuthenticated &&
                        <Button className={classes.drawerLinkWrapper}>
                            <Link href={"/dashboard"}>
                                <a className={classes.drawerLinkText}>Dashboard</a>
                            </Link>
                        </Button>
                        }
                        {isAuthenticated &&
                        <Button className={classes.drawerLinkWrapper}>
                            <Link href={`/profile/${profile?._id}`}>
                                <a className={classes.drawerLinkText}>My profile</a>
                            </Link>
                        </Button>
                        }
                        {isAuthenticated &&
                        <Button className={classes.drawerLinkWrapper}>
                            <Link href={"/classes"}>
                                <a className={classes.drawerLinkText}>Classes</a>
                            </Link>
                        </Button>
                        }
                        {isAuthenticated && (profile?.role === "parent" || profile?.role === "super_admin" || profile?.role === "manager") &&
                        <Button className={classes.drawerLinkWrapper}>
                            <Link href={"/orders"}>
                                <a className={classes.drawerLinkText}>Orders</a>
                            </Link>
                        </Button>
                        }
                        {isAuthenticated && (profile?.role === "super_admin" || profile?.role === "manager") &&
                        <Button className={classes.drawerLinkWrapper}>
                            <Link href={"/demo-classes"}>
                                <a className={classes.drawerLinkText}>Demo Classes</a>
                            </Link>
                        </Button>
                        }
                        <Button className={classes.drawerLinkWrapper}>
                            <Link href={"/about"}>
                                <a className={classes.drawerLinkText}>About</a>
                            </Link>
                        </Button>
                        <Button className={classes.drawerLinkWrapper}>
                            <Link href={"/courses"}>
                                <a className={classes.drawerLinkText}>Courses</a>
                            </Link>
                        </Button>
                        <Button className={classes.drawerLinkWrapper}>
                            <Link href={"/contact"}>
                                <a className={classes.drawerLinkText}>Contact Us</a>
                            </Link>
                        </Button>
                        <Box style={{display: "flex", justifyContent: "center"}}>
                            {isAuthenticated ?
                                ""
                                :
                                <>
                                    <Button className={classes.navItemBtn}
                                            style={{backgroundColor: "#0FBD8C", width: "80%"}}
                                            onClick={() => setDemoClass(true)}>
                                        Book A Free Class
                                    </Button>
                                </>
                            }
                        </Box>
                        <Box style={{display: "flex", justifyContent: "center"}}>
                            {isAuthenticated ?
                                <Button className={classes.navItemBtn}
                                        onClick={() => {
                                            logout();
                                            setMenu(null);
                                        }}
                                        style={{backgroundColor: "#38B6FF", width: "50%"}}>
                                    Logout
                                </Button>
                                :
                                <Button className={classes.navItemBtn}
                                        style={{backgroundColor: "#38B6FF", width: "50%"}}>
                                    <Link href={"/login/"}>
                                        <a style={{color:"white", textDecoration:"none"}}>Login</a>
                                    </Link>
                                </Button>
                            }
                        </Box>
                    </Box>
                </SwipeableDrawer>
                {demoClass && <RequestDemoClass open={demoClass} setOpen={setDemoClass}/>}
            </Toolbar>
        </AppBar>
    )
};
export default Header;
