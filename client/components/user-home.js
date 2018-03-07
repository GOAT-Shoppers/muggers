import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { fetchActiveOrder } from '../store';

/**
 * COMPONENT
 */
class UserHome extends Component {

  componentDidMount() {
    this.props.loadOrder(this.props.user.id);
  }
  render() {
    const {fullName, email} = this.props;
  
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
          <p>Feel free to browse our mug selection up top.</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Teacup_clipart.svg/672px-Teacup_clipart.svg.png" />
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    loadOrder: id => dispatch(fetchActiveOrder(id))
  }
}
export const mapState = state => {
  return {
    email: state.user.email,
    fullName: state.user.fullName,
    user: state.user
  };
}

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  fullName: PropTypes.string
};
