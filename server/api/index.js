const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/line-items', require('./line-items'))
router.use('/orders', require('./orders'))
router.use('/shipping-address', require('./shipping-address'))
router.use('/category', require('./category'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
