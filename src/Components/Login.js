import React, { useState } from 'react';
import { fetchUser } from '../Actions'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let target = e.target.name
    let val = e.target.value
    if (target === 'email') {
      setEmail(val)
    }
    if (target === 'password') {
      setPassword(val)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchUser(email, password));
    setTimeout(() => {
      history.push('/');
    }, 2500);
  }
  return (
    <div className='parent'>
      <h3>Login Form</h3>
      <a href='/Signup'>Signup</a>
      <div className='errors'></div>
      <input onChange={e => handleChange(e)} type='email' name='email' placeholder='email' />
      <input onChange={e => handleChange(e)} type='password' name='password' />
      <button onClick={e => handleSubmit(e)}>SUBMIT</button>
    </div>
  )
}
export default Login;