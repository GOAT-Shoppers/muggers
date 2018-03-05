import React from 'react';
import { connect } from 'react-redux';
import Review from './Review.jsx'

export const SingleProduct = props => {

const { product } = props;

    return (
        <div>
                { product &&
                  <div>
                    <div className="row">
                      <div className="col-8">
                          <h1>{ product.name }</h1>
                          <img src={product.photo} />
                          <h5>Price: ${ product.price }</h5>
                          <h5>Quantity: { product.stock }</h5>
                          <button type="submit">Add to Cart</button>
                      </div>
                      <div className="col-4">
                          <h4>{ product.description }</h4>

                      </div>
                    </div>
                    <div className="row">
                      <Review id={product.id} />
                    </div>
                  </div>
                }
        </div>
        )
}

const mapState = (state, ownProps) => {
    const productId = +ownProps.match.params.id;
    console.log("State ", state);
    const product = state.products.find(prod => productId === prod.id);

    return {
        product
    }
}

export default connect(mapState, null)(SingleProduct);
