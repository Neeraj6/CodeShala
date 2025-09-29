import React, {useContext} from "react";
import {AuthContext} from "../context/auth";
import {Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Error = () => {
    let {error, success, message, setError, setMessage} = useContext(AuthContext);
    const handleClose = () => {
        setMessage("");
        setError(false);
    }
    return (
        <Snackbar open={error} autoHideDuration={2000} onClose={handleClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}} style={{top:"40vh"}}>
            <Alert onClose={handleClose} severity="error">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Error;