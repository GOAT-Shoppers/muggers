import axios from 'axios'

const GET_GUEST_CART = 'GET_GUEST_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const START_CHECKOUT_GUEST = 'START_CHECKOUT_GUEST'
// const CHECKOUT_GUEST_CART = 'CHECKOUT_GUEST_CART'

const getGuestCart = cart => ({
  type: GET_GUEST_CART,
  cart
})

const deleteItem = cart => ({
  type: DELETE_ITEM,
  cart
})

const updateItem = cart => ({
  type: UPDATE_ITEM,
  cart
})

// const checkoutGuestCart = cart => ({
//   type: CHECKOUT_GUEST_CART,
//   cart
// })

const startGuestCheckout = cart => ({
  type: START_CHECKOUT_GUEST,
  cart
})

export const fetchGuestCart = () => {
  return function thunk(dispatch){
    return axios.get(`/api/cart`)
      .then(cart => cart.data)
      .then(cartData => dispatch(getGuestCart(cartData)))
      .catch(err => console.log(err))
  }
}

export const deleteLineItem = (productId) => {
  return function thunk(dispatch) {
    return axios.delete(`/api/cart/${productId}`)
      .then(cart => cart.data)
      .then(cartData => dispatch(deleteItem(cartData)))
      .then(err => console.log(err))
  }
}

export const updateItemQuantity = (productId, quantity) => {
  return function thunk(dispatch) {
    return axios.put(`/api/cart/${productId}`, {quantity: quantity * 1})
      .then(cart => cart.data)
      .then(cartData => dispatch(updateItem(cartData)))
      .then(err => console.log(err))
  }
}

export const startCheckoutGuest = (history) => {
  return function thunk(dispatch) {
    return axios.get(`/api/cart`)
      .then(cart => cart.data)
      .then(cartData => {
        dispatch(startGuestCheckout(cartData))
        history.push(`/checkout`)
      })
      .catch(err => console.log(err))
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case GET_GUEST_CART:
      return action.cart
    case DELETE_ITEM:
      return action.cart
    case UPDATE_ITEM:
      return action.cart
    case START_CHECKOUT_GUEST:
      return action.cart
    default:
      return state
  }
}
