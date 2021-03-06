
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import addressReducer from './addressReducer';
import lineItem from './lineItem';
import review from './review';
import order from './order';
import products from './products'
import allOrders from './allOrders'
import guestCart from './guestCart'
import adminInfo from './adminInfo'

const reducer = combineReducers({
  user,
  productReducer,
  categoryReducer,
  addressReducer,
  order,
  lineItem,
  review,
  products,
  guestCart,
  adminInfo,
  allOrders
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store
export * from './user'
export * from './order'
export * from './lineItem'
export * from './products';
export * from './allOrders'
export * from './guestCart';
export * from './adminInfo';
export * from './addressReducer';
