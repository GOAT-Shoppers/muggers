import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getUserOrder} from '../../store/order'

 class UserPageOrders extends Component {
   componentDidMount() {
     this.props.getUserOrder(this.props.user.id)
   }
   componentWillReceiveProps(nextProps) {
     if (this.props.user.id !== nextProps.user.id) {
       let id = +nextProps.user.id
       this.props.getUserOrder(id)
     }
   }


   render(){
    return (
     <div>
            <h3 > My Order History</h3>
           
        {this.props.order.lineItems ? this.props.order.lineItems.map(lineItem => makeRow(lineItem)) : <h4>You not made any purchases .</h4>}
      </div>
    )
  }
 } 
const makeRow = (lineItem) =>
  <div key={lineItem.id} className="flexContainer">
    <p>  Price per item: {lineItem.getPrice}  </p>
    <p>  Quantity: {lineItem.quantity}  </p>
    <p>  Total: {lineItem.getTotal}  </p>
    <p>  Product Number: {lineItem.productId}</p>
  </div>
//getUserOrder
const mapState = (state) => {
  return {order: state.order}

}
const mapDispatch = (dispatch, ownProp) => ({
    getUserOrder(userId){
      dispatch(getUserOrder(userId))
  }
})

export default connect(mapState, mapDispatch)(UserPageOrders)

// {
//   this.props.orders &&
//   this.props.orders.map((order, i) => order.status}

