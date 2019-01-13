const router = require('express').Router()
const {Order, ShippingAddress, LineItem, Product} = require('../db/models')
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
    if (req.user) {
      console.log('order route req.body ', req.body)
      const newOrder = await Order.create({
        stripeTransactionId: '297379GHKOU0', // ???
        userId: req.user.id,
        shippingAddressId: req.body.shippingAddressId
      })
      console.log('newOrder is ', newOrder)
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
      console.log('orderLineItems is ', orderLineItems)
      res.json(orderLineItems[1])

      /*

      localStorageCart = {
        1: {quantity: 2},
        2: {quantity: 3},
        4: {quantity: 4}
      }

      */
    } else {
      const newOrder = await Order.create({
        stripeTransactionId: '297379GHKOU0', // ???
        userId: null,
        shippingAddressId: req.body.shippingAddressId
      })
      const newLineItemDataWithPrice = req.body.lineItemData.map(
        async lineItem => {
          const idx = lineItem.productId
          const product = await Product.findById(idx)
          const newLineItem = await LineItem.create({
            quantity: lineItem.quantity,
            price: product.price,
            productId: product.id,
            orderId: newOrder.id
          })
          return newLineItem
        }
      )
      res.json(newLineItemDataWithPrice)
    }
  } catch (err) {
    next(err)
  }
})
