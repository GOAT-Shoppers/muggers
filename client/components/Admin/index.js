import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminGetInfo, adminGetProducts, adminAddProduct, adminEditProduct, adminSetOrderStatus, adminDelUsers } from '../../store';
import User from './User';
import Product from './Product';
import Order from './Order';

class AdminPage extends React.Component {
  componentDidMount() {
    this.props.getAdminInfo()
  }
  render() {
    const { users, products, orders, adminDelUsers, adminAddProduct, adminEditProduct, adminSetOrderStatus } = this.props
    return (
      <Link to="/adminsettings/users"> Users </Link>
    )
  }

} 
 