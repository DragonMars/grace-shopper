const db = require('../db')
const Sequelize = require('sequelize')
const Product = require('./product')

const LineItem = db.define(
  'lineItem',
  {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1
      }
    },
    price: {
      type: Sequelize.INTEGER //price in cents
      //should be null for all open orders to allow for future changes in price
    }
  },
  {
    defaultScope: {
      include: [{model: Product}]
    }
  }
)

module.exports = LineItem
