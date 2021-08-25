import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import Market from './Components/Market';
import Cart from './Components/Cart';
import ProtectedRoute from './Components/ProtectedRoute';



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/Signup' exact component={Signup} />
          <Route path='/Login' exact component={Login} />
          <ProtectedRoute path='/' exact component={Home} />
          <ProtectedRoute path='/Market' component={Market} />
          <ProtectedRoute path='/Cart' component={Cart} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
