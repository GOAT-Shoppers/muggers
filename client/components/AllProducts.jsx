import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class AllProducts extends Component {
    constructor() {
        super();
        this.state = {
            quantity: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ quantity: event.target.quantity.value });
    }

    render() {
        console.log(this.props)
        const { products } = this.props;
        console.log(this.props);
        return (
        <div>
            <div>
                <h1>All Products</h1>
            </div>
            <div>
                {
                products.map(product => (
                    <div key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            <div>
                                <img src={product.photo} />
                            </div>
                            <div>
                                <h4>{ product.name }</h4>
                                <h5>{ product.price }</h5>
                            </div>
                        </Link>
                        <div>
                            <label htmlFor="quantity">Quantity</label>
                            <input name="quantity" onChange={this.handleChange} />
                        </div>
                        <button type="submit">Add to cart</button>
                    </div>
                ))
                }
            </div>
            {/* Only render below if Admin */}
            {/* <div>
                <Link to={'/addProduct'}>Add a product!</Link>
            </div> */}
        </div>
        )
    }
}

const mapDispatch = dispatch => ({
    handleSubmit: {}
})

const mapState = state => ({
    products: state.products
});

export default connect(mapState, mapDispatch)(AllProducts);

