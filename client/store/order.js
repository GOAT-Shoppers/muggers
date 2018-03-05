import axios from 'axios'

/**
 * ACTION TYPES
 **/
const GET_ONE_ORDER = 'GET_ONE_ORDER'
const LOADING = 'LOADING'

const DELETE_LINE_ITEM = 'DELETE_LINE_ITEM'
const CHECK_OUT = 'CHECK_OUT'
/**
 * INITIAL STATE
 **/
const initialState = {
  defaultOrder: {},
  defaultLoading: true,
  order: {}
}

/**
 * ACTION CREATORS
 **/
const getOneOrder = order => ({
  type: GET_ONE_ORDER,
  order
})

const loading = status => ({
  type: LOADING,
  loading: status
})

const deleteLineItem = (order) => ({
  type: DELETE_LINE_ITEM,
  order
})

const checkout = (order) => ({
  type: CHECK_OUT,
  order
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
      .then(orderWithLineItems =>
        dispatch(getOneOrder(orderWithLineItems || initialState.defaultOrder)))
      .then(() => dispatch(loading(true)))
      .catch(err => console.log(err))
  }
}

export const checkoutOrder = (orderId) => {
  let status = {
    status: 'checkedOut'
  }
  return function thunk(dispatch) {
    axios.put(`/api/orders/${orderId}`, status)
      .then(order => order.data)
      .then(orderData => {
        console.log(orderData)
        return dispatch(checkout(orderData)
      )})
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

/**
 * REDUCER
 **/

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ONE_ORDER:
      return action.order
    case DELETE_LINE_ITEM:
      return action.order
    case CHECK_OUT:
      return action.order
    default:
      return state
   }
 }
