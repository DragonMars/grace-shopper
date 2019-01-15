import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {connect} from 'react-redux'
import {Container, Form, Divider, Label} from 'semantic-ui-react'
import {gotStripeToken} from '../../store'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stripeError: false
    }
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  async handleSumbit(event) {
    const {token} = await this.props.stripe.createToken({name: 'Name'})
    if (token) {
      this.props.gotStripeToken(token.id)
    } else {
      this.setState({
        stripeError: true
      })
    }
  }

  render() {
    if (this.props.stripeToken.length) {
      return (
        <Container>
          <div className="ui label">
            Valid credit info, please press "Place Your Order" to finalize your
            purchase!
          </div>
        </Container>
      )
    } else {
      return (
        <Container>
          <CardElement />
          <Divider />
          <Form onSubmit={this.handleSumbit}>
            <Form.Button color="teal">Use this card</Form.Button>
            {this.state.stripeError === true ? (
              <Label basic color="red" pointing>
                Please enter valid credit information!
              </Label>
            ) : (
              <br />
            )}
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
