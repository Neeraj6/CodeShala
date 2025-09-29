import React, {useContext} from "react";
import {AuthContext} from "../context/auth";
import {Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Success = () => {
    let {error, success, message, setSuccess, setMessage} = useContext(AuthContext);
    const handleClose = () => {
        setMessage("");
        setSuccess(false);
    }
    return (
        <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}} style={{top:"40vh"}}>
            <Alert onClose={handleClose} severity="success">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Success;