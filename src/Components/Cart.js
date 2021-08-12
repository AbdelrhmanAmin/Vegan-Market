import React, { useEffect, useState, useRef } from 'react';
import {
  Link
} from 'react-router-dom';
import Product from './Product';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, removeOrder } from '../Actions'
import './cart.css';
import Nav from './Nav';
import { gsap } from "gsap";

const Cart = ({ currentUser, cart, products }) => {
  const boxes = useRef(null)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [productX, setProduct] = useState(0)
  useEffect(() => {
    dispatch(fetchOrders(currentUser.id))
    dispatch(fetchProducts())
    if (boxes.current) {
      gsap.from('.box', {
        duration: 2,
        y: -2500,
        delay: 0.5,
        stagger: 0.2,
        ease: "power4.out",
        force3D: true
      });
      gsap.from('.info-div', {
        duration: 0.8,
        y: -2500,
        delay: 0.5,
        stagger: 0.2,
        ease: "power4.out",
        force3D: true
      });
    }
  }, [currentUser])
  return (
    <div>
      <Nav />
      <div className='orders-flex' ref={boxes}>
        {
          Object.keys(cart).map((key) => {
            return (
              <div className='order-container'>
                <div className='info-div'>
                  <h3>{products[key * 1 - 1].name}</h3>
                  <div className='remove-container'>
                    <div className='empty-bg'></div>
                    <button className='remove' onClick={() => {
                      removeOrder(cart[key].id)
                      document.getElementById(key).remove()
                    }}>x </button>
                  </div>
                </div>

                <div id={key} className='order-flex box'>
                  <div className='overlay'></div>
                  <p className='price'>{products[key * 1 - 1].price}$</p>
                  <div className='order-img-div'>
                    <img src={products[key * 1 - 1].URL} alt='URL' width='250' height='250' />
                  </div>
                </div>
              </div>
            )
          })
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
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer,
  cart: state.cartReducer,
  products: state.productReducer
});

export default connect(mapStateToProps, null)(Cart)