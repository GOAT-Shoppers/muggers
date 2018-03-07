import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAddress } from '../store';


export class NewAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
                street: '',
                city: '',
                state: '',
                zip: '',
                userId: null
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render () {
        const address = this.state

        return (
            <form onSubmit={evt => this.props.handleSubmit(evt, address, this.props.id)}>
                <label htmlFor="street">
                    Street Address <input name="street" onChange={this.handleChange} value={address.street} />
                </label>

                <label htmlFor="city">
                    City <input name="city" onChange={this.handleChange} value={address.city} />
                </label>

                <label htmlFor="state">
                    State <input name="state" onChange={this.handleChange} value={address.state} />
                </label>

                <label htmlFor="zip">
                    Zip Code <input name="zip" onChange={this.handleChange} value={address.zip} />
                </label>

                <div>
                    <button type="submit"
                    >Add</button>
                </div>

            </form>
          )
    }
}

const mapState = state => ({ id: state.user.id });

const mapDispatch = dispatch => ({
    handleSubmit: (evt, address, userId) => {
        address = {...address, userId}
        evt.preventDefault();
        dispatch(createAddress(address));
    }
})

export default connect(mapState, mapDispatch)(NewAddress);
