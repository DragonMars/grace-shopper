const router = require('express').Router()
const {Order, LineItem} = require('../db/models')
module.exports = router
const stripe = require('stripe')(process.env.stripeToken)

//GET /api/order/admin - shows all orders
router.get('/admin', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const orders = await Order.findAll()
      res.json(orders)
    } else {
      res.status(418).send('get outta here')
    }
  } catch (err) {
    next(err)
  }
})

//GET /api/orders/orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const {user} = req
    if (user) {
      const userId = user.id
      const {orderId} = req.params
      const order = await Order.findById(orderId)
      if (order.userId === userId || user.isAdmin) {
        res.json(order)
      } else {
        res
          .status(403)
          .send('You do not have authorization to view these order details.')
      }
    } else {
      res
        .status(401)
        .send('You do not have authorization to view these order details.')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const orders = await Order.findAll({where: {userId: req.user.id}})
      res.json(orders)
    } else {
      res.status(401).send('You must be logged in to see your order history')
    }
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
