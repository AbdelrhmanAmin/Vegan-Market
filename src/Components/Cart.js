import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, removeOrder } from '../Actions'
import './cart.css';
import Nav from './Nav';
import { gsap } from "gsap";

const Cart = ({ currentUser, cart, products }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders(currentUser.id))
    dispatch(fetchProducts())
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
  }, [])
  return (
    <div>
      <Nav />
      <div className='orders-flex'>
        {
          Object.keys(cart).map((key) => {
            return (
              <div className='order-container' id={key}  >
                <div className='info-div'>
                  <h3>{products[key * 1 - 1].name}</h3>
                  <div className='remove-container'>
                    <div className='empty-bg'></div>
                    <button className='remove' onClick={() => {
                      removeOrder(cart[key].id)
                      gsap.to(document.getElementById(key), { duration: 1, ease: "power4.out", rotation: 360, scale: 0 })
                      setTimeout(() => { document.getElementById(key).remove() }, 800)
                    }}>x </button>
                  </div>
                </div>

                <div className='order-flex box'>
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