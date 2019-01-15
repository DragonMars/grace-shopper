const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

// GET /api/line-items
// gets cart for a single user
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const lineItems = await LineItem.findAll({where: {userId, orderId: null}})
      res.json(lineItems)
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
    const [lineItem, created] = await LineItem.findOrCreate({
      where: {userId, productId}
    })
    const lineItemWithProduct = await LineItem.findById(lineItem.id)
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
    await LineItem.update(
      {quantity: quantity},
      {
        where: {id},
        plain: true
      }
    )
    const lineItemWithProduct = await LineItem.findById(id)
    res.json(lineItemWithProduct)
  } catch (err) {
    next(err)
  }
})

//DELETE /api/line-items/id
//remove from cart
router.delete('/:id', async (req, res, next) => {
  try {
    if (req.user) {
      const {id} = req.params
      const {userId} = req.user
      await LineItem.destroy({
        where: {id, userId, orderId: null}
      })
    }
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
