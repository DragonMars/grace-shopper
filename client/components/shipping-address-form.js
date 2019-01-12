import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postShippingAddress} from '../store'
import {Redirect} from 'react-router-dom'
import {Form, Container, Header} from 'semantic-ui-react'

class ShippingAddressForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    //mapDispatchToProps must pass us a dispatcher function that calls POST '/orders'
    //navigate to OrderConfirmation
    this.props.postShippingAddress(this.state)
    this.setState({
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: ''
    })
    // <Redirect to={Checkout} />
  }

  render() {
    return (
      <Container>
        <Header size="large">Shipping Address</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            label="Name"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Street Address"
            name="streetAddress"
            value={this.state.streetAddress}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="City"
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="State"
            name="state"
            value={this.state.state}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Zipcode"
            name="zipcode"
            value={this.state.zipcode}
            onChange={this.handleChange}
          />
          <Form.Button>Use this address</Form.Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postShippingAddress: shippingAddress =>
      dispatch(postShippingAddress(shippingAddress))
  }
}

export default connect(null, mapDispatchToProps)(ShippingAddressForm)
