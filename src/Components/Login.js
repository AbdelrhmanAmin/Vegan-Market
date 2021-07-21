import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(0);
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
    fetch(`${process.env.REACT_APP_API}/sessions`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((res) => res.json())
      .then((response) => {
        console.log(response)
        if (response.user) {
          localStorage.setItem('token', response.user.token)
          const parent = document.querySelector('.parent');
          const gif = document.createElement('img')
          gif.src = 'https://www.alhaya-medical.com/wp-content/uploads/2017/10/Loading-GIF-Image-4.gif'
          gif.width = '480'
          gif.height = '480'
          parent.innerHTML = ''
          parent.appendChild(gif)
          setTimeout(() => {
            history.push('/');
          }, 2500);
        }
        if (response.message) {
          let parent = document.querySelector('.errors');
          parent.innerHTML = ''
          let child = document.createElement('p');
          child.style.color = 'red';
          child.innerHTML = `${response.message}`
          parent.appendChild(child)
        }
      })
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