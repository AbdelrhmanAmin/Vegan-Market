import React, { useState, useEffect } from 'react';
import { fetchUser, userLoadingState, error as error_fn } from '../Actions'
import { useHistory, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { logIn } from '../Actions/index';

const Login = ({ error = '', user_loading, currentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  let token = localStorage.getItem('token');
  useEffect(() => {
    // if loading is false and error is empty then redirect to homepage
    if (token) {
      let temp = decode(token)
      dispatch(logIn(temp))
    }
    if (currentUser.id) {
      history.push('/')
    }
  })
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
      dispatch(userLoadingState(true))
      dispatch(fetchUser(email, password));
    }
  }
  return (
    <div>
      {
        user_loading ?
          <div className='loading_user_gif' >
            <img src='https://cdn.dribbble.com/users/451713/screenshots/3853529/_____.gif' alt='loading gif' />
          </div>
          :
          (
            <main className='sign-container'>
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
          )}
    </div>
  )
}
const mapStateToProps = (state) => ({
  error: state.errorReducer,
  user_loading: state.userLoadingReducer,
  currentUser: state.userReducer,
});

export default connect(mapStateToProps, null)(Login)