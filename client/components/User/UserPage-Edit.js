
import React, { Component } from "react";
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'


class UserPageEdit extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit() {
    axios.put(`api/users/${this.props.user.id}`, this.state)
      .then(console.log)

  }
  render() {
    const user = this.props.user


    return (
      <div className="col-md-12">
            <h3> Edit your Profile</h3>
            <h4>Details</h4>
              <form onClick={this.handleSubmit}>
                 <h4>First Name</h4>
                      <input type="text" placeholder={user.firstName} name="FirstName" onChange={this.handleChange} />
                  <h4>Last Name</h4>
                        <input type="text" placeholder={user.lastName} name="lastName" onChange={this.handleChange} />
                  <h4>Email</h4>
                     <input type="text" placeholder={user.email} name="email" onChange={this.handleChange}  />
                  <h4>Password</h4>
                        <input type="text" placeholder={user.password} name="password" onChange={this.handleChange} />
                        <br />
                  <h4>Address</h4>
                          <input type="text" placeholder={user.address} name="address" onChange={this.handleChange} />     
                    <div><button type="submit">Submit</button> </div>
              </form>
              </div> 
    )
  }
}

export default UserPageEdit;
// const mapState = state =>({

// })
// const mapDispatch = (dispatch) => {
//   return {

//   }
// }


//export default connect(mapState)(UserPageEdit);


