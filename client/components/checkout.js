import React, {Component} from 'react'
import {connect} from 'react-redux'
import {OrderProducts, ShippingAddressForm} from './index'
import {postOrder} from '../store'

const fakeOrder = {
  id: 1,
  stripeTransactionId: 'T123KKBSLFN',
  createdAt: '2019-01-09T17:35:23.096Z',
  updatedAt: '2019-01-09T17:35:23.129Z',
  userId: 2,
  lineItems: [
    {
      id: 2,
      quantity: 1,
      price: 1200,
      createdAt: '2019-01-09T19:44:41.987Z',
      updatedAt: '2019-01-09T19:44:42.026Z',
      orderId: 1,
      productId: 2,
      product: {
        id: 2,
        name: 'Sloth Womens Knee High Sock',
        imageUrl: 'https://www.sockittome.com/images/detailed/1/F0171.jpg',
        altText: 'purple socks featuring sloths hanging from vines',
        description:
          'Feeling lazy? Want everyone to get off your back so you can just hang out? Send out the message strong with our new contest winner Sloth socks. 54% Cotton, 44% Polyester, 2% Spandex.Made in Korea. Our threads are certified by OEKO- TEX® Standard 100, which means we leave out harmful chemicals to keep your skin safe and happy. Approximately fits womens shoe size 5-10.',
        price: 1200,
        createdAt: '2019-01-09T19:50:27.855Z',
        updatedAt: '2019-01-09T19:50:27.903Z',
        categoryId: 1
      }
    },
    {
      id: 1,
      quantity: 2,
      price: 1027,
      createdAt: '2019-01-09T17:39:25.033Z',
      updatedAt: '2019-01-09T17:39:25.073Z',
      orderId: 1,
      productId: 1,
      product: {
        id: 1,
        name: 'Fred Sloths On a Vine Picture Hangers, Set of 6',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/61AZ243PatL._SL1092_.jpg',
        altText: 'adorable sloth hangers',
        description:
          "Six sloths included in each package 36 inch 'vine' included Everyone's favorite so-so mammal ready to hang onto your pictures 3 different sloth poses Fun and functional",
        price: 1027,
        createdAt: '2019-01-09T17:40:26.906Z',
        updatedAt: '2019-01-09T17:40:26.906Z',
        categoryId: null
      }
    }
  ],
  shippingAddress: {
    id: 1,
    streetAddress: '23232 Yemen Ln',
    city: 'Yemen',
    state: 'California',
    zipcode: '90210',
    createdAt: '2019-01-09T17:35:23.095Z',
    updatedAt: '2019-01-09T17:35:23.095Z'
  }
}

class Checkout extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    console.log('before preventDefault')
    event.preventDefault()
    //need to pass postOrder
    console.log('props on submit ', this.props)
    this.props.postOrder(fakeOrder, this.props.shippingAddress.id)
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <ShippingAddressForm />
        {/* add Stripe - research Stripe UI */}
        <OrderProducts lineItems={fakeOrder.lineItems} />
        {/* order products will be hooked up to the LineItem model with a GET route */}
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Place Your Order</button>
        </form>
      </div>
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
    postOrder: (order, id) => dispatch(postOrder(order, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)