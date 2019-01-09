import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const order = {
  id: 1,
  stripeTransactionId: 'T123KKBSLFN',
  createdAt: '2019-01-09T17:35:23.096Z',
  updatedAt: '2019-01-09T17:35:23.129Z',
  userId: 1,
  shippingAddressId: 1,
  lineItems: [
    {
      id: 2,
      quantity: 1,
      createdAt: '2019-01-09T19:44:41.987Z',
      updatedAt: '2019-01-09T19:44:42.026Z',
      orderId: 1,
      productId: 2,
      product: {
        id: 2,
        name: 'Sloth Womens Knee High Sock',
        imageUrl: 'https://www.sockittome.com/images/detailed/1/F0171.jpg',
        description:
          'Feeling lazy? Want everyone to get off your back so you can just hang out? Send out the message strong with our new contest winner Sloth socks. 54% Cotton, 44% Polyester, 2% Spandex.Made in Korea. Our threads are certified by OEKO- TEX® Standard 100, which means we leave out harmful chemicals to keep your skin safe and happy. Approximately fits womens shoe size 5-10.',
        price: 12,
        createdAt: '2019-01-09T19:50:27.855Z',
        updatedAt: '2019-01-09T19:50:27.903Z',
        categoryId: 1
      }
    },
    {
      id: 1,
      quantity: 2,
      createdAt: '2019-01-09T17:39:25.033Z',
      updatedAt: '2019-01-09T17:39:25.073Z',
      orderId: 1,
      productId: 1,
      product: {
        id: 1,
        name: 'Fred Sloths On a Vine Picture Hangers, Set of 6',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/61AZ243PatL._SL1092_.jpg',
        description:
          "Six sloths included in each package 36 inch 'vine' included Everyone's favorite so-so mammal ready to hang onto your pictures 3 different sloth poses Fun and functional",
        price: 10.27,
        createdAt: '2019-01-09T17:40:26.906Z',
        updatedAt: '2019-01-09T17:40:26.906Z',
        categoryId: null
      }
    }
  ],
  shippingAddress: {
    id: 1,
    streetAddress: '23232 Yemen Ln',
    city: 'Yemen',
    state: 'California',
    zipcode: '90210',
    createdAt: '2019-01-09T17:35:23.095Z',
    updatedAt: '2019-01-09T17:35:23.095Z'
  }
}

const OrderConfirmation = () => {
  const arrivalDate = new Date()
  arrivalDate.setDate(arrivalDate.getDate() + 2)
  const {lineItems, shippingAddress} = order

  return (
    <div>
      <h1>Thank you for your order!</h1>
      <p>
        Your order has been placed and will at {shippingAddress.streetAddress}{' '}
        arrive on {arrivalDate.toDateString()}.
      </p>
      <h2>Order Details:</h2>
      {lineItems.map(lineItem => (
        <div key={lineItem.id}>
          <h4>{lineItem.product.name}</h4>
          <img src={lineItem.product.imageUrl} height="200px" width="auto" />

          <p>quantity: {lineItem.quantity} </p>
          <p>price: ${lineItem.product.price}</p>
        </div>
      ))}
      {/* <p>Total: ${order.calculateTotal()}</p> */}
    </div>
  )
}

export default OrderConfirmation