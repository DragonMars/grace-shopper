import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Icon} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
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
      </Menu.Menu>
    )}
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
