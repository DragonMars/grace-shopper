const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const users = await User.findAll({
          // explicitly select only the id and email fields - even though
          // users' passwords are encrypted, it won't help if we just
          // send everything to anyone who asks!
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
