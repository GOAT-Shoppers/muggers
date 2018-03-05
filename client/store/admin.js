import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const ADMIN_GET_USERS = 'ADMIN_GET_USERS';
const ADMIN_DEL_USERS = 'ADMIN_DEL_USERS';
const ADMIN_GET_ORDERS = 'ADMIN_GET_ORDERS';
const ADMIN_SET_ORDER = 'ADMIN_SET_ORDER';
const ADMIN_GET_PRODUCTS = 'ADMIN_GET_PRODUCTS';
const ADMIN_ADD_PRODUCT = 'ADMIN_ADD_PRODUCT';
const ADMIN_EDIT_PRODUCT = 'ADMIN_EDIT_PRODUCT';

/**
 * INITIAL STATE
 */
const defaultInfo = {};
/**
 * ACTION CREATORS
 */
const adminGetUsers = users => ({ type: ADMIN_GET_USERS, users });
const adminDelUsers = userid => ({ type: ADMIN_DEL_USERS, userid });
const adminGetOrders = orders => ({ type: ADMIN_GET_ORDERS, orders });
const adminSetOrder = order => ({ type: ADMIN_SET_ORDER, order });
const adminGetProducts = products => ({ type: ADMIN_GET_PRODUCTS, products });
const adminAddProduct = product => ({ type: ADMIN_ADD_PRODUCT, product });
const adminEditProduct = product => ({ type: ADMIN_EDIT_PRODUCT, product });

/**
 * THUNK CREATORS
 */
//need to make this route in our backend with status
export const adminSetOrderStatus = (id, value) => dispatch =>
  axios
    .put('/api/orders/' + id, { status: value })
    .then(res => dispatch(adminSetOrderStatus(res.data)))
    .catch(err => console.err(err))


export const admitGetUser = () => dispatch =>
  axios
    .get('/api/users')
    .then(res =>
      dispatch(adminGetUsers(res.data)))
    .catch(err => console.log(err))

export const admitGetProduct = () => dispatch =>
  axios
    .get('/api/products')
    .then(res =>
      dispatch(adminGetProducts(res.data)))
    .catch(err => console.log(err))

export const admitGetOrder = () => dispatch =>
  axios
    .get('/api/orders')
    .then(res =>
      dispatch(adminGetOrders(res.data)))
    .catch(err => console.log(err))


export const adminEditProducts = product => dispatch => {
  const newProduct = {
    name: product.name,
    description: product.description,
    price: product.price,
    photos: product.photos,
    stock: product.stock
  }
  return axios
    .put('/api/products/' + product.id, newProduct)
    .then(res => dispatch(adminEditProduct(product)))
    .catch(err => console.err(err))
}


/**
 * REDUCER
 */
export default function (state = defaultInfo, action) {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return Object.assign({}, state, { users: action.users });
    case ADMIN_GET_PRODUCTS:
      return Object.assign({}, state, { products: action.products });
    case ADMIN_GET_ORDERS:
      return Object.assign({}, state, { orders: action.orders });
    case ADMIN_SET_ORDER:
      return Object.assign({}, state, { orders: state.orders.map(order => (order.id === action.order.id ? action.order : order))})
    case ADMIN_DEL_USERS:
      return Object.assign({}, state, {
        users: state.users.filter(user => user.id !== action.userid)});
    case ADMIN_ADD_PRODUCT:
      return Object.assign({}, state, { products: state.products.concat(action.product) })
    case ADMIN_EDIT_PRODUCT:
      return Object.assign({}, state, { products: state.products.map(p => (action.product.id == p.id ? action.product : p)) })
    default:
      return state;
      }
}
