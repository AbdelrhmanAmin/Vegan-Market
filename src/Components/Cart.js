import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, removeOrder, cartLoadingState } from '../Actions'
import './cart.css';
import Nav from './Nav';
import { gsap } from "gsap";
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import { BsFillPlusCircleFill, BsDashCircleFill } from "react-icons/bs";

const Cart = ({ currentUser, cart, userTest = false, cartTest, productsTest = false, products, loading, loadingTest = true }) => {
  const [total, setTotal] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [imgID, setImgID] = useState(null)
  const dispatch = useDispatch()
  // if (!loadingTest) { loading = loadingTest }
  // if (cartTest) { cart = cartTest }
  // if (productsTest) { products = productsTest }
  const handleIncrease = (e, price) => {
    gsap.from(e.target, {
      scale: 1.1,
      color: '#383838',
      ease: 'power4.out'
    })
    gsap.to(e.target, {
      scale: 1,
      color: '#42ef23',
      ease: 'power4.out'
    })
    setTotal(total + price)
    setQuantity(quantity + 1)
  }
  const handleDecrease = (e, price, orderID) => {
    gsap.from(e.target, {
      scale: 0.8,
      color: '#383838',
      ease: 'power4.out'
    })
    gsap.to(e.target, {
      scale: 1,
      color: '#fa000c',
      ease: 'power4.out'
    })
    if (quantity === 0) {
      removeOrder(orderID)
      gsap.to(document.getElementById(orderID), { duration: 1, ease: "power4.out", rotation: 360, scale: 0 })
      setTimeout(() => { document.getElementById(orderID).remove() }, 800)
    }
    if (quantity > 0) {
      setQuantity(quantity - 1)
      setTotal(total - price)
    }
  }
  useEffect(() => {
    setTotal(cart.reduce((sum, p) => { return sum + p.product_price }, 0))
    if (currentUser && currentUser.image !== null) {
      setImgID(`Vegan-Market/${currentUser.image.match(/[A-Za-z0-9]{20,}(?=(\.jpg|.png|.gif))/gi)[0]}`)
    } else {
      setImgID('Vegan-Market/placeholder_bzklm5')
    }
    dispatch(cartLoadingState())
  }, [])

  useEffect(() => {
    setTotal(cart.reduce((sum, p) => { return sum + p.product_price }, 0))
    if (currentUser && currentUser.image !== null) {
      setImgID(`Vegan-Market/${currentUser.image.match(/[A-Za-z0-9]{20,}(?=(\.jpg|.png|.gif))/gi)[0]}`)
    } else {
      setImgID('Vegan-Market/placeholder_bzklm5')
    }
    dispatch(cartLoadingState())
    if (!loading) {
      gsap.from('.box', {
        duration: 2,
        y: -2500,
        delay: 0.5,
        stagger: 0.2,
        ease: "power4.out",
        force3D: true
      });
      gsap.from('.info-div', {
        duration: 0.8,
        y: -2500,
        delay: 0.5,
        stagger: 0.2,
        ease: "power4.out",
        force3D: true
      });
    }
  }, [loading])
  return (
    <div>
      <Nav userTest={userTest} />
      {loading ? <img src='https://cdn.dribbble.com/users/451713/screenshots/3853529/_____.gif' className='gif-loading' alt='gif-loading' /> :
        <main className='cart-container'>
          <div className='total' data-testid='total'>
            <strong >Total:</strong> {total}$
            </div>
          <section className='user-profile-section'>
            <CloudinaryContext cloudName='abdoamin' >
              <Image publicId={imgID} >
                <Transformation height="200" width="200" gravity="face" crop="thumb" />
              </Image>
            </CloudinaryContext >
            <h2>{currentUser.name}</h2>
          </section>
          <section className='orders-flex' data-testid='orders-container'>
            {
              cart.map((order) => {
                return (
                  <div className='order-container' data-testid={`order-container${order.id}`} id={order.id} key={order.id} >
                    <div className='info-div'>
                      <h3 data-testid={`name${order.id}`}>{order.product_name}</h3>

                      <div className='remove-container'>
                        <div className='empty-bg'></div>
                        <button className='remove' data-testid={`remove${order.id}`} onClick={() => {
                          setTotal(total - order.product_price)
                          removeOrder(order.id)
                          gsap.to(document.getElementById(order.id), { duration: 1, ease: "power4.out", rotation: 360, scale: 0 })
                          setTimeout(() => { document.getElementById(order.id).remove() }, 800)
                        }}>x </button>
                      </div>
                    </div>

                    <div className='order-flex box'>
                      <div className='overlay'></div>
                      <p className='price' data-testid={`price${order.id}`}>{order.product_price}$</p>
                      <div className='order-img-div'>
                        <img src={order.product_URL} alt='URL' width='250' height='250' />
                      </div>
                      <div className='buttons-container'>
                        <BsDashCircleFill fontSize='1.8rem' className='removeBtn' onClick={(e) => handleDecrease(e, order.product_price, order.id)} />
                        <strong>{quantity}</strong>
                        <BsFillPlusCircleFill fontSize='1.8rem' className='addBtn' onClick={(e) => handleIncrease(e, order.product_price)} />
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </section>
        </main>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer,
  cart: state.cartReducer,
  products: state.productReducer,
  loading: state.productsLoadingReducer
});

export default connect(mapStateToProps, null)(Cart)