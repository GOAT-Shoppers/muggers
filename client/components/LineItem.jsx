import React from 'react'

const LineItem = (props) => {
  let loading = props.loading
  let lineItems = props.lineItems || []

  return (
    loading ? <div>Loading your cart...</div> :
      (
        <div>
          {lineItems.map((lineItem) => {
            return (
              <div className="cartContainer" key={lineItem.id}>
                <div className="lineItemName">
                  <div className="lineItemImg">
                    {lineItem.product.name}
                    <div><img src={lineItem.product.photo} /></div>


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
