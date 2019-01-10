const router = require('express').Router()
const {Order, ShippingAddress, LineItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const newAddress = await ShippingAddress.create({
      name: req.body.shippingAddress.name,
      steetAddress: req.body.shippingAddress.streetAddress,
      city: req.body.shippingAddress.city,
      state: req.body.shippingAddress.state,
      zipcode: req.body.shippingAddress.zipcode
    })
    res.json(newAddress)
  } catch (err) {
    next(err)
  }
})
