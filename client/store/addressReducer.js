import axios from 'axios';

const GET_ADDRESSES = 'GET_ADDRESSES';
const POST_ADDRESS = 'POST_ADDRESS';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const DELETE_ADDRESS = 'DELETE_ADDRESS';

export const getAddresses = addresses => ({ type: GET_ADDRESSES, addresses });

export const postAddress = address => ({ type: POST_ADDRESS, address });

export const updateAddress = address => ({ type: UPDATE_ADDRESS, address });

export const deleteAddress = id => ({ type: DELETE_ADDRESS, id });

export const fetchAddresses = () => dispatch => {
    axios.get('/api/addresses')
        .then(results => results.data)
        .then(addresses => dispatch(getAddresses(addresses)))
        .catch(error => console.error('Could not get addresses ', error));
}

export const createAddress = address => dispatch => {
    axios.post('/api/addresses', address)
        .then(results => results.data)
        .then(newAddress => dispatch(postAddress(newAddress)))
        .catch(error => console.error('Could not post address ', error));
}

export const editAddress = address => dispatch => {
    axios.put(`/api/addresses/${address.id}`, address)
        .then(results => results.data)
        .then(editedAddress => dispatch(updateAddress(editedAddress)))
        .catch(error => console.error('Could not update address ', error));
}

export const removeAddress = id => dispatch => {
    axios.delete(`/api/address/${id}`)
        .then(() => dispatch(deleteAddress(id)))
        .catch(error => console.error('Could not delete address ', error));
}


export default (addresses = [], action) => {

    switch (action.type) {
        case GET_ADDRESSES:
            return action.addresses;

        case POST_ADDRESS:
            return [...addresses, action.address ];

        case UPDATE_ADDRESS:
            return addresses.map(address => {
                return address.id === action.address.id ?
                action.address : address
            });

        case DELETE_ADDRESS:
            return addresses.filter(address => address.id !== action.id);

        default: return addresses;
    }
}
