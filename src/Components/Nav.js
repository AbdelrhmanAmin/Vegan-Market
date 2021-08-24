import React, { useEffect, useRef, useState } from 'react';
import { loadingState, logOut, logIn } from '../Actions';
import { useDispatch, connect } from 'react-redux';
// import { GoSignOut } from "react-icons/go";
import { BiExit } from "react-icons/bi";
import { AiFillShop } from "react-icons/ai";
import './nav.css';
import {
  Link
} from 'react-router-dom';
import logo from '../assets/logo.png'
import apple from '../assets/logo-apple.png'
import banana from '../assets/logo-banana.png'
import brocoli from '../assets/logo-brocoli.png'
import grape from '../assets/logo-grape.png'
import tomato from '../assets/logo-tomato.png'
import DelayLink from './DelayLink'
import { gsap } from "gsap";
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';

const Nav = ({ user, userTest }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState(false)
  const [imgID, setImgID] = useState(null)
  let logos = [logo, banana, apple, grape, brocoli, tomato]
  let i = 0;
  const navbarRef = useRef(null)
  const iconsRef = useRef(null)
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      dispatch(logIn(userTest))
    }
    if (user && user.image !== null) {
      setImgID(`Vegan-Market/${user.image.match(/[A-Za-z0-9]{20,}(?=(\.jpg|.png|.gif))/gi)[0]}.png`)
    } else {
      setImgID('Vegan-Market/placeholder_bzklm5.png')
    }
    if (window.innerWidth > 600) {
      gsap.from(navbarRef.current, { duration: 1, y: -500, ease: "power4.out" })
      gsap.from(iconsRef.current, { duration: 1.2, y: -500, ease: "expo.easeOut" })
    }
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
        <Link to='/' className='logo-container' data-testid='logo'>
          <img src={logo} alt='logo' className='logo l-1' id='logo' />
          <div className='logo-div'>
            <h2>Market</h2>
            <h3>Vegan</h3>
          </div>
        </Link>
      </div>
      <div className='nav-flex-right' ref={iconsRef}>

        <DelayLink className="flex-right-header my-3" delay={500} to='/Cart' onDelayStart={() => dispatch(loadingState())}>
          <div className="main-username-div" >
            <CloudinaryContext cloudName='abdoamin' >
              <Image publicId={imgID} className='user-icon'>
                <Transformation height="25" width="25" crop="fill" />
                <Transformation radius="max" />
              </Image>
            </CloudinaryContext>
            <strong className="main-username" data-testid='username'>{username ? username : user.name}</strong>
          </div>
        </DelayLink>
        <DelayLink to='Market' delay={500} onDelayStart={() => dispatch(loadingState())}>
          <AiFillShop color='orange' className='shop-icon' fontSize='2.5rem' data-testid='market' />
        </DelayLink>
        <Link to='/Login' className='sign-out' onClick={() => {
          dispatch(logOut())
        }}><BiExit color='white' className='out-icon' fontSize='2.5rem' data-testid='logout' /></Link>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  user: state.userReducer,
});
export default connect(mapStateToProps, null)(Nav);