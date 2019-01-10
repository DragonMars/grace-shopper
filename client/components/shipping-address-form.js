import React, {Component} from 'react'

export default class ShippingAddressForm extends Component {
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
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            name="streetAddress"
            value={this.state.streetAddress}
            onChange={this.handleChange}
          />
          <input
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
          />
          <input
            name="state"
            value={this.state.state}
            onChange={this.handleChange}
          />
          <input
            name="zipcode"
            value={this.state.zipcode}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}
