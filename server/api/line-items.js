const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

// GET /api/line-items
// get cart
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const lineItems = await LineItem.findAll({where: {userId, orderId: null}})
    res.json(lineItems)
  } catch (err) {
    next(err)
  }
})

//get order

// POST /api/line-items
// add to cart
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {productId} = req.body
    const lineItem = await LineItem.create({userId, productId})
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

router.delete('/:productId', async (req, res, next) => {
  try {
    //if a user is logged in, delete from database
    const numberAffectedRows = await LineItem.destroy({
      where: {
        productId: req.params.productId,
        userId: req.user.id
      }
    })

    //send back the id
    res.json(req.params.productId)
  } catch (err) {
    next(err)
  }
})
