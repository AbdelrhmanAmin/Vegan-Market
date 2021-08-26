/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { createUser, userLoadingState, logIn } from '../Actions'
import { useHistory, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import './signup.css'
import decode from 'jwt-decode';

const Signup = ({ error, user_loading, currentUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(0);
  const [image, setImage] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  let token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      let temp = decode(token)
      dispatch(logIn(temp))
    }
  }, [token])
  useEffect(() => {
    if (currentUser.id) {
      history.push('/')
    }
  }, [currentUser.id])
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
      dispatch(userLoadingState(true))
      const form = new FormData()
      form.append('name', name)
      form.append('email', email)
      form.append('password', password)
      form.append('image', image)
      dispatch(createUser(form));
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
                    <label><span className='red-star'>*</span>Email Address:<input onChange={e => handleChange(e)} type='email' name='email' required />
                    </label>
                    <span id='email-err'></span>
                  </fieldset>
                  <fieldset>
                    <label><span className='red-star'>*</span>Name:<input onChange={e => handleChange(e)} type="text" name="name" required />
                    </label>
                    <span id='name-err'></span>
                  </fieldset>
                  <fieldset>
                    <label>
                      <span className='red-star'>*</span>Password: <input onChange={e => handleChange(e)} type="password" name="password" required />
                    </label>
                    <span id='pw-err'></span>
                  </fieldset>
                  <fieldset>
                    <label>
                      <span className='red-star'>*</span>Image: <input type="file" name="image"
                        onChange={(e) => setImage(e.target.files[0])} />
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
      }
    </div>
  )
}
const mapStateToProps = (state) => ({
  error: state.errorReducer,
  user_loading: state.userLoadingReducer,
  currentUser: state.userReducer,
});

export default connect(mapStateToProps, null)(Signup)