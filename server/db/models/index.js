const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const LineItem = require('./line-items')
const Order = require('./order')
const ShippingAddress = require('./shippingAddress')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
User.hasMany(Order)
Order.belongsTo(User)

ShippingAddress.hasMany(Order)
Order.belongsTo(ShippingAddress)

Order.hasMany(LineItem)
LineItem.belongsTo(Order)

Product.hasMany(LineItem)
LineItem.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

// instance method to get total amout of each line item
LineItem.prototype.getTotal = async lineItem => {
  const price = await Product.findById(lineItem.productId).price
  return price * lineItem.quantity
}

// eager load all product info for each line item
const getProducts = async () => {
  const products = await LineItem.findAll({include: [{model: Product}]})
  return products
}

module.exports = {
  User,
  Category,
  Product,
  LineItem,
  Order,
  ShippingAddress,
  getProducts
}
