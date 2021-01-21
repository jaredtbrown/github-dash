import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { MarkGithubIcon } from '@primer/octicons-react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom'

const Login = (props) => {
    if (props.user) {
        props.history.push('/');
    }

    const [error, setError] = useState('');

    useEffect(() => {
        const getCredentials = async () => {
            const result = await firebase.auth().getRedirectResult();
            if (result.credential) {
                localStorage.setItem('token', result.credential.accessToken);
            }
        };

        getCredentials();
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
                                <Button variant="outlined" color="inherit" onClick={signIn}>
                                    <MarkGithubIcon />&nbsp;Login with Github
                                </Button>
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