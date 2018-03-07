import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review.jsx';
import { fetchActiveOrder, createLineItem } from '../store';

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
  
  render() {

    const { product, userId, isLoggedIn, orderId } = this.props;
    const { quantity } = this.state;
    
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
                          <h5>Price: ${ product.price }</h5>
                          <h5>{ product.stock } left</h5>

                          <form onSubmit={(e) => this.props.handleSubmit(e, quantity, product.price, product.id, orderId, isLoggedIn)}>
                          <input name="quantity" value={quantity} onChange={this.handleChange} />
                          <button type="submit">Add to Cart</button>
                          </form>

                          
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
  console.log("-------", ownProps )
    const productId = +ownProps.match.params.id;
    const product = state.products.find(prod => productId === prod.id);

    return {
        product,
        isLoggedIn: !!state.user.id,
        userId: state.user.id,
        orderId: state.order.id
    }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, quantity, price, productId, orderId, loggedIn) {
      evt.preventDefault();
      let item = {
        quantity,
        price, 
        productId,
        orderId
      }
      if (loggedIn){
        dispatch(createLineItem(item))
      }
  },
  loadOrder: id => dispatch(fetchActiveOrder(id))
  
}
}

export default connect(mapState, mapDispatch)(SingleProduct);
