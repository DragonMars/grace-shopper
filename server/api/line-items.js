const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

// GET /api/line-items
// get cart
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const lineItems = await LineItem.findAll({
        where: {userId, orderId: null}
      })
      res.json(lineItems)
    } else {
      res.sendStatus(401)
    }
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
    console.log(req.body)
    const lineItem = await LineItem.create({userId, productId})
    res.status(201).json(lineItem)
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
      {quantity},
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