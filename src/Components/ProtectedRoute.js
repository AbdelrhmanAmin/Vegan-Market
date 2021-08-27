import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logIn, fetchOrders, loadingState } from '../Actions/index';


const ProtectedRoute = ({ component: Component }) => {
  const dispatch = useDispatch()
  let token = localStorage.getItem('token');
  useEffect(() => {
    console.log('hello there')
    if (token) {
      let temp = decode(token)
      dispatch(loadingState())
      dispatch(logIn(temp))
      dispatch(fetchOrders(temp.id))
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