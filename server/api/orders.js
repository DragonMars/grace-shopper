const router = require('express').Router()
const {Order, ShippingAddress, LineItem, Product} = require('../db/models')
module.exports = router
const stripe = require('stripe')('sk_test_E7S8wDRxDd6WZNERgFE92BK7')

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

router.get('/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id
    const {data} = Order.findById(orderId)
    res.json(data)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    //get total price of cart items
    const total = req.body.cartItems.reduce(
      (acc, cur) => acc + cur.product.price * cur.quantity,
      0
    )

    //create stripe charge
    const response = await stripe.charges.create({
      amount: total,
      currency: 'usd',
      description: 'a test charge',
      source: req.body.stripeToken
    })

    if (req.user) {
      const newOrder = await Order.create({
        stripeTransactionId: req.body.stripeToken,
        userId: req.user.id,
        shippingAddressId: req.body.shippingAddressId
      })

      const {cartItems} = req.body
      const updatedLineItems = cartItems.map(async cartItem => {
        const [rowsAffected, updatedLineItem] = await LineItem.update(
          {
            orderId: newOrder.id,
            userId: null,
            price: cartItem.product.price
          },
          {where: {id: cartItem.id}, returning: true, plain: true}
        )
        return updatedLineItem
      })
      res.json(newOrder)
    } else {
      const newOrder = await Order.create({
        stripeTransactionId: req.body.stripeToken,
        userId: null,
        shippingAddressId: req.body.shippingAddressId
      })
      console.log(req.body.lineItemData)
      const newLineItemDataWithPrice = req.body.cartItems.map(
        async lineItem => {
          // const idx = lineItem.productId
          // const product = await Product.findById(idx)
          const newLineItem = await LineItem.create({
            quantity: lineItem.quantity,
            price: lineItem.product.price,
            productId: lineItem.productId,
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
