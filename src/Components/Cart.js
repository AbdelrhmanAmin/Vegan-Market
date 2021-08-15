import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, removeOrder } from '../Actions'
import './cart.css';
import Nav from './Nav';
import { gsap } from "gsap";

const Cart = ({ currentUser, cart, products, loading }) => {
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders(currentUser.id))
    dispatch(fetchProducts())
    setTotal(cart.reduce((sum, p) => { return sum += p.product_price }, 0))
    if (!loading) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])
  return (
    <div>
      <Nav />
      {loading ? <img src='https://cdn.dribbble.com/users/451713/screenshots/3853529/_____.gif' className='gif-loading' alt='gif-loading' /> :
        <div className='orders-flex'>
          <div className='total'>
            <strong>Total:</strong> {total}$
      </div>
          {
            cart.map((order) => {
              return (
                <div className='order-container' id={order.id} key={order.id} >
                  <div className='info-div'>
                    <h3>{order.name}</h3>
                    <div className='remove-container'>
                      <div className='empty-bg'></div>
                      <button className='remove' onClick={() => {
                        setTotal(total - order.product_price)
                        removeOrder(order.id)
                        gsap.to(document.getElementById(order.id), { duration: 1, ease: "power4.out", rotation: 360, scale: 0 })
                        setTimeout(() => { document.getElementById(order.id).remove() }, 800)
                      }}>x </button>
                    </div>
                  </div>

                  <div className='order-flex box'>
                    <div className='overlay'></div>
                    <p className='price'>{order.product_price}$</p>
                    <div className='order-img-div'>
                      <img src={products[order.product_id * 1 - 1].URL} alt='URL' width='250' height='250' />
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer,
  cart: state.cartReducer,
  products: state.productReducer,
  loading: state.loadingReducer
});

export default connect(mapStateToProps, null)(Cart)