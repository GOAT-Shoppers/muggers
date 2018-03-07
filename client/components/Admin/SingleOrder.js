// import React from 'react';
// import { connect } from 'react-redux'
// import { orderGetter } from '../../store'

// const SingleOrder = (props, ownProps) => {
//   const { orders } = props;

//   return (
//         <div>
    
//       </div>
//   )
// }



// const mapState = (state, ownProps) => {
//   console.log(ownProps, state,"-------------")
//   return {
//    orders: ownProps.orders.find(aOrder => aOrder.id == +ownProps.match.params.id)
//   }
// }

// const mapDispatch = (dispatch, ownProps) => {
  
//   //console.log(ownProps, 'ssdsefsdfsd')
//   return {
//     orderGetter: () => dispatch(orderGetter(+ownProps.match.params.id))
//   }
// }

// export default connect(mapState, mapDispatch)(SingleOrder)