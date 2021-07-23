import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, logOut, createOrder } from '../Actions'
import './home.css';
import {
  Link
} from 'react-router-dom';
const Home = ({ currentUser, cart, products }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders(currentUser.id))
    dispatch(fetchProducts())
  }, [currentUser])
  return (
    <div>
      <h1>Hello, {currentUser.name}.</h1>
      <Link to='/cart'>Cart</Link> <br></br>
      <button onClick={() => dispatch(logOut())}>Logout</button>
      <div className='product-grid'>
        {
          products.length > 0 ? (
            products.map((product) => (
              <div>
                <div className='product-img-div'>
                  <p>{product.price}$</p>
                  <img src={product.URL} alt='URL' />
                </div>
                <div className='product-desc-div'>
                  <h3>{product.name}</h3>
                  {
                    product.description.length > 160 ? <span>{product.description.substring(0, 140)}...<Link to=''>read more</Link></span> : <span>{product.description}</span>
                  }
                  {
                    cart[product.id] === undefined ? (<button className='cart-off' id={product.id} onClick={() => {
                      createOrder(product.id, currentUser.id)
                      document.getElementById(product.id).remove()
                    }}>Add To Cart</button>) : null
                  }
                </div>
              </div>
            ))
          ) : null
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

export default connect(mapStateToProps, null)(Home)