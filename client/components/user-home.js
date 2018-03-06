import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {fullName, email} = props;

  let name;
    if (fullName === 'null null') {
      if (!email) name = 'Guest';
      else name = email;
    }
    else { name = fullName; }

  return (
    <div>
      <h3>Welcome, {name}</h3>
    </div>
  );
}

/**
 * CONTAINER
 */
export const mapState = state => {
  return {
    email: state.user.email,
    fullName: state.user.fullName
  };
}

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  fullName: PropTypes.string
};
