const Sequelize = require('sequelize')
const db = require('../db')
const ShippingAddress = require('./shippingAddress')
const LineItem = require('./line-items')

const Order = db.define(
  'order',
  {
    stripeTransactionId: {
      type: Sequelize.STRING
    }
  },
  {
    defaultScope: {
      include: [{model: ShippingAddress}, {model: LineItem}]
    }
  }
)

Order.prototype.calculateTotal = function() {
  let total = 0
  this.lineItems.forEach(lineItem => {
    total += lineItem.product.price * lineItem.quantity
  })
  return total / 100
}

module.exports = Order
