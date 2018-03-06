import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn, handleInputChange, handleSearch }) => (

  <div>
  <nav className="navBar">
    <div className="globalnavLinks">

      <Link to="/home">Home</Link>
      <Link to="/products">Browse Products</Link>
    </div>
    <h1>Muggers Inc.</h1>
      {isLoggedIn ? (
        <div className="navLinks" >
          {/* The navbar will show these links after you log in */}
          <Link to="/myaccount">My Account</Link>
          <Link to="/cart">My Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navLinks" >
          {/* The navbar will show these links before you log in */}
          <Link to="/cart">My Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>

        </div>
        )}
      </nav>
      <hr />
    </div>


)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  let search;
  return {
    handleClick() {
      dispatch(logout())
    },
    handleInputChange(evt) {
      search = evt.target.value;
    },
    handleSearch() {
      return search;
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
