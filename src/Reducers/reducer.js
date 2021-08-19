import { combineReducers } from 'redux';

const user = ''
const cart = []
const products = []
const err_msg = ""
const loading = true

function errorReducer(state = err_msg, action) {
  switch (action.type) {
    case 'ERROR':
      return action.msg;
    default:
      return state;
  }
}

function userReducer(state = user, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    default:
      return state;
  }
}

function cartReducer(state = cart, action) {
  switch (action.type) {
    case 'CART_SUCCESS':
      return action.orders;
    default:
      return state;
  }
}

function productReducer(state = products, action) {
  switch (action.type) {
    case 'PRODUCTS_SUCCESS':
      return action.products;
    default:
      return state;
  }
}
function loadingReducer(state = loading, action) {
  switch (action.type) {
    case 'PRODUCTS_SUCCESS':
      return action.loading;
    case 'SET_LOADING':
      return true;
    default:
      return state;
  }
}


const reducers = {
  userReducer, cartReducer, productReducer, errorReducer, loadingReducer
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('token');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;