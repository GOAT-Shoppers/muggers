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
      <div className="homepage genericBackground">
        <p>Photo booth umami everyday carry vaporware flannel. Humblebrag sartorial aesthetic, cold-pressed echo park sustainable authentic intelligentsia. Food truck lyft iPhone tofu flexitarian brooklyn forage stumptown mumblecore cliche vice. Vexillologist four dollar toast cred listicle portland, sustainable iPhone irony plaid literally lumbersexual butcher cold-pressed. Williamsburg franzen pok pok kickstarter fixie green juice la croix. VHS readymade irony art party, deep v sustainable drinking vinegar hell of cred tofu cloud bread ethical raclette gentrify. Craft beer austin cronut occupy street art butcher.</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Teacup_clipart.svg/672px-Teacup_clipart.svg.png" />
      </div>
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
