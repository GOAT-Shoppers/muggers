import React from 'react';
import { connect } from 'react-redux';


export const SingleProduct = props => {

const { product } = props;
console.log("PRODUCT ", product)
    return (
        <div>
            <h1>Single product page</h1>
                { product &&
                <div>
                    <h1>{ product.name }</h1>
                    <img src={product.photo} />
                    <h5>Price: { product.price }</h5>
                    <h5>Quantity: { product.stock }</h5>
                    <h4>{ product.description }</h4>
                    <button type="submit">Add to Cart</button>
                </div>
                }

        </div>
        )
}

const mapState = (state, ownProps) => {
    // console.log("OWNPROPS ", ownProps)
    const productId = +ownProps.match.params.id;
    console.log("State ", state);
    const product = state.products.find(prod => productId === prod.id);

    return {
        product
    }
}

export default connect(mapState, null)(SingleProduct);
