import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Container, Header, Button} from 'semantic-ui-react'
import {OrderProducts} from './index'
import {clearCart} from '../store'

class OrderConfirmation extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      redirect: false
    }
  }

  handleClick(event) {
    event.preventDefault()
    this.props.clearCart()
    this.setState({redirect: true})
  }
  render() {
    const arrivalDate = new Date()
    arrivalDate.setDate(arrivalDate.getDate() + 2)
    const {shippingAddress} = this.props
    const {redirect} = this.state
    if (redirect) {
      return <Redirect to="/" />
    }
    return (
      <Container>
        <Header as="h1">Thank you for your order!</Header>
        <p>
          Your order has been placed and will arrive at{' '}
          {shippingAddress.shippingAddress.streetAddress} on{' '}
          {arrivalDate.toDateString()}.
        </p>
        <Header as="h2">Order Details:</Header>
        <OrderProducts />
        <Button onClick={this.handleClick}>Continue Shopping</Button>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    shippingAddress: state.shippingAddress
  }
}
const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)
