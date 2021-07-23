import React, { useEffect } from 'react';
import {
  Link
} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, removeOrder } from '../Actions'
import './home.css';

const Cart = ({ currentUser, cart, products }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders(currentUser.id))
    dispatch(fetchProducts())
  }, [currentUser])
  return (
    <div>
      <h1>WELCOME TO CART</h1>
      <Link to='/'>HOME</Link>
      <div className='product-grid'>
        {
          Object.keys(cart).map((key) => (<div id={key}>
            <img src={products[key * 1 - 1].URL} alt='URL' width='250' height='250' />
            <h3>{products[key * 1 - 1].name}</h3>
            <p>{products[key * 1 - 1].price}$</p>
            <button onClick={() => {
              removeOrder(cart[key].id)
              document.getElementById(key).remove()
            }}>DELETE {cart[key].id} </button>
          </div>))
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