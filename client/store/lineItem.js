import axios from 'axios'

const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
const POST_LINE_ITEM = 'POST_LINE_ITEM';
const CLEAR_LINE_ITEM = 'CLEAR_LINE_ITEM'

//post lineItem for add product

const changeQuantity = (lineItem) => ({
  type: CHANGE_QUANTITY,
  lineItem
})

const clearLineItem = () => ({
  type: CLEAR_LINE_ITEM
})

const postLineItem = lineItem => ({ type: POST_LINE_ITEM, lineItem });

export const clearLineItems = () => {
  return function thunk(dispatch) {
    dispatch(clearLineItem())
  }
}

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

export const createLineItem = lineItem => dispatch => {
  axios.post('/api/lineitems', lineItem)
    .then(newLineItem => dispatch(postLineItem(newLineItem.data)))
    .catch(err => console.error('could not post line Item', err));
}

export default function (state = {}, action) {
  switch (action.type) {
    case CHANGE_QUANTITY:
      return action.lineItem;
    case POST_LINE_ITEM:
      return action.lineItem;
    case CLEAR_LINE_ITEM:
      return {}
    default:
      return state
  }
}

