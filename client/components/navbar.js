import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Menu, Icon, Button, Header, Container} from 'semantic-ui-react'
import {logout, fetchCart} from '../store'

class Navbar extends Component {
  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    const {handleClick, isLoggedIn, cartItems} = this.props
    let cartSize = 0
    cartItems.length &&
      cartItems.forEach(cartItem => {
        cartSize += Number(cartItem.quantity)
      })
    return (
      <Container>
        <Menu>
          <Menu.Item as={Link} to="/">
            <Header color="teal" as="h1">
              sloth it like it's hot
            </Header>
          </Menu.Item>
          {isLoggedIn ? (
            <Menu.Menu position="right">
              {/* The navbar will show these links after you log in */}
              <Menu.Item as={Link} to="/home">
                {' '}
                Home
              </Menu.Item>
              <Menu.Item onClick={handleClick}>Logout</Menu.Item>
              <Menu.Item as={Link} to="/cart">
                <Button color="teal" animated="fade">
                  <Button.Content visible>cart ({cartSize})</Button.Content>
                  <Button.Content hidden>
                    <Icon name="shop" />
                  </Button.Content>
                </Button>
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              {/* The navbar will show these links before you log in */}
              <Menu.Item as={Link} to="/login">
                <Icon name="user circle" />
                login
              </Menu.Item>
              <Menu.Item as={Link} to="/signup">
                sign up
              </Menu.Item>
              <Menu.Item as={Link} to="/cart">
                <Button color="teal" animated="vertical">
                  <Button.Content visible>cart ({cartSize})</Button.Content>
                  <Button.Content hidden>
                    <Icon name="shop" />
                  </Button.Content>
                </Button>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  cartItems: state.lineItems
})

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout())
  },
  loadCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
