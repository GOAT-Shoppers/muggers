import React from 'react'
import { Link } from 'react-router-dom';


const LineItem = (props) => {
  let lineItems = props.lineItems || []
  let handleClick = props.clickHandle
  let handleChange = props.quantChangeHandle
  let userId = props.userId

  return (
    // loading ? <div>Loading your cart...</div> :
    //   (
        <div>
          {lineItems.map((lineItem) => {
            return (
              <div className="cartContainer" key={lineItem.id}>
                <div className="lineItemName">
                  <div className="lineItemImgContainer">
                    <Link to={`/products/${lineItem.product.id}`}>{lineItem.product.name}</Link>
                    <div>
                      <img src={lineItem.product.photo} className="lineItemImg" />
                    </div>
                    <button
                    onClick={handleClick.bind(this, lineItem.id)}>delete</button>
                  </div>
                </div>
                <div className="lineItemPriceQuantity">{lineItem.getPrice}</div>
                <div className="lineItemPriceQuantity">
                  <input
                  type="number"
                  defaultValue={lineItem.quantity}
                  onChange={(event) => handleChange(lineItem.id, event.target.value, userId)}
                  />
                  </div>
              </div>
            )
          })}
        </div>
      )
  //)
}

export default LineItem
