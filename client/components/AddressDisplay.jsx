import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NewAddress from './NewAddress.jsx';

export const AddressDisplay = props => {

    const { addresses, uId } = props;
    console.log('----------', props);
    return (
        <div>
            {
                <div>
                    <h1>Addresses</h1>
                    <div>
                        {  addresses &&
                            addresses.filter(address => {
                                
                                return (
                                    <label key={address.id}>
                                    <input type="radio" value={address.id} />
                                    {`${address.street}\n${address.state} ${address.city} ${address.zip} `}
                                    </label>
                            )
                            })
                        }
                        {/* {addresses && console.log('=---------,', addresses)} */}
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

