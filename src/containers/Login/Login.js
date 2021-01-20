import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';

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

    return (<button onClick={signIn}>Login with Github</button>)
}

export default Login;