import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import Button from '@material-ui/core/Button';

const Login = (props) => {
    const gitHubProvider = new firebase.auth.GithubAuthProvider();

    const signIn = async () => {
        try {
            const result = await firebase.auth().signInWithPopup(gitHubProvider);
            const credential = result.credential;
            localStorage.setItem('token', credential.token);
            props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (<Button variant="contained" color="primary" onClick={signIn}>Login with Github</Button>)
}

export default Login;