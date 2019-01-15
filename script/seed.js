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
    name: 'Sloth Hanging Planter',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/48279103_004_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'planter',
    description:
      'Lazy little sloth-shaped planter hanging around like a hammock for your favorite succulents. Shiny ceramic planter with etched detailing and twine for hanging.',
    price: 1699
  },
  {
    name: 'Sloth Duvet Cover',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/45384708_018_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'sloth duvet cover',
    description:
      'Need some nap time inspiration? Just look to the assorted sloths print on this cotton duvet cover for an instant chill-out. With a solid back for a reversible finish, equipped with hidden side openings for easily removing from your duvet to wash; duvet insert sold separately.',
    price: 12000
  },
  {
    name: 'Sloth Life iPhone 6/7/8 Case',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/47028766_100_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'phone case',
    description:
      'Just hangin’ around with this sloth patterned, clear hard shell phone case. Easily snaps on to protect phone edges from bumps + scratches with a transparent finish to show off your phone underneath.',
    price: 1715
  },
  {
    name: 'Sloth Tube Tee',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/47335534_085_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'sloth onesie',
    description:
      'Lazy days in this sloth t-shirt from Altru Apparel. Cut in a standard fit and finished with a banded crew neck.',
    price: 2999
  },
  {
    name: 'Surfing Sloth Tandem Sloth Art Print',
    imageUrl:
      'https://images.urbanoutfitters.com/is/image/UrbanOutfitters/37491271_095_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    altText: 'sloth art print',
    description:
      'Sloth-it-like-its-hot-exclusive print from Luka Va at Surfing Sloth, who juxtaposes elements of nature with a busy + urban landscape to create unique prints. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.',
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
  },
  {
    name: 'décor'
  },
  {
    name: 'home'
  },
  {
    name: 'tech'
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

  const [geoff] = users
  const [
    planter,
    duvet,
    phoneCase,
    Tee,
    tandem,
    showerCurtain,
    furryPillow,
    partyPillow,
    pushie,
    bathMat,
    mug1,
    mug2,
    pad,
    powerBank,
    yoga
  ] = products
  const [apparel, accessories, décor, home, tech] = categories
  const [firstOrderProduct] = lineitems
  const [yemenLn] = shippingAddresses
  const [firstOrder] = orders

  await firstOrder.setUser(geoff)
  await firstOrder.setShippingAddress(yemenLn)
  await firstOrderProduct.setOrder(firstOrder)
  await firstOrderProduct.setProduct(planter)
  await duvet.setCategory(home)
  await phoneCase.setCategory(tech)
  await Tee.setCategory(apparel)
  await planter.setCategory(home)
  await tandem.setCategory(décor)
  await showerCurtain.setCategory(home)
  await furryPillow.setCategory(décor)
  await partyPillow.setCategory(décor)
  await pushie.setCategory(accessories)
  await bathMat.setCategory(home)
  await mug1.setCategory(home)
  await mug2.setCategory(home)
  await pad.setCategory(accessories)
  await powerBank.setCategory(tech)
  await yoga.setCategory(décor)

  console.log(green('As seedy as Killarny Rose! (Seed Successful)'))
  db.close()
}

seed().catch(err => {
  console.error(red('Not seedy at all! (Seed Failed)'))
  console.error(err)
  db.close()
})
