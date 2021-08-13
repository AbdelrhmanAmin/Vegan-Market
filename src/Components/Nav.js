import React, { useEffect, useRef, useState } from 'react';
import { logOut } from '../Actions';
import { useDispatch, connect } from 'react-redux';
import { GoSignOut } from "react-icons/go";
import './nav.css';
import {
  Link, useHistory
} from 'react-router-dom';
import logo from '../assets/logo.png'
import apple from '../assets/logo-apple.png'
import banana from '../assets/logo-banana.png'
import brocoli from '../assets/logo-brocoli.png'
import grape from '../assets/logo-grape.png'
import tomato from '../assets/logo-tomato.png'
import placeholder from '../assets/placeholder.jpg'
import { gsap } from "gsap";

const Nav = ({ user }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState(false)
  const history = useHistory()
  let logos = [logo, banana, apple, grape, brocoli, tomato]
  let i = 0;
  const navbarRef = useRef(null)
  const iconsRef = useRef(null)
  useEffect(() => {
    gsap.from(navbarRef.current, { duration: 1, y: -500, ease: "power4.out" })
    gsap.from(iconsRef.current, { duration: 1.6, y: -500, ease: "expo.easeOut" })
    if (user !== '') {
      let arr = user.name.split(' ')
      if (arr.length > 1) { setUsername(arr[arr.length - 1]) }
    }
    const int = setInterval(() => {
      document.getElementById('logo').src = logos[i]
      // eslint-disable-next-line react-hooks/exhaustive-deps
      i += 1
      if (i === logos.length) {
        i = 0
      }
    }, 3000)
    return () => clearInterval(int)
  }, [])
  return (
    <div className='nav-flex' ref={navbarRef}>
      <div>
        <Link to='/' className='logo-container'>
          <img src={logo} alt='logo' className='logo l-1' id='logo' />
          <h2>Market</h2>
          <h3>Vegan</h3>
        </Link>
      </div>
      <div className='nav-flex-right' ref={iconsRef}>
        <Link to='/Cart' className="flex-right-header my-3">
          <div className="main-username-div" >
            <img src={placeholder} alt="icon" className="user-icon" />
            <strong className="main-username">{username ? username : user.name}</strong>
          </div>
        </Link>
        <Link className='sign-out' onClick={() => {
          dispatch(logOut())
          history.go(0)
        }}><GoSignOut color='white' fontSize='2.5rem' /></Link>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  user: state.userReducer,
});
export default connect(mapStateToProps, null)(Nav);