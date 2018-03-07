import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review.jsx';
import { fetchActiveOrder, createLineItem, clearLineItems, newGuestLineItem } from '../store';

export class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (evt) {
    this.setState({ quantity: evt.target.value });
  }

  componentDidMount() {
    this.props.loadOrder(this.props.userId);
  }

  componentWillUnmount(){
    this.props.clearLineItem();
  }

  render() {

    const { product, userId, isLoggedIn, orderId, lineItem } = this.props;
    const { quantity } = this.state;
    const isAvailable = +product.stock > 0;
    let successText = ''

    if (Object.keys(lineItem).length){successText = 'Successfully Added to Cart'}

    return (
        <div>
                { product &&
                  <div>
                    <div className="prodDisplayPage">
                      <div className="prodDescription genericBackground">
                        <h1>{ product.name }</h1>
                        <h4>{ product.description }</h4>
                      </div>
                      <div className="prodImage">
                          <img src={product.photo} />
                          <h5>Price: ${ (product.price / 100).toFixed(2) }</h5>
                          <h5>{ product.stock } left</h5>

                          <form onSubmit={(e) => this.props.handleSubmit(e, quantity, product.price, product.id, orderId, isLoggedIn)}>
                          <input name="quantity" value={quantity} onChange={this.handleChange} />
                          <button type="submit" disabled={!isAvailable} className="btn"
                          >Add to Cart</button>
                          </form>
                          <div>{successText}</div>
                      </div>
                    </div>
                    <div>
                      <Review id={product.id} />
                    </div>
                  </div>
                }
        </div>
        )
  }
}

const mapState = (state, ownProps) => {
    const productId = +ownProps.match.params.id;
    const product = state.products.find(prod => productId === prod.id);

    return {
        product,
        isLoggedIn: !!state.user.id,
        userId: state.user.id,
        orderId: state.order.id,
        lineItem: state.lineItem
    }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, quantity, price, productId, orderId, loggedIn) {
      evt.preventDefault();
      let item = {
        quantity,
        price,
        productId
      }
      if (loggedIn){
        item.orderId = orderId
        dispatch(createLineItem(item))
      } else {
        dispatch(newGuestLineItem(item))
      }
  },
  loadOrder: id => dispatch(fetchActiveOrder(id)),
  clearLineItem: () => dispatch(clearLineItems())

}
}

export default connect(mapState, mapDispatch)(SingleProduct);
