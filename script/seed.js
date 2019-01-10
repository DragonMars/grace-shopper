const db = require('../server/db/index')
const {green, red} = require('chalk')

const userData = [
  {
    email: 'Geoff@isruesdad.gov',
    password: 'rue',
    name: 'Geoff',
    isAdmin: true
  },
  {
    email: 'cody@email.com',
    password: '123',
    name: 'Cody'
  },
  {
    email: 'murphy@email.com',
    password: 'jkl',
    name: 'Murphy'
  }
]

const productData = [
  {
    name: 'Fred Sloths On a Vine Picture Hangers, Set of 6',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61AZ243PatL._SL1092_.jpg',
    altText: 'adorable sloth hangers',
    description:
      "Six sloths included in each package 36 inch 'vine' included Everyone's favorite so-so mammal ready to hang onto your pictures 3 different sloth poses Fun and functional",
    price: 1027
  },
  {
    name: 'Sloth Womens Knee High Sock',
    imageUrl: 'https://www.sockittome.com/images/detailed/1/F0171.jpg',
    altText: 'purple socks featuring sloths hanging from vines',
    description:
      'Feeling lazy? Want everyone to get off your back so you can just hang out? Send out the message strong with our new contest winner Sloth socks. 54% Cotton, 44% Polyester, 2% Spandex.Made in Korea. Our threads are certified by OEKO- TEX® Standard 100, which means we leave out harmful chemicals to keep your skin safe and happy. Approximately fits womens shoe size 5-10.',
    price: 1200
  },
  {
    name: 'Sloth Infinity Scarf',
    imageUrl:
      'https://i.etsystatic.com/13290041/r/il/edb205/1461060044/il_570xN.1461060044_3cvv.jpg',
    altText: 'knitted jersey infinity scarf',
    description:
      'A handmade Infinity Scarf made from either a soft high quality knitted jersey fabric or a floaty chiffon fabric, with this funky design you are sure to turn some heads! Perfect for every occasion!',
    price: 1715
  },
  {
    name: 'Sloth Kigurumi Onesie Costume',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81%2BnmF2J9ZL._UY741_.jpg',
    altText: 'sloth onesie',
    description:
      'Think you are the expert on being lazy? THINK AGAIN! You are nowhere near being the ultimate lazibutt without the Sloth Kigurumi! The soft fleece material, the easy-to-wear button opening, the oh-so adorable three finger sleeve, those cute droopy eyes...it just screams-I mean yawns laziness? And we mean that in a good way! Prepare to spend your Fridays, Saturdays, Sundays, Mondays, Tuesdays... EVERYDAY actually, snuggled up in your Sloth Kigurumi and just being plain lazy! Be proud my fellow lazibutts!',
    price: 5999
  }
]

const categoryData = [
  {
    name: 'apparel'
  },
  {
    name: 'accessories'
  }
]

const lineItemData = [
  {
    quantity: 2,
    price: 1027
  },
  {
    quantity: 1,
    price: 1200
  },
  {
    quantity: 3,
    price: 1715
  },
  {
    quantity: 4,
    price: 5999
  }
]

const shippingAddressData = [
  {
    name: 'Q Liu',
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
  const [hangers, socks, scarf, onesie] = products
  const [apparel, accessories] = categories
  const [
    firstOrderProduct,
    secondOrderProduct,
    firstCartProduct,
    secondCartProduct
  ] = lineitems
  const [yemenLn] = shippingAddresses
  const [firstOrder] = orders

  await firstOrder.setUser(geoff)
  await firstOrder.setShippingAddress(yemenLn)
  await firstOrderProduct.setOrder(firstOrder)
  await secondOrderProduct.setOrder(firstOrder)
  await firstOrderProduct.setProduct(hangers)
  await secondOrderProduct.setProduct(socks)
  await socks.setCategory(apparel)
  await scarf.setCategory(apparel)
  await onesie.setCategory(apparel)
  await hangers.setCategory(accessories)
  await firstCartProduct.setProduct(scarf)
  await secondCartProduct.setProduct(onesie)
  await firstCartProduct.setUser(cody)
  await secondCartProduct.setUser(murphy)

  console.log(green('As seedy as Killarny Rose!'))
  db.close()
}

seed().catch(err => {
  console.error(red('not seedy at all!'))
  console.error(err)
  db.close()
})
