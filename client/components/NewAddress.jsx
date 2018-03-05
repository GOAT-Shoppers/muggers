import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAddress } from '../store';


export class NewAddress extends Component {
    constructor() {
        super();
        this.state = {
                street: '',
                city: '',
                state: '',
                zip: null
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render () {
        const { street, city, state, zip } = this.state

        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <label htmlFor="street">Street Address</label>
                    <input name="street" onChange={this.handleChange} value={street} />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input name="city" onChange={this.handleChange} value={city} />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input name="state" onChange={this.handleChange} value={state} />
                </div>
                <div>
                    <label htmlFor="zip">Zip Code</label>
                    <input name="zip" onChange={this.handleChange} value={zip} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
          )
    }
}

const mapDispatch = (dispatch, ownProps) => ({
    //need to get userid off of ownProps
    handleSubmit: event => {
        const id = ownProps.match.params.user.id; //may need to modify. just starting point. Need to find out how our information is flowing once we all come together for the merge
        event.preventDefault();
        const address = {
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            userId: id
        }
        dispatch(createAddress(address));
    }
})

export default connect(null, mapDispatch)(NewAddress);
