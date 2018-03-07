
import React from 'react';
import { Route, Link } from 'react-router-dom'
//import SingleOrder from './SingleOrder';

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
    <div>
      {props.orders && props.orders.map(order => makeRow(order))}
    </div>
    <div>
        <Route exact path="/myaccount/adminsettings/order/:id" />
    </div>
    </div>
  );
}

// const makeRow = (order) =>
//   <div key={order.id} className="flexContainer">
//     <Link to={`/myaccount/adminsettings/order/${order.id}`}>
//     <div>  OrderId: {order.id}  </div>
//     <div>  Status: {order.status}</div>
//     <div>  Email: {order.email}</div>
//     </Link>
//   </div>


//render={() => <SingleOrder orders={props.orders} />}
