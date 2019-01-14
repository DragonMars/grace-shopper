import React from 'react'
import {OrderProducts} from './index'
import {Container, Header} from 'semantic-ui-react'

const OrderConfirmation = () => {
  const arrivalDate = new Date()
  arrivalDate.setDate(arrivalDate.getDate() + 2)
  const {lineItems, shippingAddress} = order

  return (
    <Container>
      <Header as="h1">Thank you for your order!</Header>
      <p>
        Your order has been placed and will at {shippingAddress.streetAddress}{' '}
        arrive on {arrivalDate.toDateString()}.
      </p>
      <Header as="h2">Order Details:</Header>
      <OrderProducts lineItems={lineItems} order={order} />
    </Container>
  )
}

export default OrderConfirmation
