import React, {Component} from 'react'
import {connect} from 'react-redux'
import {OrderProducts, ShippingAddressForm} from './index'
import {postOrder} from '../store'
import {Form} from 'semantic-ui-react'
import StripeContainer from './stripe-components/StripeContainer'
import {Redirect} from 'react-router-dom'

class Checkout extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      redirect: false
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postOrder(
      this.props.cartItems,
      this.props.shippingAddress.id,
      this.props.userId
    )
    this.setState({redirect: true})
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
        {/* add Stripe - research Stripe UI */}
        <OrderProducts />
        {/* order products will be hooked up to the LineItem model with a GET route */}
        <StripeContainer />
        <Form onSubmit={this.handleSubmit}>
          <Form.Button>Place Your Order</Form.Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shippingAddress: state.shippingAddress.shippingAddress,
    cartItems: state.lineItems,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postOrder: (order, id) => dispatch(postOrder(order, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
