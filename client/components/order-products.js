import React from 'react'

const OrderProducts = ({lineItems, order}) => {
  const total = order.id ? cal
  return (
    <div>
      {lineItems.map(lineItem => (
        <div key={lineItem.id}>
          <h4>{lineItem.product.name}</h4>
          <img
            src={lineItem.product.imageUrl}
            alt={lineItem.product.altText}
            height="200px"
            width="auto"
          />

          <p>quantity: {lineItem.quantity} </p>
          {lineItem.orderId ? (
            <p>price: ${lineItem.price / 100}</p>
          ) : (
            <p>price: ${lineItem.product.price / 100}</p>
          )}
        </div>
      ))}
      {/* <p>Total: ${order.calculateTotal()}</p> */}
    </div>
  )
}

calculateTotal = function(order) {
  let total = 0
  this.lineItems.forEach(lineItem => {
    total += lineItem.price * lineItem.quantity
  })
  return total / 100
}


export default OrderProducts
