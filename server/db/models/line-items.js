const db = require('../db')
const Sequelize = require('sequelize')

//note that the "price" field is not include here but will be generated through eager loading in db/index.js

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    notNull: true
  }
})

module.exports = LineItem
