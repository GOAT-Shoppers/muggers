import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'


const GuestLineItem = (props) => {
  let lineItems = props.lineItems
  let products = props.products
  let deleteItem = props.clickHandle
  let updateQuantity = props.changeHandle

  let product = function(productId){
    return products.find(prod => (prod.id === productId))
  }

  return (
    <div>
    {
      lineItems.map(lineItem => {
        let prod = product(lineItem.productId)
        console.log(prod)
        return (
          <div className="cartContainer" key = { lineItem.productId }>
            <div className="lineItemName">
              <div className="lineItemImgContainer">
                  <Link to={`/products/${lineItem.productId}`}>{prod ? prod.name : <span>Loading</span>}</Link>
              <div>
                <img src={prod ? prod.photo : <span>Loading</span>} className="lineItemImg" />
              </div>
              <button
              onClick={deleteItem.bind(this, lineItems.productId)}
              >delete</button>

              </div>
            </div>
            <div className="lineItemPriceQuantity">{(lineItem.price / 100).toFixed(2)}</div>
            <div className="lineItemPriceQuantity">
              <input
                type="number"
                defaultValue={lineItem.quantity}
                onChange={(event) => updateQuantity(lineItem.productId, event.target.value) }
              />
            </div>
          </div>
        )
      })
    }
    </div>
  )
}

const mapState = state => ({
  products: state.products
});

export default connect(mapState)(GuestLineItem);
