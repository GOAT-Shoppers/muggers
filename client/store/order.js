import axios from 'axios'

/**
 * ACTION TYPES
 **/
const GET_ONE_ORDER = 'GET_ONE_ORDER'
/**
 * INITIAL STATE
 **/
const initialState = {
  defaultOrder: {},
}

/**
 * ACTION CREATORS
 **/
const getOneOrder = order => ({
  type: GET_ONE_ORDER,
  order
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
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 **/

 export default function (state = initialState, action) {
   switch (action.type) {
     case GET_ONE_ORDER:
       return Object.assign({}, state, {
         order: action.order,
      })
    default:
      return state
   }
 }
