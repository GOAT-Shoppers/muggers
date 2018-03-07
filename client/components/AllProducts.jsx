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
      this.setState({ selectedCategory: event.target.value})
    }

    handleSearch(event) {
      this.setState({
      [event.target.name]: event.target.value
      })
    }

    render() {
        let products  = this.state.filteredProductName ? this.props.products.filter(el => el.name.match(this.state.filteredProductName)) : this.props.products;
        const filteredCategory = this.state.selectedCategory ? this.props.categories.find(el => el.id == this.state.selectedCategory) : null;
        products = filteredCategory ? filteredCategory.products : products;


        const { user } = this.props;

        return (
        <div>
            <div>
                <h1>All Products</h1>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Search by Name</span>
                  </div>
                  <input type="text" className="form-control" name="filteredProductName" aria-label="Search" aria-describedby="inputGroup-sizing-default" onChange={this.handleSearch} />
                  <select id="inlineFormCustomSelect" onChange={this.handleChange}>
                    <option value="all">All</option>
                    {this.props.categories.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
                  </select>

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
                            <div className="titleBackground">
                                <h4>{ product.name }</h4>
                                <h5>{ product.price }</h5>
                            </div>
                        </Link>
                    </div>
                ))
                }
                { user.isAdmin &&
                  <div className="displayProd">
                    <Link to={'/myaccount/adminsettings/addproduct'}>
                    <img src="http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/blue-jelly-icons-alphanumeric/069598-blue-jelly-icon-alphanumeric-plus-sign.png" />
                    <p><button>Add a product!</button></p>
                    </Link>
                  </div>}
            </div>
        </div>
        )
    }
}

const mapState = state => ({
    products: state.products,
    categories: state.categories,
    user: state.user
});

export default connect(mapState, null)(AllProducts);

