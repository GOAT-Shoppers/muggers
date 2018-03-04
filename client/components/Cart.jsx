import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {default as LineItem} from './LineItem.jsx'

// props is all props
export const Cart = (props) => {

  // HTML Component
  return (
    <div>
      <h1>{props.email}'s Shopping Cart</h1>
      <hr />
      <div className="cartContainer">
        <div className="lineItemName">Item</div>
        <div className="lineItemPriceQuantity">Price</div>
        <div className="lineItemPriceQuantity">Quantity</div>
      </div>
      <hr />
      <LineItem />
      <hr />
      <button>Checkout</button>
    </div>
  )
}

export const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Cart)

Cart.propTypes = {
  email: PropTypes.string
}
