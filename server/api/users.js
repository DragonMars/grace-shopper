const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const users = await User.findAll({
          // explicitly select only the id and email fields
          attributes: ['id', 'email']
        })
        res.json(users)
      } else {
        res.status(401).send('You are not authorized to view this page.')
      }
    } else {
      res.status(401).send('You are not authorized to view this page.')
    }
  } catch (err) {
    next(err)
  }
})
