import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, createOrder } from '../Actions';
import Product from './Product';
import './market.css';
import './home.css';
import { FaCartArrowDown } from "react-icons/fa";
import { gsap } from "gsap";

import {
  Link
} from 'react-router-dom';
import Nav from './Nav';

const Home = ({ currentUser, cart, products }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [productX, setProduct] = useState(0)
  useEffect(() => {
    dispatch(fetchOrders(currentUser.id))
    dispatch(fetchProducts())
    gsap.from('.box', {
      duration: 2,
      x: -2500,
      opacity: 0,
      delay: 0.5,
      stagger: 0.2,
      ease: "power4.out",
      force3D: true
    });
    gsap.from('.box-img', {
      duration: 0.8,
      x: -2500,
      delay: 0.5,
      stagger: 0.2,
      ease: "power4.out",
      force3D: true
    });
    setTimeout(() => { document.getElementById('layer-loading').remove() }, 2200)
  }, [])
  return (
    <div>
      <Nav />
      <div className='product-grid'>
        <div id='layer-loading'>
        </div>
        {
          products.length > 0 ? (
            products.map((product) => (
              <div className='product-container' key={product.id} >
                <div className='box-img product-img-div'>
                  <div className='overlay-2'></div>
                  <p>{product.price}.00$</p>
                  <div className='img-container'>
                    <img src={product.URL} alt='URL' />
                  </div>
                </div>
                <div className='box product-box'>
                  <div className='product-desc-div'>
                    <h2>{product.name}</h2>
                    {
                      product.description.length > 160 ? <span>{product.description.substring(0, 80)}...<Link onClick={() => {
                        setVisible(true)
                        setProduct(product)
                      }}><strong style={{
                        background: 'white',
                        color: '#ff9500',
                      }}>READ MORE </strong></Link></span> : <span>{product.description}</span>
                    }
                    {
                      cart[product.id] === undefined ? (<button className='cart-off' id={product.id} onClick={() => {
                        createOrder(product.id, currentUser.id)
                        gsap.to(document.getElementById(product.id), { duration: 1, ease: "power4.out", x: -2000 })
                        setTimeout(() => { document.getElementById(product.id).outerHTML = '<div></div>' }, 900)
                      }}>Add To<FaCartArrowDown color='inherit' fontSize='1.5rem' /></button>) : <div></div>
                    }
                  </div>
                </div>
              </div>
            ))
          ) : null
        }
        {
          visible ? (
            <div>
              <Product product={productX} setVisible={setVisible} />
              <div className='layer'></div>
            </div>
          )
            : null
        }
      </div>
    </div >
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer,
  cart: state.cartReducer,
  products: state.productReducer
});

export default connect(mapStateToProps, null)(Home)