import decode from 'jwt-decode';

export const logIn = (user) => ({
  type: 'LOGIN',
  user,
})

export const logOut = () => ({
  type: 'LOGOUT'
})

export const cartSuccess = (orders) => ({
  type: 'CART_SUCCESS',
  orders
})

export const productSuccess = (products) => ({
  type: 'PRODUCTS_SUCCESS',
  products
})

export const createOrder = (productId, userId) => {
  fetch(`${process.env.REACT_APP_API}orders`, {
    method: 'post',
    body: JSON.stringify({ product_id: productId, user_id: userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
}

export const fetchProducts = () => (dispatch) => {
  fetch(`${process.env.REACT_APP_API}products`).then((res) => res.json())
    .then((products) => {
      dispatch(productSuccess(products))
    })
}

export const fetchOrders = (userId) => (dispatch) => {
  fetch(`${process.env.REACT_APP_API}orders`).then((res) => res.json())
    .then((orders) => {
      let ordered = []
      for (let order of orders) {
        if (order.user_id === userId) {
          ordered.push(order)
        }
      }
      console.log(ordered)
      dispatch(cartSuccess(ordered))
    })
    .catch((err) => { throw Error(`Error: ${err}`); });
}

export const createUser = (name, email, password) => (dispatch) => {
  fetch(`${process.env.REACT_APP_API}users`, {
    method: 'post',
    body: JSON.stringify({ name, email, password }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => res.json())
    .then((response) => {
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
  fetch(`${process.env.REACT_APP_API}sessions`, {
    method: 'post',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => res.json())
    .then((response) => {
      console.log(response)
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