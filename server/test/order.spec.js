/* global describe beforeEach it */

const expect = require('chai').expect
const db = require('../db/index')
const User = db.models.user
const Order = db.models.order
const Product = db.models.product
const LineItem = db.models.lineItem

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => {
    return db.sync({force: true})
  })

  describe('User/Order association', () => {
    let jen
    let newOrder
    let product
    let orderProduct

    beforeEach(async () => {
      try {
        jen = await User.create({
          email: 'jen@slothlover.com',
          password: 'slothsforever'
        })
        newOrder = await Order.create({
          stripeTransactionId: 'T2523NM'
        })
        product = await Product.create({
          name: 'coolProduct',
          description: 'a cool product',
          price: 2,
          imageUrl: 'https://www.sockittome.com/images/detailed/1/F0171.jpg'
        })
        orderProduct = await LineItem.create({
          quantity: 1
        })
        await orderProduct.setOrder(newOrder)
        await orderProduct.setProduct(product)
      } catch (error) {
        console.error(error.message)
      }
    })

    it('returns the correct user after user is set', async () => {
      newOrder.setUser(jen)
      const newOrderUser = await newOrder.getUser()
      expect(newOrderUser.email).to.be.equal('jen@slothlover.com')
    })
  }) // end describe('User/Order association')
}) // end describe('Order model')
