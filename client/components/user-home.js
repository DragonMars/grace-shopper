import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {OrderProducts} from './index'
import {Header, Divider} from 'semantic-ui-react'

/**
 * COMPONENT
 */
class UserHome extends Component {
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
    console.log('orderHistory', orderHistory)
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <Header as="h1">Your Order History:</Header>
        <Divider />
        {orderHistory.length &&
          orderHistory.map(order => (
            <div key={order.id}>
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

//TO DELETE
// export const UserHome = props => {
//   const {email} = props

//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

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
