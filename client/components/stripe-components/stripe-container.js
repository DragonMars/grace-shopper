import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import {Message, Divider} from 'semantic-ui-react'
import {CheckoutForm} from '../index'

export default class StripeContainer extends Component {
  render() {
    return (
      <Message>
        <Message.Header>payment information</Message.Header>
        <Divider />
        <StripeProvider apiKey="pk_test_k1vWjSPlizUvlTz3HOzIKfQd">
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
      </Message>
    )
  }
}
