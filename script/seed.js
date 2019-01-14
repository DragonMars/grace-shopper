const db = require('../server/db/index')
const {green, red} = require('chalk')

const userData = [
  {
    email: 'Geoff@isruesdad.gov',
    password: 'rue',
    isAdmin: true
  },
  {
    email: 'cody@email.com',
    password: '123'
  },
  {
    email: 'murphy@email.com',
    password: 'jkl'
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
  },
  {
    name: 'Surfing Sloth Tandem Sloth Art Print',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/37491271_095_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'sloth art print',
    description:
      'Sloth-like-its-hot-exclusive print from Luka Va at Surfing Sloth, who juxtaposes elements of nature with a busy + urban landscape to create unique prints. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.',
    price: 2999
  },
  {
    name: 'Sloths Shower Curtain',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/45304920_000_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'sloth shower curtain',
    description:
      'Soft cotton shower curtain print with an allover sloth pattern. Topped with holes for hanging from any of our shower hooks; sold separately.',
    price: 3999
  },
  {
    name: 'Furry Sloth Pillow',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/43515592_014_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'furry sloth pillow',
    description:
      'Lazy days are better with this fuzzy sloth pillow in a big, cushy shape that is perfect to spoon or sit up with. Complete with embroidered details and plush allover faux fur!',
    price: 4999
  },
  {
    name: 'Party Sloth Pillow',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/47645908_020_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'party sloth pillow',
    description:
      'Just hanging around with this super fluffy sloth pillow that’s ready to party. Plush pillow in a big, cushy shape that is perfect to cuddle with. Complete with embroidered details and allover faux fur!',
    price: 4999
  },
  {
    name: 'Mini Sloth Pushie',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/50441468_004_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'mini sloth',
    description:
      'The cutest little animal bean bag plushies, made super mini in a soft, squishable design that’s cuter than you can even believe. With felted accents + stretchy loop you can attach to your keychain, bag strap, belt loop + more.',
    price: 699
  },
  {
    name: 'Let’s Hang Bath Mat',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/49555691_015_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'sloth bath mat',
    description:
      'Just hanging around like a happy little sloth with this cuddly bath mat. Made from a plushy cotton terry with a non-slip backing + shaped design.',
    price: 3999
  },
  {
    name: 'Sloth-Shaped Mug',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/46197109_012_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'sloth shape mug',
    description:
      "Make your morning cup o’ joe feel even more like a hug with this sloth-shaped mug, found exclusively at Sloth Like It's Hot. Speckled ceramic mug with a matte finish. Food safe.",
    price: 1699
  },
  {
    name: 'Etched Sloth Mug',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/45130846_010_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'etched sloth mug',
    description:
      'Genuine china mug etched with a bunch of sloths just hanging out! Please note, color may vary with a blue tone from what is pictured due to glazed finish. Food safe.',
    price: 1299
  },
  {
    name: 'Huggable Sloth Cooling + Heating Pad',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/47489257_004_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'sloth pad',
    description:
      'Heat up, hug + laze around with this sloth plushie for warmth and relaxation whenever you need it! Microwave it to keep you warm or even freeze it to cool you off. Filled with natural buckwheat grains and lavender said to help soothe sore spots, too.',
    price: 2999
  },
  {
    name: 'MojiPower Sloth Portable Power Bank',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/48787782_020_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'sloth power bank',
    description:
      'Speed up your tech with your slowest buddy clinging on thanks to this sloth-shaped portable power bank from MojiPower. Design hugs the side of your phone. Compatible with iOS and Android devices to provide up to 1.5x full charge when your device is losing steam.',
    price: 2899
  },
  {
    name: 'Huebucket Sloth Yoga Art Print',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/48704787_010_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'sloth yogo art print',
    description:
      'Your favorite little lazy sloth friend twisting into every yoga position imaginable with this graphic art print by Huebucket. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. ',
    price: 2999
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
