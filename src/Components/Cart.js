import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchOrders, fetchProducts, removeOrder } from '../Actions'
import './cart.css';
import Nav from './Nav';
import { gsap } from "gsap";
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';

const Cart = ({ currentUser, cart, userTest = false, cartTest, productsTest = false, products, loading, loadingTest = false }) => {
  const [total, setTotal] = useState(0)
  const [imgID, setImgID] = useState(null)
  const dispatch = useDispatch()
  if (!loadingTest) { loading = loadingTest }
  if (cartTest) { cart = cartTest }
  if (productsTest) { products = productsTest }
  useEffect(() => {
    if (!userTest) {
      dispatch(fetchOrders(currentUser.id))
      dispatch(fetchProducts())
      if (currentUser && currentUser.image !== null) {
        setImgID(`Vegan-Market/${currentUser.image.match(/[A-Za-z0-9]{20,}(?=(\.jpg|.png|.gif))/gi)[0]}`)
      } else {
        setImgID('Vegan-Market/placeholder_bzklm5')
      }
    }
    setTotal(cart.reduce((sum, p) => { return sum + p.product_price }, 0))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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