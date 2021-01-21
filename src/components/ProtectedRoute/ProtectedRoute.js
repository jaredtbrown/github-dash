import React from 'react';
import { withRouter, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
    if (!props.user) {
        props.history.push('/login');
        return null;
    }

    return (
        <Route exact={props.exact} path={props.path} component={props.component} />
    );
}
 
export default withRouter(ProtectedRoute);