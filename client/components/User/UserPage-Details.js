//to get the address we need route in backened
import React from 'react'

export default function userPageDetails(props){
  return (
    <div >
          <h4> First Name: {props.user.firstName}</h4>
          <h4>Last Name: {props.user.lastName}</h4>
         <h4>Email: {props.user.email}</h4>
         <h4>Address: {}</h4>
        </div>
  )
}
