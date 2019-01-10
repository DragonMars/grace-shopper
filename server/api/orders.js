const router = require('express').Router()
const {Order, ShippingAddress, LineItem} = require('../db/models')
module.exports = router

// assume order localStorage is:
// localOrder {
//    productId: quantity,
//    productId: quantity
// }

router.post('/orders', async (req, res, next) => {
  try {
    const localOrder = JSON.parse(localStorage.getItem('localOrder')) //to read the data read the item as string then convert to JSON object
    // assumes localStorage.setItem('localOrders', JSON.stringify(array))
    const newAddress = await ShippingAddress.create({
      steetAddress: req.body.shippingAddress.streetAddress,
      city: req.body.shippingAddress.city,
      state: req.body.shippingAddress.state,
      zipcode: req.body.shippingAddress.zipcode
    }) // should we add name?
    const newOrder = await Order.create({
      stripeTransactionId: localOrder.stripeTransactionId,
      userId: localOrder.userId,
      addressId: newAddress.id
    })
    const newLineItems = await Promise.all(
      localStorage.lineItems.map(lineItem =>
        LineItem.create({
          quantity: lineItem.quantity,
          productId: lineItem.product_id,
          orderId: newOrder.id
        })
      )
    )
    res.json(newLineItems)
  } catch (err) {
    next(err)
  }
})
