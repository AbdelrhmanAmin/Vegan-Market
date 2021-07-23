import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Cart from './Cart';
import ProtectedRoute from './ProtectedRoute';



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/Signup' exact component={Signup} />
          <Route path='/Login' exact component={Login} />
          <ProtectedRoute path='/' exact component={Home} />
          <ProtectedRoute path='/Cart' exact component={Cart} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
