import React from 'react'

const LineItem = (props) => {
  let loading = props.loading
  let lineItems = props.lineItems || []
  let handleClick = props.clickHandle

  return (
    loading ? <div>Loading your cart...</div> :
      (
        <div>
          {lineItems.map((lineItem) => {
            return (
              <div className="cartContainer" key={lineItem.id}>
                <div className="lineItemName">
                  <div className="lineItemImgContainer">
                    {lineItem.product.name}
                    <div>
                      <img src={lineItem.product.photo} className="lineItemImg" />
                    </div>
                    <button
                    onClick={handleClick.bind(this, lineItem.id)}>delete</button>
                  </div>
                </div>
                <div className="lineItemPriceQuantity">{lineItem.getPrice}</div>
                <div className="lineItemPriceQuantity">{lineItem.quantity}</div>
              </div>
            )
          })}
        </div>
      )
  )
}

export default LineItem
