import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/auth';
import { withRouter } from 'react-router-dom'

const Toolbar = (props) => {
    const signOut = async () => {
       await firebase.auth().signOut();
    }

    const handleTitleClick = () => {
        props.history.push('/');
    }

    return (
        <AppBar position="fixed">
            <MuiToolbar>
                    <Typography variant="h6" onClick={handleTitleClick} style={{ flexGrow: 1, cursor: 'pointer' }}>
                        GitHub Dash
                    </Typography>
                {
                    props.user &&
                    <Button color="inherit" onClick={signOut}>
                        Log out
                    </Button>
                }
            </MuiToolbar>
        </AppBar>
    );
}
 
export default withRouter(Toolbar);
