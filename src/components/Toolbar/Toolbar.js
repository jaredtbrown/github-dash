import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/auth';

const Toolbar = (props) => {
    const signOut = async () => {
       await firebase.auth().signOut();
    }

    return (
        <AppBar position="fixed">
            <MuiToolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    GitHub Dash
                </Typography>
                {
                    props.user &&
                    <Button color="inherit" onClick={signOut}>
                        Logout
                    </Button>
                }
            </MuiToolbar>
        </AppBar>
    );
}
 
export default Toolbar;
