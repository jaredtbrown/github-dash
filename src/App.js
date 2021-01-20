import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Login from './containers/Login';
import ProtectedRoute from './components/ProtectedRoute';
import theme from './theme'

function App() {
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path ="/" component={() => { return (<div>Protected</div>) }} />
          <Route path="*" component={() => {return (<div>404</div>) }} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
