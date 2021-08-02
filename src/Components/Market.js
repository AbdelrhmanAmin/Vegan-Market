import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, createOrder } from '../Actions';
import Product from './Product';
import './market.css';
import './home.css';
import { FaCartArrowDown } from "react-icons/fa";

import {
  Link, useHistory
} from 'react-router-dom';
import Nav from './Nav';

const Home = ({ currentUser, cart, products }) => {
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
                    }}><strong style={{
                      background: 'white',
                      color: '#ff9500',
                    }}>READ MORE </strong></Link></span> : <span>{product.description}</span>
                  }
                  {
                    cart[product.id] === undefined ? (<button className='cart-off' id={product.id} onClick={() => {
                      createOrder(product.id, currentUser.id)
                      document.getElementById(product.id).outerHTML = '<div></div>'
                    }}>Add To<FaCartArrowDown color='inherit' fontSize='1.5rem' /></button>) : <div></div>
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
    </div >
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer,
  cart: state.cartReducer,
  products: state.productReducer
});

export default connect(mapStateToProps, null)(Home)