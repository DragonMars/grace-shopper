import React, {Component} from 'react'
import {connect} from 'react-redux'

const calculateTotal = function(lineItems) {
  let total = 0
  lineItems.forEach(lineItem => {
    total += lineItem.price * lineItem.quantity
  })
  return total / 100
}

class OrderProducts extends Component {
  render() {
    let total
    const {lineItems, order} = this.props
    if (order.id) {
      total = calculateTotal(order, lineItems)
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
}

const mapStateToProps = state => {
  return {
    lineItems: state.lineItems,
    order: state.order
  }
}

export default connect(mapStateToProps)(OrderProducts)
