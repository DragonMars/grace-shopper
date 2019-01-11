import React, {Component} from 'react'
import {connect} from 'react-redux'
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
  }

  render() {
    return (
      <div>
        <h1>Shipping Address</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label>Street Address</label>
          <input
            name="streetAddress"
            value={this.state.streetAddress}
            onChange={this.handleChange}
          />
          <label>City</label>
          <input
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
          />
          <label>State</label>
          <input
            name="state"
            value={this.state.state}
            onChange={this.handleChange}
          />
          <label>zipcode</label>
          <input
            name="zipcode"
            value={this.state.zipcode}
            onChange={this.handleChange}
          />
          <button type="submit">Use this address</button>
        </form>
      </div>
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
