const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

// GET all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: {model: Category}
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET products by category
router.get('/:category', async (req, res, next) => {
  try {
    const productsByCategory = await Product.findAll({
      include: [
        {
          model: Category,
          where: {name: req.params.category}
        }
      ]
    })
    res.send(productsByCategory)
  } catch (err) {
    next(err)
  }
})
