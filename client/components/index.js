/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as UserHome } from './user-home';
export { Login, Signup } from './auth-form';
export { default as AllProducts } from './AllProducts.jsx';
export { default as NewAddress } from './NewAddress.jsx';
export { default as SingleProduct } from './SingleProduct.jsx';
export {default as GuestLineItem} from './GuestLineItem.jsx'
export { default as Cart} from './Cart.jsx';
export { default as Checkout } from './Checkout.jsx';
export { default as Review } from './Review.jsx';
export { default as AddProduct } from './AddProduct.jsx';
export { default as AllOrders } from './AllOrders.jsx';
export { default as DefaultHome } from './DefaultHome.jsx';
export { default as Confirmation } from './Confirmation.jsx';
