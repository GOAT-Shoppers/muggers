import React from "react";


export default function User (props){
console.log(props.user)
  return (
    <div>
      {props.users && props.users.map(user => makeRow(user))}
     </div>
  );
}

const makeRow = (user) =>
  <div>
    <hr />
    <div key= {user.id} className="userContainer">

      <p>  UserId: </p>
      <p> {user.id}  </p>
      <p>  Name: </p>
      <p> {user.fullName}</p>
      <p>  Email: </p>
      <p> {user.email}</p>
      <p> {user.isAdmin ? 'Admin' : 'User'}</p>
      </div>
    </div>
