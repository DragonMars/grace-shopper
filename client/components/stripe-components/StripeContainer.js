import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import {Message, Divider} from 'semantic-ui-react'

export default class StripeContainer extends Component {
  render() {
    return (
      <Message>
        <Message.Header>
          Please enter your credit card info below!
        </Message.Header>
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
