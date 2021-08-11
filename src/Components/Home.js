import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import main from '../assets/main.png';
import arrow from '../assets/arrow.png';
import { Link } from 'react-router-dom';
import { FaCaretSquareRight } from "react-icons/fa";
const Home = () => {
  return (
    <div>
      <Nav />
      <main className='home-container'>

        <section className='section-1'>

          <h1 className='bracket-1'>[</h1>
          <div className='content'>
            <h1>VEGAN MARKET</h1>
            <p>
              Beans, Grains, and <strong className='green'>Vegetables</strong> <strong className='equal'>=</strong> <strong className='yellow'>Happy</strong> Life.<br></br>
              ADD THEM NOW!
        </p>
            <img src={arrow} alt='arrow' className='arrow' />
            <Link to='/Market'>
              <button className='shop-btn'>Shop Now <FaCaretSquareRight /> </button>
            </Link>
          </div>
          <h1 className='bracket-2'>]</h1>
        </section>
        <section className='section-2'>
          <div className='home-img'>
            <img src={main} className='cat-main' />
            <div className='hearts-container'>
              <div className='heart-div'>
                😸
        <span>9</span>
              </div>
              <div className='heart-div-2'>
                👍
        <span>5</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div >
  )
}


export default Home