import axios from 'axios'

const GET_ONE_ORDER = 'GET_ONE_ORDER'
const DELETE_LINE_ITEM = 'DELETE_LINE_ITEM'
const CHECK_OUT = 'CHECK_OUT'
const GET_ACTIVE_ORDER = 'GET_ACTIVE_ORDER'
const UNLOAD_ORDER = 'UNLOAD_ORDER'

const getOneOrder = order => ({
  type: GET_ONE_ORDER,
  order
})

const deleteLineItem = (order) => ({
  type: DELETE_LINE_ITEM,
  order
})

const checkout = (order) => ({
  type: CHECK_OUT,
  order
})

const getActiveOrder = order => ({
  type: GET_ACTIVE_ORDER,
  order
})

const unloadOrder = () => ({
  type: UNLOAD_ORDER
})

/**
 * THUNK CREATORS
 **/
// All this does is get an order by orderId from the backend.
const orderGetter = (orderId) =>
  {
    return axios.get(`/api/orders/${orderId}`)
      .then(order => order.data)
  }

export const fetchOrder = (orderId) => {
  return function thunk(dispatch){
    orderGetter(orderId)
      .then(orderWithLineItems => dispatch(getOneOrder(orderWithLineItems || {})))
      .catch(err => console.log(err))
  }
}

export const fetchActiveOrder = (userId) => {
  return function thunk(dispatch){
    return axios.get(`/api/users/${userId}/cart`)
      .then(order => order.data)
      .then(orderData => {
        dispatch(getActiveOrder(orderData))})
      .catch(err => console.log(err))
  }
}

export const checkoutOrder = (orderId, history) => {
  let status = {
    status: 'checkedOut'
  }
  return function thunk(dispatch) {
    axios.put(`/api/orders/${orderId}`, status)
      .then(order => order.data)
      .then(orderData => {
        dispatch(checkout(orderData))
        history.push('/orderconfirmation')
      })
      .catch(err => console.log(err))
  }
}

export const removeLineItem = (lineItemId) => {
  return function thunk(dispatch){
    return axios.get(`/api/lineitems/${lineItemId}`)
      .then((lineItem) => {
        let orderId = lineItem.data.orderId
        axios.delete(`/api/lineitems/${lineItemId}`)
          .then(() => {
            orderGetter(orderId)
              .then(order => dispatch(deleteLineItem(order)))
              .catch(err => console.log(err))
          })
      })
      .catch(err => console.log(err))
  }
}

export const unloadOrderFromState = () => {
  return function thunk (dispatch) {
    return dispatch(unloadOrder())
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ONE_ORDER:
      return action.order
    case DELETE_LINE_ITEM:
      return action.order
    case CHECK_OUT:
      return action.order
    case GET_ACTIVE_ORDER:
      return action.order
    case UNLOAD_ORDER:
      return {}
    default:
      return state
   }
 }
