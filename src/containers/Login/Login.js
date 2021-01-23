import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const Login = (props) => {
    if (props.user) {
        props.history.push('/');
    }

    const [error, setError] = useState('');

    useEffect(() => {
        // Initialize the FirebaseUI Widget using Firebase.
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: (authResult) => {
                    localStorage.setItem('token', authResult.credential.accessToken);
                    return true;
                },
            },
            signInSuccessUrl: '/',
            signInOptions: [
                {
                    provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
                    scopes: [
                        'user',
                        'repo'
                    ]
                }
            ]
        })
    });

    const signIn = async () => {
        try {
            setError('');
            const gitHubProvider = new firebase.auth.GithubAuthProvider();
            gitHubProvider.addScope('user');
            gitHubProvider.addScope('repo');
            firebase.auth().signInWithRedirect(gitHubProvider);
        } catch (error) {
            console.error(error);
            setError('Something went wrong. Please try again');
        }
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{
                height: '100vh',
            }}
        >
            <Grid item>
                <Card>
                    <CardHeader
                        title={
                            <Typography align="center" variant="h4">
                                GitHub Dash
                            </Typography>
                        }
                    />
                    <CardContent>
                        <Typography variant="subtitle1">GitHub Dash. A dashboard for GitHub.</Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container alignItems="center" justify="center">
                            <Grid item>
                                <div id="firebaseui-auth-container"></div>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography color="error">
                                    {error}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}

export default withRouter(Login);