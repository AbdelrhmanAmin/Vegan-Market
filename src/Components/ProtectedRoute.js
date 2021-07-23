import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logIn } from '../Actions/index';


const ProtectedRoute = ({ component: Component }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  let token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      let temp = decode(token)
      dispatch(logIn(temp))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    < Route
      render={() => {
        if (token) {
          return (<Component />)
        }
        return <Redirect to='/Login' />
      }}
    />
  )
};

export default ProtectedRoute;