import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NewAddress from './NewAddress.jsx'

export const AllAddresses = props => {

        const { addresses } = props;
        return (
            <div>
                <h1>Addresses</h1>
                <div>
                    {
                        addresses.map(address => address) //match userid here
                    }
                </div>
                { addresses.length <= 5 && <NewAddress /> }
            </div>
        )
}

const mapState = (state, ownProps) => ({
    //get userId and attach so we can match address to user
    addresses: state.addresses
});

export default connect(mapState, null)(AllAddresses);

