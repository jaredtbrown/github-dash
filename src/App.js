import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './containers/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path ="/" component={() => { return (<div>Protected</div>) }} />
        <Route path="*" component={() => {return (<div>404</div>) }} />
      </Switch>
    </Router>
  );
}

export default App;
