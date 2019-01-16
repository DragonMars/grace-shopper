import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {OrderProducts} from './index'
import {
  Header,
  Divider,
  Container,
  Segment,
  Icon,
  Grid
} from 'semantic-ui-react'

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
      <Container>
        <Grid centered>
          <Grid.Row>
            <br />
            <Header id="headerForTesting" icon>
              <Icon name="user outline" />
              Welcome, {email}!
            </Header>
          </Grid.Row>
        </Grid>

        <br />
        {orderHistory.length > 0 && (
          <Container>
            <Header as="h1">Your Order History:</Header>
            <Divider />
            {orderHistory.map(order => (
              <Segment key={order.id}>
                <Header>
                  Order sent to {order.shippingAddress.streetAddress} placed on{' '}
                  {new Date(order.createdAt).toDateString()}
                </Header>
                <OrderProducts lineItems={order.lineItems} order={order} />
              </Segment>
            ))}
          </Container>
        )}
      </Container>
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
