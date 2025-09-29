import React from "react";
import {Box, CircularProgress} from "@material-ui/core";

const Loader = ()=>{

    return(
        <Box minHeight={"100vh"} minWidth={"100vw"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress style={{color:"black"}}/>
        </Box>
    )

}

export default Loader;