
import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateUser } from '../../store'
// import { Link } from 'react-router-dom';


class UserPageEdit extends Component {
  constructor() {
    super();

    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.setState({ user: this.props.user })
  }

  render() {
    const user = this.state.user

    return (
      <div className="col-md-12">
            <h3> Edit your Profile</h3>
            <h4>Details</h4>
              <form onClick={this.handleSubmit}>
                  <h4>First Name</h4>
                        <input type="text" placeholder={user.firstName} name="FirstName" value={this.state.user.firstName} />
                    <h4>Last Name</h4>
                          <input type="text" placeholder={user.lastName} name="lastName" value={this.state.user.lastName} />
                    <h4>Email</h4>
                      <input type="text" placeholder={user.email} name="email" value={this.state.user.email} />
                    <h4>Password</h4>
                          <input type="text" name="password" value={this.state.password} />
                          <br />
                    <div><button type="submit">Submit</button> </div>
                </form>
              </div>
    )
  }
}

const mapState = state => {
  console.log("state!!!!!!!!!!!! ", state.user)
    if (!state.user.firstName) state.user.firstName = "first";
    if (!state.user.lasttName) state.user.lastName = "last";
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => ({
  handleSubmit (e, firstName, lastName, email, password) {
    e.preventDefault();

    const user = {
      firstName: e.target.FirstName.value,
      lastName: e.tartget.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value
    }
    dispatch(updateUser(user));
  }
})


export default connect(mapState, mapDispatch)(UserPageEdit);
