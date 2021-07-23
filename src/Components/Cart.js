import React, { useEffect, useState } from 'react';
import {
  Link, useHistory
} from 'react-router-dom';
import Product from './Product';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, removeOrder, logOut } from '../Actions'
import './cart.css';
import { FaCartArrowDown } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { BsArrowRepeat } from "react-icons/bs";
import logo from '../assets/logo.png'

const Cart = ({ currentUser, cart, products }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [productX, setProduct] = useState(0)
  let total = 0
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
      <div className='orders-flex'>
        {
          Object.keys(cart).map((key) => {
            total += products[key * 1 - 1].price
            return (
              <div id={key} className='order-flex'>
                <div className='order-img-div'>
                  <p>{products[key * 1 - 1].price}$</p>
                  <img src={products[key * 1 - 1].URL} alt='URL' width='250' height='250' />
                </div>
                <div className='order-desc'>
                  <h3>{products[key * 1 - 1].name}</h3>
                  {
                    products[key * 1 - 1].description.length > 160 ? <span>{products[key * 1 - 1].description.substring(0, 140)}...<Link onClick={() => {
                      setVisible(true)
                      setProduct(products[key * 1 - 1])
                    }}>read more</Link></span> : <span>{products[key * 1 - 1].description}</span>
                  }
                </div>
                <button onClick={() => {
                  removeOrder(cart[key].id)
                  document.getElementById(key).remove()
                  document.querySelector('#total').remove()
                  let show = document.querySelector('#refresh');
                  show.style.display = 'block'
                }}>x </button>
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

        <strong id='total' className='total'>Total: {total}$</strong>
        <strong id='refresh' className='total' onClick={() => history.go(0)}><BsArrowRepeat /></strong>

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