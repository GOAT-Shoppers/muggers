
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatingUser } from '../../store'


class UserPageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[ event.target.name ]: event.target.value });
  }

  render() {
    const user = this.state;
    return (
      <div className="col-md-12">
            <h3> Edit your Profile</h3>
            <h4>Details</h4>
              <form onSubmit={(e) => this.props.handleSubmit(e, user)}>
                  <h4>First Name</h4>
                        <input type="text" placeholder={user.firstName} name="firstName" defaultValue={this.state.firstName} onChange={this.handleChange} />
                    <h4>Last Name</h4>
                          <input type="text" placeholder={user.lastName} name="lastName" defaultValue={this.state.lastName} onChange={this.handleChange} />
                    <h4>Email</h4>
                      <input type="text" placeholder={user.email} name="email" defaultValue={this.state.email} onChange={this.handleChange} />
                    <h4>Password</h4>
                          <input type="text" name="password" defaultValue={this.state.password} onChange={this.handleChange} />
                          <br />
                    <div><button type="submit">Submit</button> </div>
                </form>
              </div>
    )
  }
}


const mapState = state => ({ user: state.user });

const mapDispatch = dispatch => ({
  handleSubmit (e, user) {
    e.preventDefault();
    dispatch(updatingUser(user));
  }
})
export default connect(mapState, mapDispatch)(UserPageEdit);
