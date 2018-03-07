
import React from 'react';


export default function Order(props) {
  console.log(props.orders)
  return (
    <div>
      {props.orders && props.orders.map(order => makeRow(order))}
    </div>
  );
}

const makeRow = (order) =>

  <div>
  <hr />
    <div key={order.id} className="orderContainer">
      <p>  OrderId: {order.id}  </p>
      <p>  Status: {order.status}</p>
      <p>  Email: {order.email}</p>
    </div>
  </div>
