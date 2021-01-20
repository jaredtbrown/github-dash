import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/auth';

const ProtectedRoute = (props) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        props.history.push('/login');
        return null;
    }

    return (
        <Route exact={props.exact} path={props.path} component={props.component} />
    );
}
 
export default withRouter(ProtectedRoute);