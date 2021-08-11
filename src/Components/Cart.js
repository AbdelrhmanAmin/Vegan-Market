import React, { useEffect, useState } from 'react';
import {
  Link
} from 'react-router-dom';
import Product from './Product';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, removeOrder } from '../Actions'
import './cart.css';
import Nav from './Nav';

const Cart = ({ currentUser, cart, products }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [productX, setProduct] = useState(0)
  useEffect(() => {
    dispatch(fetchOrders(currentUser.id))
    dispatch(fetchProducts())
  }, [currentUser])
  return (
    <div>
      <Nav />
      <div className='orders-flex'>
        {
          Object.keys(cart).map((key) => {
            return (
              <div id={key} className='order-flex'>
                <div className='info-div'>
                  <h3>{products[key * 1 - 1].name}</h3>
                  <p className='price'>{products[key * 1 - 1].price}$</p>
                  <button className='remove' onClick={() => {
                    removeOrder(cart[key].id)
                    document.getElementById(key).remove()
                  }}>x </button>
                </div>
                <div className='order-img-div'>
                  <img src={products[key * 1 - 1].URL} alt='URL' width='250' height='250' />
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