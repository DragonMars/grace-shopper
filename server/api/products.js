const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

// GET /api/products
//gets all products/or all products in a single category
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
    } else {
      const products = await Product.findAll({
        include: {model: Category}
      })
      res.json(products)
    }
  } catch (err) {
    next(err)
  }
})

//GET /api/products/productID
//gets one product by id
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
