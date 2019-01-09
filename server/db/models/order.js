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

module.exports = Order
