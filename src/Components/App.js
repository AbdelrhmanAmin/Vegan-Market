import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/Signup' exact component={Signup} />
          <Route path='/Login' exact component={Login} />
          <ProtectedRoute path='/' exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
