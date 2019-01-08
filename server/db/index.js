const db = require('./db')
const Category = require('./models/category')
const Product = require('./models/product')
const LineItem = require('./models/line-items')

// register models
require('./models')

module.exports = db
