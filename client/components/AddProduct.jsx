import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../store';
import { fetchCategories } from '../store/categoryReducer';
import { history, withRouter } from 'react-router-dom'

export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
                name: '',
                description: '',
                price: '',
                stock: '',
                photo: '',
                category: '',
                currentCategory: props.category
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render () {
        const product = this.state;
        return (
            <form onSubmit={e => this.props.handleSubmit(e, product, this.state)}>
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
                <div>
                  <select name="category" onChange={this.handleChange} >
                    <option>Select Category</option>
                    {this.state.currentCategory.map(el => (
                      <option key={el.id} value={el.id}>{el.name}</option>
                    ))}

                  </select>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
          )
    }
}

const mapDispatch = (dispatch, ownProps) => ({
    handleSubmit: (evt, product, prodState) => {
        evt.preventDefault();
        product.category = {id: prodState.category}
        dispatch(createProduct(product, ownProps.history));
        dispatch(fetchCategories());
    }
})

const mapState = state => ({
  category: state.categoryReducer
})

export default withRouter(connect(mapState, mapDispatch)(AddProduct));
