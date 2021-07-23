import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, logOut, createOrder } from '../Actions'
import { FaCartArrowDown } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import './home.css';
import {
  Link, useHistory
} from 'react-router-dom';
import logo from '../assets/logo.png'

const Home = ({ currentUser, cart, products }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(fetchOrders(currentUser.id))
    dispatch(fetchProducts())
  }, [currentUser])
  return (
    <div>
      <div className='nav-flex'>
        <div>
          <Link to='/'><img src={logo} width='75' height='75' alt='logo' /></Link>
        </div>
        <div className='nav-flex-right'>
          <Link to='/cart'><FaCartArrowDown color='white' fontSize='2.5rem' /></Link>
          <button className='sign-out' onClick={() => {
            dispatch(logOut())
            history.go(0)
          }}><GoSignOut color='white' fontSize='2.5rem' /></button>
        </div>
      </div>
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