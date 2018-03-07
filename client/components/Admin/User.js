import React from "react";

const makeRow = (user) =>
  (
    <div key={user.id}>
      <hr />
      <div className="userContainer">

        <p>  UserId: </p>
        <p> {user.id}  </p>
        <p>  Name: </p>
        <p> {user.fullName}</p>
        <p>  Email: </p>
        <p> {user.email}</p>
        <p> {user.isAdmin ? 'Admin' : 'User'}</p>
      </div>
    </div>
  )

export default function User (props){
  return (
    <div>
      {props.users && props.users.map(user => makeRow(user))}
     </div>
  );
}
