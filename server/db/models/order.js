const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  stripeTransactionId: {
    type: Sequelize.STRING
  }
})
