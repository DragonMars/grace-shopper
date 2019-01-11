const router = require('express').Router()
const LineItems = require('../db/models')
module.exports = router

// GET /api/line-items
// get cart
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const lineItems = await LineItems.findAll({where: {userId, orderId: null}})
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
    const lineItem = await LineItems.create({userId, productId})
    res.status(201)
    res.json(lineItem)
  } catch (err) {
    next(err)
  }
})

// PUT /api/line-items
// change quantity
router.put('/', async (req, res, next) => {
  try {
    const {id, newQuantity} = req.body
    const [affectedRow, lineItem] = await LineItems.update(
      {quantity: newQuantity},
      {
        where: {id},
        returning: true,
        plain: true
      }
    )
    res.json(lineItem)
  } catch (err) {
    next(err)
  }
})
