import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

export default class LineItem extends Component {
  constructor() {
    super();
    this.state = {
      order: {},
      lineItems: [],
      loading: true
    }
  }

  componentDidMount() {
    let id = 3;
    axios.get(`/api/orders/${id}`)
      .then(res => res.data)
      .then(order => {
        this.setState({
          order: order,
          lineItems: order.lineItems,
          loading: false
        })
      })
  }

  render() {
    let loading = this.state.loading
    let lineItems = this.state.lineItems

    return (
      loading ? <div>Loading your cart...</div> :
        (
          <div>
            {lineItems.map((lineItem) => {
              return (
                <div className="cartContainer" key={lineItem.id}>
                  <div className="lineItemName">{lineItem.product.name}</div>
                  <div className="lineItemPriceQuantity">{lineItem.getPrice}</div>
                  <div className="lineItemPriceQuantity">{lineItem.quantity}</div>
                </div>
              )
            })}
          </div>
        )
    )
  }
}
