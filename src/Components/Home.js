import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, logOut, createOrder } from '../Actions';
import Product from './Product';
import { FaCartArrowDown } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import './home.css';
import {
  Link, useHistory
} from 'react-router-dom';
import logo from '../assets/logo.png'
import apple from '../assets/logo-apple.png'
import banana from '../assets/logo-banana.png'
import brocoli from '../assets/logo-brocoli.png'
import grape from '../assets/logo-grape.png'
import tomato from '../assets/logo-tomato.png'

const Home = ({ currentUser, cart, products }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [productX, setProduct] = useState(0)
  let logos = [logo, banana, apple, grape, brocoli, tomato]
  let i = 0
  useEffect(() => {
    dispatch(fetchOrders(currentUser.id))
    dispatch(fetchProducts())
    setInterval(() => {
      document.getElementById('logo').src = logos[i]

      i += 1
      if (i === logos.length) {
        i = 0
      }
    }, 3000)
  }, [currentUser])
  return (
    <div>
      <div className='nav-flex'>
        <div>
          <Link to='/' className='logo-container'>
            <img src={logo} width='75' height='75' alt='logo' className='logo l-1' id='logo' />
            <h2>Market</h2>
            <h3>Vegan</h3>
          </Link>
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
              <div key={product.id}>
                <div className='product-img-div'>
                  <p>{product.price}.00$</p>
                  <img src={product.URL} alt='URL' />
                </div>
                <div className='product-desc-div'>
                  <h3>{product.name}</h3>
                  {
                    product.description.length > 160 ? <span>{product.description.substring(0, 140)}...<Link onClick={() => {
                      setVisible(true)
                      setProduct(product)
                    }}>read more</Link></span> : <span>{product.description}</span>
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

export default connect(mapStateToProps, null)(Home)