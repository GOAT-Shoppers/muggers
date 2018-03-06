import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {default as LineItem} from './LineItem.jsx'
import { default as GuestLineItem} from './GuestLineItem.jsx'
import { fetchOrder, removeLineItem, checkoutOrder, changeQuant, fetchGuestCart, deleteLineItem, updateItemQuantity, startCheckoutGuest } from '../store'

function Cart (props) {
  const { order, handleClick, handleCheckout, handleQuantityChange, user, guestCart, deleteItem, changeQuantity, checkoutGuest } = props
  /*
  If there is a user logged in on the state, get their cart from the database
  else if they are a guest:
    hit the backend route that tells us their cart that is on the session
    pray
  */

  if (order.lineItems){
    var lineItems = order.lineItems
    var totalPrice = lineItems.map((lineItem) => lineItem.getTotal * 1).reduce(function (a, b) {
      return a + b
    }, 0)

    totalPrice = Math.ceil(totalPrice * 100) / 100
  }

  if (guestCart) {
    guestCart.Total = guestCart.reduce(function (a, b) {
      return a + (b.quantity * b.price / 100)
    }, 0)

    guestCart.Total = guestCart.Total.toFixed(2)
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


    {
      user.id ?
      <div>
        <LineItem
        lineItems={lineItems}
        clickHandle={handleClick}
        quantChangeHandle={handleQuantityChange}
        />
        <hr />
        Total: {totalPrice}

        <button
          onClick={handleCheckout.bind(this, order.id)}
        >Checkout</button>
      </div> : (
        <div>
          {
            guestCart.length >= 1 ?
            <GuestLineItem
            lineItems={guestCart}
            clickHandle={deleteItem}
            changeHandle={changeQuantity}
             />

            :
            <h1>Your cart is empty. Add something!</h1>
          }
          <hr />
              Total: {guestCart.Total ? <span>{guestCart.Total}</span> : <span>0</span> }
              <div>
              <button
              onClick={checkoutGuest.bind(this)}
              >Checkout</button>
              </div>
        </div>
      )
    }
    </div>
  )
}

export class CartLoader extends Component{
  componentDidMount() {
    // Hard coded in orderId until we finish authorization
    let orderId = 3
    this.props.loadOrder(orderId)
    this.props.fetchCart()

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
    user: state.user,
    guestCart: state.guestCart
  }
}

const mapProps = function (dispatch, ownProps) {
  return {
    loadOrder(orderId) {
      dispatch(fetchOrder(orderId));
    },
    handleClick(lineItem) {
      dispatch(removeLineItem(lineItem));
    },
    handleCheckout(orderId) {
      dispatch(checkoutOrder(orderId, ownProps.history))
    },
    handleQuantityChange(lineItemId, quantity, orderId) {
      dispatch(changeQuant(lineItemId, quantity))
      dispatch(fetchOrder(orderId))
    },
    fetchCart() {
      dispatch(fetchGuestCart())
    },
    deleteItem(productId) {
      dispatch(deleteLineItem(productId))
    },
    changeQuantity(productId, quantity) {
      dispatch(updateItemQuantity(productId, quantity))
    },
    // Why is it spamming GET?
    checkoutGuest() {
      dispatch(startCheckoutGuest(ownProps.history))
    }
  }
}

export default connect(mapState, mapProps)(CartLoader)

Cart.propTypes = {
  order: PropTypes.object,
  guestCart: PropTypes.array
}
