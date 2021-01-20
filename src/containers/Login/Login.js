import React, { useState } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const Login = (props) => {
    const [error, setError] = useState('');

    const signIn = async () => {
        try {
            setError('');
            const gitHubProvider = new firebase.auth.GithubAuthProvider();
            const result = await firebase.auth().signInWithPopup(gitHubProvider);
            localStorage.setItem('token', result.credential.accessToken);
            props.history.push('/');
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
                        <Typography variant="subtitle1">GitHub Dash. A dashboard for GitHub. Login with your GitHub account to get started.</Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container alignItems="center" justify="center">
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={signIn}>
                                    <GitHubIcon />&nbsp;Login with Github
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

export default Login;