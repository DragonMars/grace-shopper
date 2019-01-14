const router = require('express').Router()
const {Order, LineItem} = require('../db/models')
module.exports = router
const stripe = require('stripe')('sk_test_E7S8wDRxDd6WZNERgFE92BK7')

router.post('/', async (req, res, next) => {
  try {
    //get total price of cart items
    const total = req.body.cartItems.reduce(
      (acc, cur) => acc + cur.product.price * cur.quantity,
      0
    )
    //create stripe charge
    await stripe.charges.create({
      amount: total,
      currency: 'usd',
      description: 'a test charge',
      source: req.body.stripeToken
    })
    let newOrder
    if (req.user) {
      newOrder = await Order.create({
        stripeTransactionId: req.body.stripeToken,
        userId: req.user.id,
        shippingAddressId: req.body.shippingAddressId
      })

      const {cartItems} = req.body
      cartItems.map(async cartItem => {
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
    } else {
      newOrder = await Order.create({
        stripeTransactionId: req.body.stripeToken,
        userId: null,
        shippingAddressId: req.body.shippingAddressId
      })
      console.log(req.body.lineItemData)
      req.body.cartItems.map(async lineItem => {
        const newLineItem = await LineItem.create({
          quantity: lineItem.quantity,
          price: lineItem.product.price,
          productId: lineItem.productId,
          orderId: newOrder.id
        })
        return newLineItem
      })
    }
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})
