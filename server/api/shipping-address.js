const router = require('express').Router()
const {Order, ShippingAddress, LineItem} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const newAddress = await ShippingAddress.create({
      name: req.body.name,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    })
    res.json(newAddress)
  } catch (err) {
    next(err)
  }
})
