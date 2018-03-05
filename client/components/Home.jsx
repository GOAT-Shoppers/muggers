
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/productReducer';
import { fetchCategories } from '../store/categoryReducer';

export class Home extends Component {
    componentDidMount() {
        this.props.loadProducts();
        this.props.loadCategories();
    }

    render() {
        return (
            <div>
                <h1>Welcome USER</h1>
                <div>IMAGE</div>
                <div>PRODUCTS</div>
            </div>
        )
    }
}

const mapState = state => ({
    products: state.products,
    categories: state.categories
});

const mapDispatch = dispatch => ({
    loadProducts: () => dispatch(fetchProducts()),
    loadCategories: () => dispatch(fetchCategories())
});

export default connect(mapState, mapDispatch)(Home);