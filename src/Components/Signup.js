import React, { useState } from 'react';
import { createUser } from '../Actions'
import { useHistory, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import './signup.css'

const Signup = ({ error }) => {
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
    document.getElementById('email-err').innerHTML = ''
    document.getElementById('name-err').innerHTML = ''
    document.getElementById('pw-err').innerHTML = ''
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const test = /^[a-zA-Z]+$/
    if (!re.test(String(email).toLowerCase())) {
      let target = document.getElementById('email-err')
      target.style.color = '#b22424'
      target.style.fontWeight = 500
      target.style.fontSize = 11 + 'px'
      target.innerHTML = "Email must be valid."
    }
    if (!test.test(name.replace(' ', ''))) {
      let target = document.getElementById('name-err')
      target.style.color = '#b22424'
      target.style.fontWeight = 500
      target.style.fontSize = 11 + 'px'
      target.innerHTML = "Name must contain only letters."
    }
    if (password.length < 6) {
      let target = document.getElementById('pw-err')
      target.style.color = '#b22424'
      target.style.fontWeight = 500
      target.style.fontSize = 11 + 'px'
      target.innerHTML = "Password must be longer than 6 charcaters."
    }
    if (password.length > 5 && test.test(name.replace(' ', '')) && re.test(String(email).toLowerCase())) {
      dispatch(createUser(name, email, password));
      let container = document.querySelector('.container')
      container.innerHTML = ''
      let gif = document.createElement('img')
      gif.src = 'https://cdn.dribbble.com/users/451713/screenshots/3853529/_____.gif'
      container.style.cssText = 'display: flex; justify-content: center'
      container.appendChild(gif)
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  }
  return (
    <main className='sign-container'>
      <section className='top'>
        <div className="title">SIGN UP</div>
        <span className='redirect'>Already have an account? <Link to='/Login'>Login</Link></span>
      </section>
      <section className="form-container">
        <div className="login">
          <strong className='errors'>{error}</strong>
          <form action="#" method="post" className="form" onSubmit={e => handleSubmit(e)}>
            <fieldset>
              <label
              >Email Address:<input onChange={e => handleChange(e)} type='email' name='email' required />
              </label>
              <span id='email-err'></span>
            </fieldset>
            <fieldset>
              <label
              >Name:<input onChange={e => handleChange(e)} type="text" name="name" required />
              </label>
              <span id='name-err'></span>
            </fieldset>
            <fieldset>
              <label>
                Password: <input onChange={e => handleChange(e)} type="password" name="password" required />
              </label>
              <span id='pw-err'></span>
            </fieldset>
            <button type="submit">
              <i className="fas fa-lock"></i>Create Account
            </button>
          </form>
        </div>
        <div className="footer-form">
        </div>
      </section>
    </main>
  )
}
const mapStateToProps = (state) => ({
  error: state.errorReducer
});

export default connect(mapStateToProps, null)(Signup)