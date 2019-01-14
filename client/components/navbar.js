import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart} from '../store'
import {Menu, Icon, Button} from 'semantic-ui-react'

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
      <Menu>
        <Menu.Item header as={Link} name="slothItLikeItsHot" to="/">
          Sloth It Like It's Hot
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
              <Button animated="fade">
                <Button.Content hidden>Cart ({cartSize})</Button.Content>
                <Button.Content visible>
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
              Login
            </Menu.Item>
            <Menu.Item as={Link} to="/signup">
              Sign Up
            </Menu.Item>
            <Menu.Item as={Link} to="/cart">
              <Button animated="vertical">
                <Button.Content hidden>Cart ({cartSize})</Button.Content>
                <Button.Content visible>
                  <Icon name="shop" />
                </Button.Content>
              </Button>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
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
