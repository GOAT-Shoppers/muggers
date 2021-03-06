import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NewAddress from './NewAddress.jsx'
import { checkoutOrder, updatingProduct, checkoutGuestOrder } from '../store'
import { Link } from 'react-router-dom'


let addresses = [{ id: 1, fullAddress: "5 Hanover Square New York, NY 12346" }, { id: 2, fullAddress: "1950 Putnam Ave Queens, NY 12345" }, { id: 3, fullAddress: "346 Lean On Me Ave Ridgewood, NY 28445" }, { id: 4, fullAddress: "1625 New Here St Brooklyn, NY 12345" }]


function CheckoutComponent(props) {

  let order;
  const { user, handleUserCheckout, lineItems, allProducts, handleGuestCheckout, guestCart } = props

  if (user.id) {
    order = props.order
  } else {
    order = props.guestCart
  }

  return (
    <div>
      {
        user.id ? (
          <div>
            Loggedin View
            <div>Email: {user.email}</div>
            {
              // Can't make these radios unique without knowing what the state is like for user/addresses
              addresses.map((address) => {
                return (
                  <label
                    key={address.id}
                    className="genericBackground">
                    <input type="radio" value="option2" />
                    {address.fullAddress}
                  </label>
                )
              })
            }
          </div>
        ) : (
            <div>
              Guest View
        <form>
                <label>
                  Email: <input type="text" name="email" />
                </label>

                <label>
                  First Name: <input type="text" name="firstName" />
                </label>

                <label>
                  Last Name: <input type="text" name="lastName" />
                </label>
              </form>


            </div>)
      }

      <div>Add Address</div>
      <NewAddress />

      <div>
        {user.id ?
          <button
            onClick={handleUserCheckout.bind(this, order.id, lineItems, allProducts)}
          >Complete Checkout</button> :
          <button
            onClick={handleGuestCheckout.bind(this, guestCart, { email: 'mimi@test.com', address: '123 nowhere st' }, allProducts)}
          >Guest Checkout</button>
        }
      </div>
    </div>
  )
}

export const mapState = (state => {
  return {
    order: state.order,
    guestCart: state.guestCart,
    user: state.user,
    lineItems: state.order.lineItems,
    allProducts: state.products,
    isLoggedIn: !!state.user.id
  }
})

const mapProps = function (dispatch, ownProps) {
  return {
    // Checkout
    handleUserCheckout(orderId, lineItems, allProducts, isLoggedIn) {
      dispatch(checkoutOrder(orderId, ownProps.history))
      let currentProd
      lineItems.forEach((lineItem) => {
        currentProd = allProducts.find(e => e.id === lineItem.productId)
        currentProd.stock = currentProd.stock - lineItem.quantity
        dispatch(updatingProduct(currentProd))
      })
    },
    handleGuestCheckout(cart, guestInfo, allProducts) {
      dispatch(checkoutGuestOrder(cart, guestInfo, ownProps.history))
      let currentProd
      cart.forEach((lineItem) => {
        currentProd = allProducts.find(e => e.id === lineItem.productId)
        currentProd.stock = currentProd.stock - lineItem.quantity
        dispatch(updatingProduct(currentProd))
      })
    }
  }
}

export default connect(mapState, mapProps)(CheckoutComponent)

CheckoutComponent.propTypes = {
  order: PropTypes.integer,
  guestCart: PropTypes.array,
  user: PropTypes.integer,
  lineItems: PropTypes.object,
  allProducts: PropTypes.array,
  isLoggedIn: PropTypes.bool
}
