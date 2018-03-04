import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export const AllProducts = props => {

        const { products } = props;
        return (
        <div>
            <div>
                <h1>All Products</h1>
            </div>
            <div>
                {
                    products.map(product => <Link to={`/products/${product.id}`} key={product.id}><h3>{product.name}</h3></Link>)
                }
            </div>
            <div> {/* Only render if Admin */}
                <Link to={'/addProduct'}>Add a product!</Link>
            </div>
        </div>
        )
}

const mapState = state => ({
    products: state.products
});

export default connect(mapState, null)(AllProducts);

