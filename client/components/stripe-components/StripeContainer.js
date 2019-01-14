import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

export default class StripeContainer extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_k1vWjSPlizUvlTz3HOzIKfQd">
        <div className="ui label">
          <h1>Stripe Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}
