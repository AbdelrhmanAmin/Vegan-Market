import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, logOut } from '../Actions'
const Home = ({ currentUser, cart, products }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders(currentUser.id))
    dispatch(fetchProducts())
  }, [currentUser])
  return (
    <div>
      <h1>Hello, {currentUser.name}.</h1>
      <button onClick={() => dispatch(logOut())}>Logout</button>
      {
        products.length > 0 ? (
          products.map((product) => (
            <div>
              <h3>{product.product_name}</h3>
              <p>{product.product_price}$</p>
              <p>{product.product_quantity}</p>
              {
                switch(product.product_name){
                  case:
                }
              }
            </div>
          ))
        ) : null
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer,
  cart: state.cartReducer,
  products: state.productReducer
});

export default connect(mapStateToProps, null)(Home)