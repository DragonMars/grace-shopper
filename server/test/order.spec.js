/* global describe beforeEach it */

const expect = require('chai').expect
const db = require('../db/index')
const User = db.models.user
const Order = db.models.order

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('User/Order association', () => {
    let jenn, newOrder
    beforeEach(async () => {
      jenn = await User.create({
        email: 'jenn@slothlover.com',
        password: 'slothsforever',
        name: 'Jenn'
      })
      newOrder = await Order.create({
        stripeTransactionId: 'T2523NM'
      })
    })

    it('returns the correct user after user is set', async () => {
      newOrder.setUser(jenn)
      const newOrderUser = await newOrder.getUser()
      expect(newOrderUser.name).to.be.equal('Jenn')
    })
  }) // end describe('User/Order association')
}) // end describe('Order model')
