import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import main from '../assets/main.png';
import { Link } from 'react-router-dom';
import { FaCaretSquareRight } from "react-icons/fa";
const Home = () => {
  return (
    <div>
      <Nav />
      <img src={main} className='cat-main' />
      <div className='heart-div'>
        😸
        <span>9</span>
      </div>
      <div className='heart-div-2'>
        👍
        <span>5</span>
      </div>
      <h1 className='bracket'>]</h1>
      <h1 className='bracket-2'>[</h1>
      <div className='content'>
        <h1>Vegan Market</h1>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
        <Link to='/Market'>
          <button className='shop-btn'>Shop Now <FaCaretSquareRight /> </button>
        </Link>
      </div>
    </div >
  )
}


export default Home