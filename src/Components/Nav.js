import React, { useEffect, useRef } from 'react';
import { logOut } from '../Actions';
import { useDispatch } from 'react-redux';
import { FaCartArrowDown } from "react-icons/fa";
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

const Nav = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const i = useRef(0)
  let logos = [logo, banana, apple, grape, brocoli, tomato]
  useEffect(() => {
    setInterval(() => {
      console.log(i)
      document.getElementById('logo').src = logos[i.current]

      i.current += 1
      if (i.current === logos.length) {
        i.current = 0
      }
    }, 3000)
  }, [])
  return (
    <div className='nav-flex'>
      <div>
        <Link to='/' className='logo-container'>
          <img src={logo} width='75' height='75' alt='logo' className='logo l-1' id='logo' />
          <h2>Market</h2>
          <h3>Vegan</h3>
        </Link>
      </div>
      <div className='nav-flex-right'>
        <Link to='/cart'><FaCartArrowDown color='white' fontSize='2.5rem' /></Link>
        <button className='sign-out' onClick={() => {
          dispatch(logOut())
          history.go(0)
        }}><GoSignOut color='white' fontSize='2.5rem' /></button>
      </div>
    </div>
  )
}
export default Nav;