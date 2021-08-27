import React, { useEffect, useRef, useState } from 'react';
import { loadingState, logOut, logIn } from '../Actions';
import { useDispatch, connect } from 'react-redux';
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
import { gsap } from "gsap";
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import ReactTooltip from 'react-tooltip';

const Nav = ({ user, userTest, loading }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState(false)
  const [imgID, setImgID] = useState(null)
  let logos = [logo, banana, apple, grape, brocoli, tomato]
  let i = 0;
  const navbarRef = useRef(null)
  const iconsRef = useRef(null)
  useEffect(() => {
    if (user && user.image !== null) {
      setImgID(`Vegan-Market/${user.image.match(/[A-Za-z0-9]{20,}(?=(\.jpg|.png|.gif))/gi)[0]}.png`)
    } else {
      setImgID('Vegan-Market/placeholder_bzklm5.jpg')
    }
  }, [user.id])
  useEffect(() => {
    if (window.innerWidth > 600) {
      gsap.from(navbarRef.current, { duration: 1, y: -500, ease: "power4.out" })
      gsap.from(iconsRef.current, { duration: 1.2, y: -500, ease: "expo.easeOut" })
    }
  }, [])
  useEffect(() => {
    // if (!localStorage.getItem('token')) {
    //   dispatch(logIn(userTest))
    // }
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
  }, [loading])
  return (
    <div className='nav-flex' ref={navbarRef}>
      <div>
        <ReactTooltip place="bottom" type="warning" effect="solid" />
        <Link to='/' className='logo-container' data-type='warning' data-tip='Homepage' data-testid='logo'>
          <img src={logo} alt='logo' className='logo l-1' id='logo' />
          <div className='logo-div'>
            <h2>Market</h2>
            <h3>Vegan</h3>
          </div>
        </Link>
      </div>
      <div className='nav-flex-right' ref={iconsRef}>

        <Link className="flex-right-header my-3" data-tip='The Cart' data-type='light' to='/Cart' onClick={() => dispatch(loadingState())}>
          <div className="main-username-div">
            <CloudinaryContext cloudName='abdoamin' >
              <Image publicId={imgID} className='user-icon'>
                <Transformation height="25" width="25" crop="fill" />
                <Transformation radius="max" />
              </Image>
            </CloudinaryContext>
            <strong className="main-username" data-testid='username'>{username ? username : user.name}</strong>
          </div>
        </Link>
        <Link to='Market' onClick={() => dispatch(loadingState())}>
          <AiFillShop data-type='light' data-tip='The Market' color='orange' className='shop-icon' fontSize='2.5rem' data-testid='market' />
        </Link>
        <Link to='/Login' className='sign-out' onClick={() => {
          dispatch(logOut())
        }}><BiExit data-type='light' data-tip='Logout' color='white' className='out-icon' fontSize='2.5rem' data-testid='logout' /></Link>
        <ReactTooltip place="bottom" type="light" effect="solid" />
      </div>

    </div>
  )
}
const mapStateToProps = (state) => ({
  user: state.userReducer,
  loading: state.productsLoadingReducer
});
export default connect(mapStateToProps, null)(Nav);