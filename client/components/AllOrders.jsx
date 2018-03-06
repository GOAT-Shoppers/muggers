import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchAllOrders, unfetchAllOrders } from '../store'
import { Link } from 'react-router-dom'

function AllOrders(props) {
  const { allOrders } = props

  return (
    <div>
      {
        allOrders.map(order => (

          <div key={order.id}>
            <Link to={`/orders/${order.id}`}>
            <div>{order.email}</div>
            <div>{order.updatedAt.substr(0, 10)}</div>
            <div>{order.updatedAt.substr(11, 8)}</div>
            </Link>
          </div>
      ))
      }
    </div>
  )
}

export class AllOrdersLoader extends Component {
  componentDidMount() {
    this.props.loadOrders()
  }

  componentWillUnmount() {
    this.props.unloadOrders()
  }

  render() {
    return (
      <AllOrders {...this.props} />
    )
  }
}

export const mapState = (state) => {
  return {
    allOrders: state.allOrders
  }
}

const mapProps = function (dispatch) {
  return {
    loadOrders() {
      dispatch(fetchAllOrders());
    },
    unloadOrders() {
      dispatch(unfetchAllOrders());
    }
  }
}

export default connect(mapState, mapProps)(AllOrdersLoader)

AllOrders.propTypes = {
  allOrders: PropTypes.array
}
