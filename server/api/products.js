const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

// GET all products
router.get('/', async (req, res, next) => {
  try {
    if (req.query.category) {
      const productsByCategory = await Product.findAll({
        include: [
          {
            model: Category,
            where: {name: req.query.category}
          }
        ]
      })
      res.json(productsByCategory)
    }
    const products = await Product.findAll({
      include: {model: Category}
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})