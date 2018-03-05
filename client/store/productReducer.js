import axios from 'axios';

//ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS';
const POST_PRODUCT = 'POST_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//ACTION CREATORS
export const setProducts = allProducts => ({ type: SET_PRODUCTS, allProducts });

export const postProduct = product => ({ type: POST_PRODUCT, product });

export const updateProduct = product => ({ type: UPDATE_PRODUCT, product });

//THUNKS
export const fetchProducts = () => dispatch => {
    axios.get('/api/products')
        .then(results => results.data)
        .then(products => dispatch(setProducts(products)))
        .catch(error => console.error('Could not get all products ', error));
}

export const createProduct = product => dispatch => {
    axios.post('/api/products', product)
        .then(results => results.data)
        .then(newProduct => dispatch(postProduct(newProduct)))
        .catch(error => console.error('Error posting product ', error));
}

export const updatingProduct = product => dispatch => {
    axios.put(`/api/products/${product.id}`, product)
        .then(results => results.data)
        .then(updatedProduct => dispatch(updateProduct(updatedProduct)))
        .catch(error => console.error('Could not update product ', error));
}

//REDUCER
export default  (products = [], action) => {

    switch (action.type) {
        case SET_PRODUCTS:
            return action.allProducts;

        case POST_PRODUCT:
            return [...products, action.product ];

        case UPDATE_PRODUCT:
            return products.map(product => {
                return product.id === action.product.id ?
                action.product : product;
            });

        default: return products;
    }
}
