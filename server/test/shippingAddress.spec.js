/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../db/index')
const Order = db.models.order
const ShippingAddress = db.models.shippingAddress

describe('ShippingAddress model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('validations', () => {
    let address

    before(() => {
      address = ShippingAddress.build()
    })

    it('requires `streetAddress`', async () => {
      try {
        await address.validate()
        throw new Error('Validation succeeded but should have failed')
      } catch (err) {
        expect(err.message).to.contain('streetAddress')
      }
    })
  }) // end describe('validations')
  describe('Address/Order association', () => {
    let newOrder, orderAddress
    beforeEach(async () => {
      newOrder = await Order.create({
        stripeTransactionId: 'T2523NM'
      })
      orderAddress = await ShippingAddress.create({
        streetAddress: '123 Cherry Tree Lane',
        city: 'Pelham',
        state: 'NY',
        zipcode: '10803'
      })
    })

    it('an order returns the correct address after address is set', async () => {
      newOrder.setShippingAddress(orderAddress)
      const newOrderAddress = await newOrder.getShippingAddress()
      expect(newOrderAddress.streetAddress).to.be.equal('123 Cherry Tree Lane')
    })
  }) // end describe('Address/Order association')
}) // end describe('ShippingAddress model')
