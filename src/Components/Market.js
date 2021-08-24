import React, { useEffect, useState } from 'react';
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

const Home = ({ currentUser, userTest = false, productsTest = false, cart, products, loading, loadingTest = true }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [productX, setProduct] = useState(0)
  if (!loadingTest) { loading = loadingTest }
  if (productsTest) { products = productsTest }
  useEffect(() => {
    if (!userTest) {
      dispatch(fetchOrders(currentUser.id))
      dispatch(fetchProducts())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])
  return (
    <div>
      <Nav userTest={userTest} />
      {loading ?
        <img src='https://cdn.dribbble.com/users/451713/screenshots/3853529/_____.gif' className='gif-loading' alt='loading-gif' /> :
        <div className='product-grid' data-testid='p-grid' >
          {
            products.map((product) => (
              <div className='product-container' key={product.id} >
                <div className='box-img product-img-div'>
                  <div className='overlay-2'></div>
                  <p data-testid='price'>{product.price}.00$</p>
                  <div className='img-container'>
                    <img src={product.URL} alt='URL' data-testid='img' />
                  </div>
                </div>
                <div className='box product-box'>
                  <div className='product-desc-div'>
                    <h2 data-testid='name'>{product.name}</h2>
                    {
                      product.description.length > 160 ? <span data-testid='desc1'>{product.description.substring(0, 80)}...<Link to='#' data-testid='read-more' onClick={() => {
                        setVisible(true)
                        setProduct(product)
                      }}><strong style={{
                        background: 'white',
                        color: '#ff9500',
                      }}>READ MORE </strong></Link></span> : <span data-testid='desc2'>{product.description}</span>
                    }
                    {
                      cart.find(x => x.product_id === product.id) === undefined ? (<button className='cart-off' data-testid={`add-btn${product.id}`} id={product.id} onClick={() => {
                        createOrder(product.id, product.name, product.price, currentUser.id, product.URL)
                        gsap.to(document.getElementById(product.id), { duration: 1, ease: "power4.out", x: -2000 })
                        setTimeout(() => { document.getElementById(product.id).outerHTML = '<div></div>' }, 900)
                      }}>Add To<FaCartArrowDown color='inherit' fontSize='1.5rem' /></button>) : <div></div>
                    }
                  </div>
                </div>
              </div>
            ))
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
      }
    </div >
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer,
  cart: state.cartReducer,
  products: state.productReducer,
  loading: state.productsLoadingReducer
});

export default connect(mapStateToProps, null)(Home)