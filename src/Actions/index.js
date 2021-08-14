import decode from 'jwt-decode';
const API = 'https://powerful-everglades-09026.herokuapp.com/'
export const logIn = (user) => ({
  type: 'LOGIN',
  user,
})

export const logOut = () => ({
  type: 'LOGOUT'
})

export const error = (msg) => ({
  type: 'ERROR',
  msg
})

export const cartSuccess = (orders) => ({
  type: 'CART_SUCCESS',
  orders
})

export const productSuccess = (products, payload) => ({
  type: 'PRODUCTS_SUCCESS',
  products,
  payload,
})

export const createOrder = (productId, userId) => {
  fetch(`${API}orders`, {
    method: 'post',
    body: JSON.stringify({ product_id: productId, user_id: userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
}

export const fetchOrders = (userId) => (dispatch) => {
  fetch(`${API}orders`).then((res) => res.json())
    .then((orders) => {
      let ordered = {}
      for (let order of orders) {
        if (order.user_id === userId) {
          ordered[order.product_id] = order
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

export const createUser = (name, email, password) => (dispatch) => {
  fetch(`${API}users`, {
    method: 'post',
    body: JSON.stringify({ name, email, password }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => res.json())
    .then((response) => {
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