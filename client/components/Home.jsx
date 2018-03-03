import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';

export class Home extends Component {

    componentDidMount() {
        this.props.loadProducts();
    }

    render() {
        return (
            <div>
                <h1>Welcome USER</h1>
                <div>IMAGE</div>
                <div>PRODUCTS</div>
                {this}
            </div>
        )
    }
}

const mapState = state => ({
    products: state.products
});

const mapDispatch = dispatch => ({
    loadProducts: () => dispatch(fetchProducts())
});

export default connect(mapState, mapDispatch)(Home);
