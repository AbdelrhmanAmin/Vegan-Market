import React, { useState } from 'react';
import { createUser } from '../Actions'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let target = e.target.name
    let val = e.target.value
    if (target === 'name') {
      setName(val)
    }
    if (target === 'email') {
      setEmail(val)
    }
    if (target === 'password') {
      setPassword(val)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createUser(name, email, password));
    setTimeout(() => {
      history.push('/');
    }, 2500);
  }
  return (
    <div>
      <h3>Signup Form</h3>
      <a href='/Login'>Login</a>
      <div className='errors'></div>
      <input onChange={e => handleChange(e)} type='text' name='name' placeholder='full name' />
      <input onChange={e => handleChange(e)} type='email' name='email' placeholder='email' />
      <input onChange={e => handleChange(e)} type='password' name='password' />
      <button onClick={e => handleSubmit(e)}>SUBMIT</button>
    </div>
  )
}
export default Signup;