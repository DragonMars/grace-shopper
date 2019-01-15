import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Form, Container, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container>
      <Form onSubmit={handleSubmit} name={name}>
        <Form.Input required label="Email" name="email" placeholder="Email" />
        <Form.Input
          required
          label="Password"
          name="password"
          type="password"
          placeholder="password"
        />
        <Form.Button>{displayName}</Form.Button>
        {error &&
          error.response && <Message negative> {error.response.data} </Message>}
        <Link to="/auth/google">{displayName} with Google</Link>
      </Form>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
