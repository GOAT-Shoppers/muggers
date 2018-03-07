import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { unloadOrderFromState } from '../store'

function Confirmation (props) {

  const { order } = props
  let orderId
  if (order.id) {
    orderId = order.id
  } else {
    orderId = 0
  }

  return (
    <div>
      <h2>Congratulations, you've been mugged.</h2>
      <div className="homepage genericBackground">
      <h3>We've sent you a confirmation email</h3>
        <h3>We've sent you a confirmation email</h3>
        <h3>Your order Id is: {orderId}</h3>
        <div>
          <div className="ipsum" >Feel free to continue shopping, or enjoy this hipster ipsum in the meanwhile:
          <br />
          Chicharrones authentic ennui, tote bag la croix actually woke vape. Master cleanse franzen jean shorts locavore everyday carry coloring book actually chicharrones asymmetrical 90's. Succulents retro small batch pop-up, hell of bushwick whatever. Letterpress pickled shabby chic fingerstache kickstarter, shaman hammock glossier aesthetic tilde +1 affogato heirloom.
          Slow-carb wolf mumblecore brunch palo santo post-ironic. Austin vinyl woke, butcher lomo flannel kickstarter asymmetrical tote bag lo-fi dreamcatcher XOXO. Pinterest affogato roof party vexillologist deep v before they sold out PBR&B blog DIY art party fashion axe venmo. Hoodie 90's whatever etsy scenester skateboard venmo hot chicken fashion axe. Af cloud bread tacos offal craft beer. Forage authentic jianbing tilde cloud bread disrupt poutine fashion axe. Taiyaki artisan celiac distillery.
          </div>
        <div className="homepageImage">
          <img src="http://www.oogazone.com/wp-content/uploads/best-hd-of-hot-cup-coffee-clipart-transparent-library.jpg" />
        </div>
      </div>
    </div>
  </div>
  )
}

export class ConfirmationLoader extends Component {

  componentWillUnmount() {
    this.props.unloadOrder()
  }

  render(){
      return (
        <Confirmation {...this.props} />
      )
    }
}


export const mapState = (state) => {
  return {
    order: state.order
  }
}

export const mapProps = function (dispatch) {
  return {
    unloadOrder() {
      dispatch(unloadOrderFromState())
    }
  }
}

export default connect(mapState, mapProps)(ConfirmationLoader);
