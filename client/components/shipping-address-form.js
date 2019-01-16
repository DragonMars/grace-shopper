import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Form,
  Container,
  Header,
  Message,
  Divider,
  Segment
} from 'semantic-ui-react'
import {postShippingAddress} from '../store'

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
    this.props.postShippingAddress(this.state)
    this.setState({
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: ''
    })
  }

  render() {
    const {shippingAddress} = this.props
    if (shippingAddress.id) {
      return (
        <Container>
          <Message info>
            <Message.Header>shipping address</Message.Header>
            <Divider />
            <p>{shippingAddress.name}</p>
            <p>{shippingAddress.streetAddress}</p>
            <p>{shippingAddress.city}</p>
            <p>{shippingAddress.state}</p>
            <p>{shippingAddress.zipcode}</p>
          </Message>
        </Container>
      )
    }
    return (
      <Container>
        <Message info>
          <Segment>
            <Header size="large">shipping address</Header>
          </Segment>
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                required
                label="name"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                label="street address"
                name="streetAddress"
                value={this.state.streetAddress}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                label="city"
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                label="state"
                name="state"
                value={this.state.state}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                label="zipcode"
                name="zipcode"
                value={this.state.zipcode}
                onChange={this.handleChange}
              />
              <Form.Button color="teal">Use this address</Form.Button>
            </Form>
          </Segment>
        </Message>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    shippingAddress: state.shippingAddress.shippingAddress
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postShippingAddress: shippingAddress =>
      dispatch(postShippingAddress(shippingAddress))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddressForm)
