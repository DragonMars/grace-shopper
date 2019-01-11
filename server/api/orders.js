const router = require('express').Router()
const {Order, ShippingAddress, LineItem} = require('../db/models')
module.exports = router

// assume order localStorage is:
// localOrder {
//    productId: quantity,
//    productId: quantity
// } const localOrder = JSON.parse(localStorage.getItem('localOrder'))
// const newLineItems = await Promise.all(
//   localStorage.lineItems.map(lineItem =>
//     LineItem.create({
//       quantity: lineItem.quantity,
//       productId: lineItem.product_id,
//       orderId: newOrder.id
//     })
//   )
// )

router.post('/', async (req, res, next) => {
  try {
    //to read the data read the item as string then convert to JSON object
    // assumes localStorage.setItem('localOrders', JSON.stringify(array))

    const newOrder = await Order.create({
      stripeTransactionId: '297379GHKOU0', // ???
      userId: req.user.id,
      addressId: req.body.shippingAddress.id
    })
    const orderLineItems = await LineItem.update(
      {
        orderId: newOrder.id,
        userId: null
      },
      {
        where: {
          userId: req.user.id
        },
        returning: true,
        plain: true
      }
    )
    res.json(orderLineItems[1])
  } catch (err) {
    next(err)
  }
})
