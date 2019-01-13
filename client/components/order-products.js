import React from 'react'

// const calculateTotal = function(order) {
//   let total = 0
//   order.lineItems.forEach(lineItem => {
//     total += lineItem.price * lineItem.quantity
//   })
//   return total / 100
// }

const OrderProducts = ({lineItems, order}) => {
  let total
  if (order) {
    // total = calculateTotal(order)
    total = order.calculateTotal()
  } else {
    total = 0
    lineItems.forEach(lineItem => {
      total += lineItem.product.price * lineItem.quantity / 100
    })
  }
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

          <p>Quantity: {lineItem.quantity} </p>
          {lineItem.orderId ? (
            <p>Price: ${lineItem.price / 100}</p>
          ) : (
            <p>Price: ${lineItem.product.price / 100}</p>
          )}
        </div>
      ))}
      <p>Total: ${total}</p>
    </div>
  )
}

export default OrderProducts
