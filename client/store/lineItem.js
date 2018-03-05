import axios from 'axios'

const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

const initialState = {
  defaultLineItem: {}
}

const changeQuantity = (lineItem) => ({
  type: CHANGE_QUANTITY,
  lineItem
})

export const changeQuant = (lineItemId, quantity) => {
  return function thunk(dispatch) {
    let quant = {
      quantity: quantity
    }
    return axios.put(`/api/lineitems/${lineItemId}`, quant)
      .then(lineItem => lineItem.data)
      .then(lineItemData => dispatch(changeQuantity(lineItemData)))
      .catch(err => console.log(err))
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_QUANTITY:
      return action.lineItem
    default:
      return state
  }
}

