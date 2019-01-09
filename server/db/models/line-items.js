const db = require('../db')
const Sequelize = require('sequelize')
const Product = require('./product')

//note that the "price" field is not include here but will be generated through eager loading in db/index.js

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
      //should be null for all open orders
    }
  },
  {
    defaultScope: {
      include: [{model: Product}]
    }
  }
)

module.exports = LineItem
