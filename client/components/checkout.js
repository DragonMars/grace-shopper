import React, {Component} from 'react'
import {connect} from 'react-redux'
import {OrderProducts, ShippingAddressForm} from './index'
import {postOrder, clearStripeToken} from '../store'
import {Form, Message, Label} from 'semantic-ui-react'
import StripeContainer from './stripe-components/StripeContainer'
import {Redirect} from 'react-router-dom'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      missingInfoError: false,
      redirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (!this.props.stripeToken.length || !this.props.shippingAddress.id) {
      this.setState({missingInfoError: true})
    } else {
      this.setState({redirect: true})
      await this.props.postOrder(
        this.props.cartItems,
        this.props.shippingAddress.id,
        this.props.userId
      )
      this.props.clearStripeToken()
    }
  }

  render() {
    const {redirect} = this.state

    if (redirect) {
      return <Redirect to="/success" />
    }
    return (
      <div>
        <h1>Checkout</h1>
        <ShippingAddressForm />
        <OrderProducts />
        {/* order products is hooked up to the LineItem model with a GET route */}
        <StripeContainer />
        <Form onSubmit={this.handleSubmit}>
          {this.state.missingInfoError === true ? (
            <Label basic color="red" pointing="below">
              Please enter both a shipping address and credit card info!
            </Label>
          ) : (
            <br />
          )}
          <Form.Button
            disabled={
              !this.props.stripeToken.length || !this.props.shippingAddress.id
            }
          >
            Place Your Order
          </Form.Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shippingAddress: state.shippingAddress.shippingAddress,
    cartItems: state.lineItems,
    userId: state.user.id,
    stripeToken: state.stripeToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postOrder: (order, id) => dispatch(postOrder(order, id)),
    clearStripeToken: () => dispatch(clearStripeToken())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
