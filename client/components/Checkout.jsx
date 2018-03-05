import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

function CheckoutComponent (props) {
  const testUser = {
    id: 2,
    loggedIn: true,
    email: "abcd@aol.com"
  }

  const testUserAddresses = [
    {
      id: 1,
      street: "123 Somewhere St",
      state: "New Hampshire",
      city: "City",
      zip: 12345,
      fullAddress: "123 Somewhere St, City, New Hampshire, 12345",
      userId: 2
    },
    {
      id: 2,
      street: "456 Place Ave",
      state: "New York",
      city: "Another",
      zip: 98765,
      fullAddress: "456 Place Ave, New York, New York, 98765",
      userId: 2
    }
  ]

  return (
    <div>
      {
        testUser.loggedIn ? (
          <div>
            Loggedin View
            <div>Email: {testUser.email}</div>
            {
              // Can't make these radios unique without knowing what the state is like for user/addresses
              testUserAddresses.map((address) => {return (
                <label
                key={address.id}
                >
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
      <form>

        <label>
          Street: <input type="text" name="street" />
        </label>

        <label>
          City: <input type="text" name="city" />
        </label>

        <label>
          State: <input type="text" name="state" />
        </label>

        <label>
          Zip Code: <input type="text" name="zipcode" />
        </label>
      </form>

      <button>Complete Order</button>
    </div>
  )
}

export default CheckoutComponent
