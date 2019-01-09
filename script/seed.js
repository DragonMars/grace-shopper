const db = require('../server/db/index')
const {green, red} = require('chalk')

const userData = [
  {
    name: 'Geoff',
    email: 'Geoff@isruesdad.gov',
    password: 'rue'
  },
  {
    email: 'cody@email.com',
    password: '123',
    name: 'Cody'
  },
  {
    email: 'murphy@email.com',
    password: '123',
    name: 'Murphy'
  }
]

const productData = [
  {
    name: 'Fred Sloths On a Vine Picture Hangers, Set of 6',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61AZ243PatL._SL1092_.jpg',
    description:
      "Six sloths included in each package 36 inch 'vine' included Everyone's favorite so-so mammal ready to hang onto your pictures 3 different sloth poses Fun and functional",
    price: 10.27
  },
  {
    name: 'Sloth Womens Knee High Sock',
    imageUrl: 'https://www.sockittome.com/images/detailed/1/F0171.jpg',
    description:
      'Feeling lazy? Want everyone to get off your back so you can just hang out? Send out the message strong with our new contest winner Sloth socks. 54% Cotton, 44% Polyester, 2% Spandex.Made in Korea. Our threads are certified by OEKO- TEX® Standard 100, which means we leave out harmful chemicals to keep your skin safe and happy. Approximately fits womens shoe size 5-10.',
    price: 12.0
  }
]

const categoryData = [
  {
    name: 'apparel'
  }
]

const lineItemData = [
  {
    quantity: 2
  }
]

const shippingAddressData = [
  {
    streetAddress: '23232 Yemen Ln',
    city: 'Yemen',
    state: 'California',
    zipcode: '90210'
  }
]

const orderData = [
  {
    stripeTransactionId: 'T123KKBSLFN'
  }
]

const seed = async () => {
  console.log('within seed func')

  await db.sync({force: true})

  const [
    users,
    products,
    categories,
    lineitems,
    shippingAddresses,
    orders
  ] = await Promise.all([
    db.models.user.bulkCreate(userData, {returning: true}),
    db.models.product.bulkCreate(productData, {returning: true}),
    db.models.category.bulkCreate(categoryData, {returning: true}),
    db.models.lineItem.bulkCreate(lineItemData, {returning: true}),
    db.models.shippingAddress.bulkCreate(shippingAddressData, {
      returning: true
    }),
    db.models.order.bulkCreate(orderData, {returning: true})
  ])

  const [geoff, cody, murphy] = users
  const [hangers, socks] = products
  const [apparel] = categories
  const [firstOrderProduct] = lineitems
  const [yemenLn] = shippingAddresses
  const [firstOrder] = orders

  await firstOrder.setUser(geoff)
  await firstOrder.setShippingAddress(yemenLn)
  await firstOrderProduct.setOrder(firstOrder)
  await firstOrderProduct.setProduct(hangers)
  await socks.setCategory(apparel)

  console.log(green('As seedy as Killarny Rose!'))
  db.close()
}

seed().catch(err => {
  console.error(red('not seedy at all!'))
  console.error(err)
  db.close()
})
