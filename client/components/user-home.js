import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

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
    const orderHistory = await axios.get('/api/orders')
    this.setState({orderHistory})
  }

  render() {
    const {email} = this.props
    const {orderHistory} = this.state
    return (
      <div>
        <h3>Welcome, {email}</h3>
        {orderHistory.length &&
          orderHistory.map(order => (
            <div key={order.id}>
              <p>{order.lineItems}</p>
              <p>{order.shippingAddress}</p>
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
