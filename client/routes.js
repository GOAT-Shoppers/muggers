'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login,
        Signup,
        UserHome,
        AllProducts,
        SingleProduct,
        Cart,
        Checkout,
        Review,
        AllOrders,
        DefaultHome,
        NewAddress,
        AddProduct,
        Confirmation
       } from './components';
import {me} from './store';
import UserPage from './components/User/UserPage'
import { fetchReviews } from './store/review';
import { fetchProducts } from './store/productReducer';
import { fetchCategories } from './store/categoryReducer';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
    this.props.fetchAllReviews()
    this.props.loadProducts();
    this.props.loadCategories();
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/:id/reviews" component={Review} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path ="/allorders" component={AllOrders} />
        <Route path ="/orderconfirmation" component={Confirmation} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />

              <Route path="/myaccount" component={UserPage} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route path="/home" component={DefaultHome} />
        <Route component={DefaultHome} />
      </Switch>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    products: state.products,
    categories: state.categories,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    fetchAllReviews() {
      dispatch(fetchReviews())
    },
    loadProducts: () => dispatch(fetchProducts()),
    loadCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
