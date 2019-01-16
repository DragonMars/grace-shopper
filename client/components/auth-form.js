import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Form, Container, Message, Header, Segment} from 'semantic-ui-react'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container>
      <Message info>
        {displayName === 'Log in' ? (
          <Segment>
            <Header size="large">log in</Header>
          </Segment>
        ) : (
          <Segment>
            <Header size="large">create an account</Header>
          </Segment>
        )}
        <Segment>
          <Form onSubmit={handleSubmit} name={name}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                required
                label="email"
                name="email"
                placeholder="email"
              />
              <Form.Input
                fluid
                required
                label="password"
                name="password"
                type="password"
                placeholder="password"
              />
            </Form.Group>
            <Form.Button color="teal">{displayName}</Form.Button>
            {error &&
              error.response && (
                <Message negative> {error.response.data} </Message>
              )}
          </Form>
        </Segment>
      </Message>
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
    displayName: 'Log in',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign up',
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
