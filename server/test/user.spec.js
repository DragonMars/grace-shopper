/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../db/index')
const User = db.models.user

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        try {
          cody = await User.create({
            email: 'cody@puppybook.com',
            password: 'bones',
            name: 'Cody'
          })
        } catch (error) {
          console.error(error.message)
        }
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
