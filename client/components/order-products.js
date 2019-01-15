import React from 'react'
import {connect} from 'react-redux'

const calculateTotal = function(lineItems) {
  let total = 0
  lineItems.forEach(lineItem => {
    total += lineItem.price * lineItem.quantity
  })
  return total / 100
}

export const OrderProducts = ({lineItems, order}) => {
  let total
  if (order.id) {
    total = calculateTotal(lineItems)
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
            <p>
              Price:{' '}
              {(lineItem.price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </p>
          ) : (
            <p>
              Price:{' '}
              {(lineItem.product.price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </p>
          )}
        </div>
      ))}
      <p>
        Total:{' '}
        {total.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    lineItems: state.lineItems,
    order: state.order
  }
}

export default connect(mapStateToProps)(OrderProducts)
