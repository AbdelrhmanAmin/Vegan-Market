import decode from 'jwt-decode';
const API = 'http://127.0.0.1:4000/'
// const API = 'https://stormy-journey-83565.herokuapp.com/'


export const logIn = (user) => ({
  type: 'LOGIN',
  user,
})

export const logOut = () => ({
  type: 'LOGOUT'
})

export const error = (msg) => ({
  type: 'ERROR',
  msg,
})

export const cartSuccess = (orders) => ({
  type: 'CART_SUCCESS',
  orders
})

export const productSuccess = (products) => ({
  type: 'PRODUCTS_SUCCESS',
  products,
})

export const loadingState = () => ({
  type: 'SET_PRODUCT_LOADING',
})
export const userLoadingState = () => ({
  type: 'SET_USER_LOADING',
})

export const createOrder = (productId, productName, productPrice, userId) => {
  fetch(`${API}orders`, {
    method: 'post',
    body: JSON.stringify({ product_id: productId, product_name: productName, product_price: productPrice, user_id: userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
}

export const fetchOrders = (userId) => (dispatch) => {
  fetch(`${API}orders`).then((res) => res.json())
    .then((orders) => {
      let ordered = []
      for (let order of orders) {
        if (order.user_id === userId) {
          ordered.push(order)
        }
      }
      dispatch(cartSuccess(ordered))
    })
    .catch((err) => { throw Error(`Error: ${err}`); });
}

export const removeOrder = (orderId) => {
  fetch(`${API}orders/${orderId}`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
}

export const fetchProducts = () => (dispatch) => {
  fetch(`${API}products`).then((res) => res.json())
    .then((products) => {
      dispatch(productSuccess(products, false))
    })
}

export const createUser = (formData) => (dispatch) => {
  console.log({ name: formData.get('name'), email: formData.get('email'), password: formData.get('password'), image: formData.get('image') })
  fetch(`${API}users`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      console.log(response)
      if (response.message) {
        dispatch(error(response.message))
      }
      if (response.user) {
        localStorage.setItem('token', response.user.token)
        let data = decode(response.user.token);
        let exp = data.exp * 1000
        if (new Date(exp) <= new Date()) {
          localStorage.removeItem('token')
          data = null;
          exp = null;
          return
        }
        dispatch(logIn(data))
      }
    })
    .catch((err) => { throw Error(`Error: ${err}`); });
}

export const fetchUser = (email, password) => (dispatch) => {
  fetch(`${API}sessions`, {
    method: 'post',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => res.json())
    .then((response) => {
      console.log(response)
      if (response.message) {
        dispatch(error(response.message))
      }
      if (response.user) {
        localStorage.setItem('token', response.user.token)
        let data = decode(response.user.token);
        let exp = data.exp * 1000
        if (new Date(exp) <= new Date()) {
          localStorage.removeItem('token')
          data = null;
          exp = null;
          return
        }
        dispatch(error(''))
        dispatch(logIn(data))
      }
    })
    .catch((err) => { throw Error(`Error: ${err}`); });
}

export const uploadImg = (file, id) => {
  fetch(`https://api.cloudinary.com/v1_1/abdoamin/upload`, {
    method: "POST",
    body: file
  }).then(res => res.json())
    .then(image => patchImg(image, id))
}
export const patchImg = (image, id) => {
  fetch(`${API}users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ image }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => console.log(res))
}