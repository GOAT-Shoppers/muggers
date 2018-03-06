import axios from 'axios';
import history from '../history';

const ADMIN_GET_USERS = 'ADMIN_GET_USERS';
const ADMIN_DEL_USERS = 'ADMIN_DEL_USERS';
const ADMIN_GET_ORDERS = 'ADMIN_GET_ORDERS';
const ADMIN_GET_PRODUCTS = 'ADMIN_GET_PRODUCTS';
const ADMIN_ADD_PRODUCT = 'ADMIN_ADD_PRODUCT';
const ADMIN_EDIT_PRODUCT = 'ADMIN_EDIT_PRODUCT';

const defaultInfo = {};

const adminGetUsers = users => ({ type: ADMIN_GET_USERS, users });
const adminDelUsers = userid => ({ type: ADMIN_DEL_USERS, userid });
const adminGetOrders = orders => ({ type: ADMIN_GET_ORDERS, orders });
const adminGetProducts = products => ({ type: ADMIN_GET_PRODUCTS, products });
const adminAddProduct = product => ({ type: ADMIN_ADD_PRODUCT, product });
const adminEditProduct = product => ({ type: ADMIN_EDIT_PRODUCT, product })


export const adminGetInfo = () => dispatch =>
  Promise.all([
    axios.get('/api/users'),
    axios.get('/api/products'),
    axios.get('/api/orders')
  ])
    .then(([res1, res2, res3]) => {
      dispatch(adminGetUsers(res1.data || []))
      dispatch(adminGetProducts(res2.data || []))
      dispatch(adminGetOrders(res3.data || []))
    })
    .catch(err => console.err(err));

export const adminDelUser = id => dispatch =>
  axios
    .delete(`/api/users/ ${id} `)
    .then(res => dispatch(adminDelUsers(res.data)))
    .catch(err => console.err(err));


export const adminAddProducts = product => dispatch => {
  return axios
    .post("/api/products/", product)
    .then(res => dispatch(adminAddProduct(res.data)))
    .catch(err => console.err(err))
}

export const adminEditProducts = product => dispatch => {
  return axios
    .put(`/api/products/${product.id}`, product)
    .then(res => dispatch(adminEditProduct(res.data)))
    .catch(err => console.err(err))
}

export default function (state = defaultInfo, action) {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return Object.assign({}, state, { users: action.users });
    case ADMIN_GET_PRODUCTS:
      return Object.assign({}, state, { products: action.products });
    case ADMIN_GET_ORDERS:
      return Object.assign({}, state, { orders: action.orders });
    case ADMIN_DEL_USERS:
      return Object.assign({}, state, {
        users: state.users.filter(u => u.id != action.userid)
      });
    case ADMIN_ADD_PRODUCT:
      return Object.assign({}, state, { products: state.products.concat(action.product) })
    case ADMIN_EDIT_PRODUCT:
      return Object.assign({}, state, { products: state.products.map(p => (action.product.id == p.id ? action.product : p)) })
    default:
      return state;
  }
}
