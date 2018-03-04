import React from 'react';
import { connect } from 'react-redux';


export const SingleProduct = props => {

const { product } = props;
    return (
        <div>
            <h1>{ product.name }</h1>
            <img src={product.photo} />
            <h5>Price: { product.price }</h5>
            <h5>Quantity: { product.stock }</h5>
            <h4>{ product.description }</h4>
            {/* Incorporate rating */}
        </div>
        )
}

const mapState = (state, ownProps) => {
    const productId = ownProps.match.params.id;
    const product = state.products.find(prod => productId === prod.id);

    return {
        product
    }
}

export default connect(mapState, null)(SingleProduct);
