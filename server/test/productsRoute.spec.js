const expect = require('chai').expect
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request.agent(app)
const Product = db.model('product')
const Category = db.model('category')

describe('Product routes', () => {
  before(() => {
    return db.sync({force: true})
  })

  afterEach(() => {
    return Promise.all([Product.truncate({cascade: true})])
  })

  describe('GET /api/products', () => {
    it('responds with an array of all products via JSON', async () => {
      await Product.create({
        name: 'mug',
        imageUrl: 'default',
        description: 'fun',
        price: 2
      })
      await Product.create({
        name: 'mug2',
        imageUrl: 'default',
        description: 'more fun',
        price: 6
      })

      const res = await agent
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body).to.have.length(2)
    })
  }) // end describe 'api/products'

  describe('GET /products/:category', () => {
    beforeEach(async () => {
      const product = await Product.create({
        name: 'mug',
        imageUrl: 'default',
        description: 'fun',
        price: 2
      })
      const category = await Category.create({
        name: 'funStuff'
      })
      await product.setCategory(category)
    })

    it('return array of products JSON based on the category', async () => {
      const res = await agent.get('/api/products/funStuff').expect(200)

      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body).to.have.length(1)
      expect(res.body[0].name).to.equal('mug')
    })
  })
}) // end describe 'product routes'
