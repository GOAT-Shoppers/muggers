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
  <div key= {user.id} className="flexContainer">
    <p>  UserId: {user.id}  </p>
    <p>  Name: {user.fullName}</p>
    <p>  Email: {user.email}</p>
    <p>  isAdmin: {user.isAdmin ? 'Admin' : 'User'}</p>
    </div>