import React, { useState, useEffect } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(0);
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
    fetch(`${process.env.REACT_APP_API}/users`, {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((res) => res.json())
      .then((response) => {
        console.log(response)
        let parent = document.querySelector('.errors');
        parent.innerHTML = ''
        if (response.user) {
          localStorage.setItem('token', response.user.token)
        }
        if (response.errors) {
          for (let err in response.errors) {
            console.log(response.errors)
            let child = document.createElement('p');
            child.style.color = 'red';
            child.innerHTML = `${err} ${response.errors[err][0]}`
            parent.appendChild(child)
          }
        }
      })
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