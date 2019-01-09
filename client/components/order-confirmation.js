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
  return (
    <div>
      <h1>Thank you for your order!</h1>
      <p>
        Your order has been placed and will arrive on{' '}
        {arrivalDate.toDateString()}.
      </p>
      <h2>Order Details:</h2>
      {order.lineItems.map(lineItem => (
        <div key={lineItem.id}>
          <h4>{lineItem.product.name}</h4>
          <img src={lineItem.product.imageUrl} height="200px" width="auto" />

          <p>quantity: {lineItem.quantity} </p>
          <p>price: ${lineItem.product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default OrderConfirmation
