import axios from 'axios'

/**
 * ACTION TYPES
 **/
const GET_ONE_ORDER = 'GET_ONE_ORDER'
const LOADING = 'LOADING'
/**
 * INITIAL STATE
 **/
const initialState = {
  defaultOrder: {},
  defaultLoading: true
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

/**
 * THUNK CREATORS
 **/
export const fetchOrder = (orderId) => {
  return function thunk(dispatch){
    return axios.get(`/api/orders/${orderId}`)
      .then(order => order.data)
      .then(orderWithLineItems =>
        dispatch(getOneOrder(orderWithLineItems || initialState.defaultOrder)))
      .then(() => dispatch(loading(true)))
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
    default:
      return state
   }
 }
