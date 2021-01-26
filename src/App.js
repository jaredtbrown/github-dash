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

function App() {
  const [user, setUser] = useState(null);
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null);
    }
  })

  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <React.Fragment>
        <Toolbar user={user} />

        <Router>
          <Switch>
            <Route exact path="/login" component={() => <Login user={user} />}  />
            <ProtectedRoute exact path ="/" component={Home} user={user} />
            <ProtectedRoute exact path ="/:username" component={MyWork} user={user} />
            <ProtectedRoute exact path ="/org/:orgid" component={Organization} user={user} />
            <Route path="*" component={() => {return (<div>404</div>) }} />
          </Switch>
        </Router>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default App;
