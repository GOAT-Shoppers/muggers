import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../store';


export class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
                name: '',
                description: '',
                price: '',
                stock: '',
                photo: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render () {
        const product = this.state;
        return (
            <form onSubmit={e => this.props.handleSubmit(e, product)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input name="name" onChange={this.handleChange} defaultValue={product.name} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input name="description" onChange={this.handleChange} defaultValue={product.description} />
                </div>
                {/*Make sure price goes in db as a integer type not string*/}
                <div>
                    <label htmlFor="price">Price</label>
                    <input name="price" onChange={this.handleChange} defaultValue={product.price} />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input name="stock" onChange={this.handleChange} defaultValue={product.stock} />
                </div>
                <div>
                    <label htmlFor="photo">Photo</label>
                    <input name="photo" onChange={this.handleChange} defaultValue={product.photo} />
                </div>
                {/* <div>
                    <label htmlFor="category">Category</label>
                    <input name="category" onChange={this.handleChange} value={product.category} />
                </div> */}
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
          )
    }
}

const mapDispatch = dispatch => ({
    handleSubmit: (evt, product) => {
        evt.preventDefault();
        dispatch(createProduct(product));
    }
})

export default connect(null, mapDispatch)(AddProduct);
