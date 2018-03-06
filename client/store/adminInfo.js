import axios from 'axios';
import history from '../history';

const ADMIN_GET_USERS = 'ADMIN_GET_USERS';
//const ADMIN_DEL_USERS = 'ADMIN_DEL_USERS';
const ADMIN_GET_ORDERS = 'ADMIN_GET_ORDERS';
//const ADMIN_SET_ORDER = 'ADMIN_SET_ORDER';
const ADMIN_GET_PRODUCTS = 'ADMIN_GET_PRODUCTS';
//const ADMIN_ADD_PRODUCT = 'ADMIN_ADD_PRODUCT';
//const ADMIN_EDIT_PRODUCT = 'ADMIN_EDIT_PRODUCT';

const defaultInfo = {};

const adminGetUsers = users => ({ type: ADMIN_GET_USERS, users });
//const adminDelUsers = userid => ({ type: ADMIN_DEL_USERS, userid });
const adminGetOrders = orders => ({ type: ADMIN_GET_ORDERS, orders });
//const adminSetOrderStatus = order => ({ type: ADMIN_SET_ORDER, order });
const adminGetProducts = products => ({ type: ADMIN_GET_PRODUCTS, products });
//const adminAddProduct = product => ({ type: ADMIN_ADD_PRODUCT, product });
//const adminEditProduct = product => ({ type: ADMIN_EDIT_PRODUCT, product })


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

export default function (state = defaultInfo, action) {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return Object.assign({}, state, { users: action.users });
    case ADMIN_GET_PRODUCTS:
      return Object.assign({}, state, { products: action.products });
    case ADMIN_GET_ORDERS:
      return Object.assign({}, state, { orders: action.orders });
    default:
      return state;
  }
}
