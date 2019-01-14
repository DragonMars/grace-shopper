import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {connect} from 'react-redux'
import {Container, Form} from 'semantic-ui-react'
import {gotStripeToken} from '/Users/laurawaters/Documents/GH1810/SeniorPhase/grace-shopper/client/store/stripe-token.js'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  async handleSumbit(event) {
    console.log('in handle submit')
    const {token} = await this.props.stripe.createToken({name: 'Name'})
    //if token exists, everything was processed without issue and we should use redux to store this until we can make an axios request
    //TODO make store file for stripe-token.js with reducer to store this on redux store (will not persist).
    //token.id is what we're storing
    //then render "payment complete!"
    if (token) {
      console.log('create token response', token)
      this.props.gotStripeToken(token.id)
      console.log()
    } else {
      //if token is undefined, then the payment didn't go through
      //TODO render error message
      console.log('invalid payment')
    }
  }

  render() {
    if (this.props.stripeToken.length) {
      return (
        <Container>
          <div className="ui label">
            Valid credit info, please press "Complete Purchase" to finalize your
            order!
          </div>
        </Container>
      )
    } else {
      return (
        <Container>
          <div className="ui label">Please enter your credit card info!</div>
          <CardElement />
          <Form onSubmit={this.handleSumbit}>
            <Form.Button>Send</Form.Button>
          </Form>
        </Container>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    stripeToken: state.stripeToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotStripeToken: token => dispatch(gotStripeToken(token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  injectStripe(CheckoutForm)
)
// export default injectStripe(CheckoutForm)
