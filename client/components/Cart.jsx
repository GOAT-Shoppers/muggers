import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {default as LineItem} from './LineItem.jsx'
import { fetchOrder, removeLineItem, checkoutOrder } from '../store'

function Cart (props) {
  const { order, loading, handleClick, handleCheckout } = props

  if (order.lineItems){
    var lineItems = order.lineItems
    var totalPrice = lineItems.map((lineItem) => lineItem.getTotal * 1).reduce(function (a, b) {
      return a + b
    }, 0)

    totalPrice = Math.ceil(totalPrice * 100) / 100
  }
  return (
    <div>
      <h1>Your Cart</h1>
      <hr />
      <div className="cartContainer">
        <div className="lineItemName">Item</div>
        <div className="lineItemPriceQuantity">Price</div>
        <div className="lineItemPriceQuantity">Quantity</div>
      </div>
      <hr />
      <LineItem
      loading={loading}
      lineItems={lineItems}
      clickHandle={handleClick} />
      <hr />
      Total: {totalPrice}
      <button
        onClick={handleCheckout.bind(this, order.id)}
      >Checkout</button>
    </div>
  )
}

export class CartLoader extends Component{
  componentDidMount() {
    // Hard coded in orderId until we finish authorization
    let orderId = 3
    this.props.loadOrder(orderId)
  }

  render() {
    return (
      <Cart {...this.props} />
    )
  }
}

export const mapState = (state) => {
  return {
    order: state.order,
    lineItems: state.order.lineItems
  }
}

const mapProps = function (dispatch) {
  return {
    loadOrder(orderId) {
      dispatch(fetchOrder(orderId));
    },
    handleClick(lineItem) {
      dispatch(removeLineItem(lineItem));
    },
    handleCheckout(orderId) {
      dispatch(checkoutOrder(orderId))
    }
  }
}

export default connect(mapState, mapProps)(CartLoader)

Cart.propTypes = {
  order: PropTypes.object,
  loading: PropTypes.bool
}
