
import React from 'react';

const makeRow = (order) =>
  (
    <div key={order.id}>
      <hr />
      <div className="orderContainer">
        <p>  OrderId: {order.id}  </p>
        <p>  Status: {order.status}</p>
        <p>  Email: {order.email}</p>
      </div>
    </div>
  )

export default function Order(props) {
  return (
    <div>
      {props.orders && props.orders.map(order => makeRow(order))}
    </div>
  );
}
