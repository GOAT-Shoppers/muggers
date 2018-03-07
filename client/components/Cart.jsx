import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { default as LineItem } from './LineItem.jsx'
import { default as GuestLineItem} from './GuestLineItem.jsx'
import { fetchActiveOrder, removeLineItem, changeQuant, fetchGuestCart, deleteLineItem, updateItemQuantity, startCheckoutGuest } from '../store'

function Cart (props) {
  const { order, handleClick, handleQuantityChange, user, guestCart, deleteItem, changeQuantity, checkoutGuest, goCheckout } = props
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

    totalPrice = (Math.ceil(totalPrice * 100) / 100).toFixed(2)
  }

  if (guestCart) {
    guestCart.Total = guestCart.reduce(function (a, b) {
      return a + (b.quantity * b.price / 100)
    }, 0)

    guestCart.Total = guestCart.Total.toFixed(2)
  }
  let bool = !!(+totalPrice <= 0)

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
        userId={user.id}
        />
        <hr />
            Total: {totalPrice}

        <div>
          <button
            disabled={bool}
            onClick={goCheckout.bind(this)}
            className="btn"
          >Checkout</button>
        </div>
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
              <div>
                <button
                onClick={checkoutGuest.bind(this)}
                disabled={!guestCart.length}
                className="btn"
                >Checkout</button>
              </div>
              </div>
        </div>
      )
    }
    </div>
  )
}

export class CartLoader extends Component{


  componentDidMount() {
    this.props.fetchCart()
    this.props.loadOrder(this.props.user.id)
  }

  componentWillReceiveProps(nextProps){
    if (this.props.user.id !== nextProps.user.id){
      let id = +nextProps.user.id
      this.props.loadOrder(id)
    }
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
    loadOrder(userId) {
      dispatch(fetchActiveOrder(userId));
    },
    handleClick(lineItem) {
      dispatch(removeLineItem(lineItem));
    },
    handleQuantityChange(lineItemId, quantity, userId) {
      dispatch(changeQuant(lineItemId, quantity))
      dispatch(fetchActiveOrder(userId))
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
    checkoutGuest() {
      dispatch(startCheckoutGuest(ownProps.history))
    },
    goCheckout() {
      ownProps.history.push('/checkout')
    }
  }
}

export default connect(mapState, mapProps)(CartLoader)

Cart.propTypes = {
  order: PropTypes.object,
  //guestCart: PropTypes.array,
  user: PropTypes.object
}
