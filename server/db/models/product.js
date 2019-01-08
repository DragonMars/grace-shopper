const db = require('../db')
const Sequelize = require('sequelize')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    notNull: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    notNull: true
  },
  description: {
    type: Sequelize.TEXT,
    notNull: true
  },
  price: {
    type: Sequelize.FLOAT,
    notNull: true
  }
})

module.exports = Product
