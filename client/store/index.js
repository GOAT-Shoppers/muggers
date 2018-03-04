import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import addressReducer from './addressReducer';

const reducer = combineReducers({
  user,
  productReducer,
  categoryReducer,
  addressReducer
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
