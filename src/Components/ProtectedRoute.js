import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

const ProtectedRoute = () => (
  <Route
    render={() => {
      if (localStorage.token) {
        let data = decode(localStorage.token);
        let exp = data.exp * 1000
        if (new Date(exp) <= new Date()) {
          localStorage.removeItem('token')
          data = null;
          exp = null;
          return <Redirect to='/Login' />
        }
        return (<div>Hello, {data.name}</div>)
      }
      return <Redirect to='/Login' />
    }}
  />
);
export default ProtectedRoute;