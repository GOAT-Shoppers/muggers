import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewAddress from './NewAddress.jsx';
import AddressDisplay from './AddressDisplay.jsx';
import { checkoutOrder } from '../store'
import { Link } from 'react-router-dom';

/*
Guest: Add email + address
LoggedIn: Select Address, add Address, display e-mail

Checkout Button:
- shopping -> checkout
- Decrease inventory
- Confirmation e-mail
- Post guest order

Grab checkout button functionality from Cart.jsx
 */
// let addresses = [{ id: 1, fullAddress: "12346" }, { id: 2, fullAddress: "12345" } ]


function CheckoutComponent (props) {

  let order;
  const { user, handleUserCheckout } = props

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
            <AddressDisplay />
            {
              // // Can't make these radios unique without knowing what the state is like for user/addresses
              // addresses.map((address) => {return (
              //   <label
              //   key={address.id}
              //   >
              //     <input type="radio" value="option2" />
              //     {address.fullAddress}
              //   </label>
              // )
            // })
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
      

      <div>
        {user.id ?
          <button
            onClick={handleUserCheckout.bind(this, order.id)}
          >Complete Checkout</button> : <button>Guest Checkout</button>
        }
      </div>
    </div>
  )
}

export const mapState = (state => {
  return {
    order: state.order,
    guestCart: state.guestCart,
    user: state.user
  }
})

const mapProps = function (dispatch, ownProps) {
  return {
    // Checkout
    handleUserCheckout(orderId) {
      dispatch(checkoutOrder(orderId, ownProps.history))
    },

  }
}

export default connect(mapState, mapProps)(CheckoutComponent)
