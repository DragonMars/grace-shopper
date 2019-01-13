const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

// GET /api/line-items
// get cart
router.get('/', async (req, res, next) => {
  try {
    const userId = 2
    const lineItems = await LineItem.findAll({where: {userId, orderId: null}})
    res.json(lineItems)
  } catch (err) {
    next(err)
  }
})

// POST /api/line-items
// add to cart
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {productId} = req.body
    console.log(productId)
    const lineItem = await LineItem.create({userId, productId})
    lineItemWithProduct = await LineItem.findById(lineItem.id)
    res.status(201).json(lineItemWithProduct)
  } catch (err) {
    next(err)
  }
})

// PUT /api/line-items
// change quantity
router.put('/', async (req, res, next) => {
  try {
    const {id, quantity} = req.body
    const [affectedRow, lineItem] = await LineItem.update(
      {quantity: quantity},
      {
        where: {id},
        returning: true,
        plain: true
      }
    )
    lineItemWithProduct = await LineItem.findById(id)
    res.json(lineItemWithProduct)
  } catch (err) {
    next(err)
  }
})
