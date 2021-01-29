import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/auth';
import Login from './containers/Login';
import ProtectedRoute from './components/ProtectedRoute';
import theme from './theme';
import Home from './containers/Home';
import Organization from './containers/Organization';
import MyWork from './containers/MyWork';
import Toolbar from './components/Toolbar';
import Repo from './containers/Repo';

function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [user, setUser] = useState(null);
  
  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
    setAppInitialized(true);
  });

  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
        <Router>
          <Toolbar user={user} />

          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path ="/" component={Home} user={user} appInitialized={appInitialized} />
            <ProtectedRoute exact path ="/:username" component={MyWork} user={user} appInitialized={appInitialized} />
            <ProtectedRoute exact path ="/org/:orgid" component={Organization} user={user} appInitialized={appInitialized} />
            <ProtectedRoute exact path="/:owner/:repo" component={Repo} user={user} appInitialized={appInitialized} />
            <Route path="*" component={() => {return (<div>404</div>) }} />
          </Switch>
        </Router>
    </MuiThemeProvider>
  );
}

export default App;
