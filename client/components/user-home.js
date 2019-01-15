import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {OrderProducts} from './index'
import {Header, Divider} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      orderHistory: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/orders')
    this.setState({orderHistory: data})
  }

  render() {
    const {email} = this.props
    const {orderHistory} = this.state
    return (
      <div>
        <h3>Welcome, {email}</h3>

        {orderHistory.length > 0 &&
          orderHistory.map(order => (
            <div key={order.id}>
              <Header as="h1">Your Order History:</Header>
              <Divider />
              <Header>
                Order sent to {order.shippingAddress.streetAddress} placed on{' '}
                {new Date(order.createdAt).toDateString()}
              </Header>
              <OrderProducts lineItems={order.lineItems} order={order} />
              <Divider />
            </div>
          ))}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
