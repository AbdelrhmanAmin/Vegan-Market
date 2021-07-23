import React from 'react';
import { connect } from 'react-redux';
import { createOrder } from '../Actions'

const Product = ({ product, currentUser, cart, setVisible }) => {
  return (
    <div className='pop-up'>
      <div className='product-img-div'>
        <button className='exit-popup' onClick={() => setVisible(false)}>x</button>
        <p>{product.price}$</p>
        <img src={product.URL} alt='URL' />
      </div>
      <div className='product-desc-div'>
        <h3>{product.name}</h3>
        <span>{product.description}</span>
        {
          cart[product.id] === undefined ? (<button className='cart-off' id={product.id} onClick={() => {
            createOrder(product.id, currentUser.id)
            document.getElementById(product.id).remove()
          }}>Add To Cart</button>) : null
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer,
  cart: state.cartReducer,
});

export default connect(mapStateToProps, null)(Product)