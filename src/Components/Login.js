import React, { useState } from 'react';
import { fetchUser } from '../Actions'
import { useHistory, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

const Login = ({ error }) => {
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
    document.getElementById('email-err').innerHTML = ''
    document.getElementById('pw-err').innerHTML = ''
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      let target = document.getElementById('email-err')
      target.style.color = '#b22424'
      target.style.fontWeight = 500
      target.style.fontSize = 11 + 'px'
      target.innerHTML = "Email must be valid."
    }
    if (password.length < 6) {
      let target = document.getElementById('pw-err')
      target.style.color = '#b22424'
      target.style.fontWeight = 500
      target.style.fontSize = 11 + 'px'
      target.innerHTML = "Password must be longer than 6 charcaters."
    }
    if (password.length > 5 && re.test(String(email).toLowerCase())) {
      dispatch(fetchUser(email, password));
      let container = document.querySelector('.container')
      container.innerHTML = ''
      let gif = document.createElement('img')
      gif.src = 'https://cdn.dribbble.com/users/451713/screenshots/3853529/_____.gif'
      container.style.cssText = 'display: flex; justify-content: center'
      container.appendChild(gif)
      setTimeout(() => {
        history.push('/');
      }, 2000);
    }
  }
  return (
    <main className='container'>
      <section className='top'>
        <div className="title">Login</div>
        <span className='redirect'>Don't have an account? <Link to='/Signup'>Sign Up</Link></span>
      </section>
      <section className="form-container">
        <div className="login-inverse">
          <strong className='errors'>{error}</strong>
          <form action="#" method="post" className="form" onSubmit={e => handleSubmit(e)}>
            <fieldset>
              <label
              >Email Address:<input onChange={e => handleChange(e)} type='email' name='email' required />
              </label>
              <span id='email-err'></span>
            </fieldset>
            <fieldset>
              <label>
                Password: <input onChange={e => handleChange(e)} type="password" name="password" required />
              </label>
              <span id='pw-err'></span>
            </fieldset>
            <button type="submit" class='btn-inverse'>
              Login
            </button>
          </form>
        </div>
        <div className="footer-form-inverse">
        </div>
      </section>
    </main>
  )
}
const mapStateToProps = (state) => ({
  error: state.errorReducer
});

export default connect(mapStateToProps, null)(Login)