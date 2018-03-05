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
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
        this.setState({ quantity: event.target.quantity.value });
    }

    handleSearch(event) {
      this.setState({
        filteredProducts: event.target.value
      })
    }

    render() {

        const products  = this.state.filteredProducts ? this.props.products.filter(el => el.name.match(this.state.filteredProducts)) : this.props.products;
        return (
        <div>
            <div>
                <h1>All Products</h1>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                  </div>
                  <input type="text" className="form-control" aria-label="Search" aria-describedby="inputGroup-sizing-default" onChange={this.handleSearch} />
                </div>
                <br />
                <br />
            </div>
            <div className="allProds">
                {
                products.map(product => (
                    <div className="displayProd" key={product.id}>
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
                        <br />
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
