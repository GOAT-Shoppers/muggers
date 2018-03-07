import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import UserPageDetails from './UserPage-Details'
import UserPageEdit from './UserPage-Edit'
import UserPageOrders from './UserPage-Order'
import AdminPage from '../Admin'

const UserPage = (props) => {
  const { user, isLoggedIn} = props
  return (
  <div>
                  <div>
                    <h3 >Welcome {user.firstName}</h3>
                  </div>
                  <div>
              {user.isAdmin &&
                <button className="btn"><Link to="/myaccount/adminsettings/"> Admin Settings</Link>
                </button>}

                        <button className="btn"><Link to="/myaccount/detail"> Profile</Link></button>

                        <button className="btn"><Link to="/myaccount/orders">Orders</Link></button>

                        <button className="btn"><Link to="/myaccount/edit" >Settings</Link></button>
                  </div>
      {isLoggedIn ?
        <div>
          <Switch>
            <Route exact path="/myaccount/detail" render={() => <UserPageDetails user={user} />} />
            <Route path="/myaccount/edit" render={() => <UserPageEdit user={user} />} />
            <Route path="/myaccount/adminsettings" component={AdminPage} />
            <Route path="/myaccount/orders" render={() => <UserPageOrders user={user}/>} />
          </Switch>
        </div>
        :
        <h4>Please sign up or login to see your account</h4>
      }
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapStatetoProps)(UserPage)
