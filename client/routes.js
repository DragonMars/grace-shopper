import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProductContainer,
  ProductItem,
  SingleProduct,
  Cart,
  Checkout,
  ShippingAddressForm,
  OrderConfirmation
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={AllProductContainer} />
        <Route path="/category/:category" component={AllProductContainer} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/success" component={OrderConfirmation} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/shipping-address" component={ShippingAddressForm} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/cart" component={Cart} />
        {/* note that the "/product-item" route is exclusively for testing purposes. ProductItem should only ever be a child component of AllProducts or ProductsByCategory */}
        <Route path="/product-item" component={ProductItem} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}s
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
