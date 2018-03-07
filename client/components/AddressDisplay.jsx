import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NewAddress from './NewAddress.jsx';
import PropTypes from 'prop-types';


export const AddressDisplay = props => {

    const { addresses, uId } = props;
    const addressArray = addresses.filter(address => {
        return (
            <button type="radio">
            `${address.street} ${address.city}, ${address.state} ${address.zip} `
            </button>
        )
    })
    // console.log('----------', props);
    return (
        <div>
            { addresses &&
                <div>
                    <h1>Addresses</h1>
                    <div>
                        {
                         addressArray
                        }
                        {addresses && console.log('=---------,', addresses)}
                    </div>
                    { addresses && (addresses.length <= 5) && <NewAddress /> }
                </div>
            }
        </div>
    )
}


const mapState = state => ({
    uId: state.user.id,
    addresses: state.addresses
});

export default connect(mapState, null)(AddressDisplay);

AddressDisplay.proptypes = {
    addresses: PropTypes.array
}