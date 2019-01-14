import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Icon, Button} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, cartItems}) => {
  let cartSize = 0
  cartItems &&
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartItems: state.lineItems
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
