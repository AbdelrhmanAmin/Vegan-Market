import React, { useEffect, useState, useRef } from 'react';
import Nav from './Nav';
import main from '../assets/main.png';
import arrow from '../assets/arrow.png';
import { Link } from 'react-router-dom';
import { FaCaretSquareRight } from "react-icons/fa";
import { gsap } from "gsap";

const Home = () => {
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const [cats, setCats] = useState(9)
  const [likes, setLikes] = useState(5)
  const handleCats = (e) => {
    setCats(cats + 1)
    document.getElementById('cat-target').classList.add('animation')
    setTimeout(() => {
      document.getElementById('cat-target').classList.remove('animation')
    }, 800)
  }
  const handleLikes = (e) => {
    setLikes(likes + 1)
    document.getElementById('like-target').classList.add('animation')
    setTimeout(() => {
      document.getElementById('like-target').classList.remove('animation')
    }, 800)
  }
  useEffect(() => {
    gsap.from(sectionRef1.current, { duration: 5, x: -500, ease: "power4.out" })
    gsap.from(sectionRef2.current, { duration: 4, x: 500, ease: "power4.out" })
  }, [])
  return (
    <div>
      <Nav />
      <main className='home-container'>

        <section className='section-1' ref={sectionRef1}>

          <h1 className='bracket-1'>[</h1>
          <div className='content'>
            <h1 className='content-headline'>VEGAN MARKET</h1>
            <p>
              Beans, Grains, and <strong className='green'>Vegetables</strong> <strong className='equal'>=</strong> <strong className='yellow'>Happy</strong> Life.<br></br>
              ADD THEM NOW!
        </p>
            <img src={arrow} alt='arrow' className='arrow' />
            <Link to='/Market' style={{ width: '115px' }}>
              <button className='shop-btn'>
                Shop Now <FaCaretSquareRight />
              </button>
            </Link>
          </div>
          <h1 className='bracket-2'>]</h1>
        </section>
        <section className='section-2' ref={sectionRef2}>
          <div className='home-img'>
            <img src={main} className='cat-main' />
            <div className='hearts-container'>
              <div className='heart-div' onClick={() => handleCats()}>
                <div id='cat-target'>😸</div>
                😸
        <span>{cats}</span>
              </div>
              <div className='heart-div-2' onClick={() => handleLikes()}>
                <div id='like-target'>👍</div>
                👍
        <span>{likes}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div >
  )
}


export default Home