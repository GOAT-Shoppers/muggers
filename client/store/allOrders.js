import axios from 'axios'

const LOAD_ALL_ORDERS = 'LOAD_ALL_ORDERS';
const UNLOAD_ALL_ORDERS = 'UNLOAD_ALL_ORDERS'

const loadAllOrders = (allOrders) => ({
  type: LOAD_ALL_ORDERS,
  allOrders
})

const unloadAllOrders = () => ({
  type: UNLOAD_ALL_ORDERS,
  allOrders: []
})

export const fetchAllOrders = () => {
  return function thunk(dispatch) {
    axios.get(`/api/orders`)
      .then(orders => orders.data)
      .then(orderData =>
        dispatch(loadAllOrders(orderData || [])))
      .catch(err => console.log(err))
  }
}

export const unfetchAllOrders = () => {
  return function thunk(dispatch) {
    dispatch(unloadAllOrders())
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case LOAD_ALL_ORDERS:
      return action.allOrders
    case UNLOAD_ALL_ORDERS:
      return action.allOrders
    default:
      return state
  }
}
