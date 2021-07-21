import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import decode from 'jwt-decode';

const token = localStorage.getItem('token');
if (token) {
  let data = decode(token);
  let exp = data.exp * 1000
  if (new Date(exp) <= new Date()) {
    localStorage.removeItem('token')
    data = null;
    exp = null;
  }
}

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <ProtectedRoute path='/' exact />
          <Route path='/Signup' exact component={Signup} />
          <Route path='/Login' exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
