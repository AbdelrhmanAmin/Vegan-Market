import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import main from '../assets/main.png'

const Home = () => {
  return (
    <div>
      <Nav />
      <img src={main} className='cat-main' />
    </div>
  )
}


export default Home