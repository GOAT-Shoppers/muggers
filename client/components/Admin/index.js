import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminGetInfo } from '../../store';
import User from './User';
import Product from './Product';
import Order from './Order';
import AddProduct from '../AddProduct.jsx';

class AdminPage extends React.Component {
  componentDidMount() {
    this.props.getAdminInfo()
  }
  render() {
    const { users, products, orders } = this.props

    return (
      <div>
      <h1 >Admin Panel</h1>
      <Link to="/myaccount/adminsettings/user"> Users</Link>
      <br />
        <Link to="/myaccount/adminsettings/order">Orders</Link>
      <br />
        <Link to="/myaccount/adminsettings/product" >Products</Link>
        <div>
          <Switch>
            <Route exact path="/myaccount/adminsettings/user" render={() => <User users={users} />} />
            <Route path="/myaccount/adminsettings/order" render={() => <Order orders={orders}  />} />
            <Route path="/myaccount/adminsettings/product" render={() => <Product products={products} />} />
            <Route path="/myaccount/adminsettings/addproduct" render={() => <AddProduct />} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapPropToState = (state) => {
  return {
    users: state.adminInfo.users,
    products: state.adminInfo.products,
    orders: state.adminInfo.orders,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAdminInfo() {
      dispatch(adminGetInfo())
    }
  }
}

export default connect(mapPropToState, mapDispatch)(AdminPage)
