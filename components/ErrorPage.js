import React, {useEffect} from "react";
import {Box, Typography} from "@material-ui/core";
import Link from "next/link";
import {useRouter} from "next/router";

const ErrorPage = ({message})=>{
    const router = useRouter();
    useEffect(()=>{
        let timeout = setTimeout(()=>{
            router.push("/login");
        },1000);
        return ()=>{
            clearTimeout(timeout);
        }

    },[]);
    return(
        <Box minHeight={"100vh"} minWidth={"100vh"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
            <img src={"/assets/error.png"} alt={"error"} width={"40%"}/>
            <Typography variant={"h4"} align={"center"} style={{color:"#363c4f"}}>{message}</Typography>
            <Link href={"/"}>
                <a>
                    Back to home
                </a>
            </Link>
        </Box>
    )
}

export default ErrorPage;