import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {setOrUpdateItem, clearCart, removeItemFromCart} from '../store'
import {Button, List, Image, Header} from 'semantic-ui-react'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {redirect: false}
    this.numberOfItems = this.numberOfItems.bind(this)
    this.subtotal = this.subtotal.bind(this)
    this.clearCart = this.clearCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.checkout = this.checkout.bind(this)
  }

  numberOfItems() {
    let numberOfItems = 0
    const {cartItems} = this.props
    cartItems[0] &&
      cartItems.forEach(cartItem => {
        numberOfItems += Number(cartItem.quantity)
      })
    return numberOfItems
  }

  subtotal() {
    let total = 0
    const {cartItems} = this.props
    cartItems[0] &&
      cartItems.forEach(cartItem => {
        total += cartItem.product.price * cartItem.quantity / 100
      })
    return total
  }

  changeQuantity(productId, event) {
    if (event.target.value !== '' && Number(event.target.value) > 0) {
      this.props.updateQuantity({
        productId,
        quantity: Number(event.target.value)
      })
    }
  }

  clearCart() {
    this.props.clear()
  }

  removeFromCart(cartItem) {
    this.props.removeItem(cartItem)
  }

  checkout() {
    this.setState({redirect: true})
  }

  render() {
    const {cartItems, isLoggedIn} = this.props
    const {redirect} = this.state
    const numberOfItems = this.numberOfItems()
    const subtotal = this.subtotal()
    const quantityOptions = []
    for (let i = 1; i < 10; i++) {
      quantityOptions.push(i)
    }
    return (
      <div>
        {redirect ? (
          <Redirect to="/checkout" />
        ) : (
          <List divided relaxed>
            <Header as="h1">Cart:</Header>
            {cartItems[0] &&
              cartItems.map(cartItem => (
                <List.Item key={cartItem.product.id}>
                  <Button
                    basic
                    color="red"
                    icon="close"
                    floated="right"
                    onClick={() => this.removeFromCart(cartItem)}
                  />
                  <Link to={`/products/${cartItem.product.id}`}>
                    <List.Content>
                      <List.Header as="h3">{cartItem.product.name}</List.Header>
                    </List.Content>

                    <Image
                      src={cartItem.product.imageUrl}
                      alt={cartItem.product.altText}
                      height="200px"
                      width="auto"
                    />
                  </Link>
                  <List.Content floated="right">
                    <label htmlFor="quantity">
                      Quantity:{' '}
                      <input
                        type="number"
                        name="quantity"
                        defaultValue={cartItem.quantity}
                        min="1"
                        onChange={event =>
                          this.changeQuantity(cartItem.productId, event)
                        }
                      />
                    </label>
                    <p>
                      Price:{' '}
                      {(cartItem.product.price / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </p>
                  </List.Content>
                </List.Item>
              ))}
            <p>
              Subtotal ({numberOfItems} items):{' '}
              {subtotal.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </p>
            <Button onClick={this.clearCart}>Clear Cart</Button>
            {isLoggedIn ? (
              <Button disabled={subtotal <= 0} onClick={this.checkout}>
                Checkout
              </Button>
            ) : (
              <Button disabled={subtotal <= 0} onClick={this.checkout}>
                Checkout as Guest
              </Button>
            )}
          </List>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  cartItems: state.lineItems
})

const mapDispatchToProps = dispatch => ({
  updateQuantity: ({productId, quantity}) =>
    dispatch(setOrUpdateItem({productId, quantity})),
  clear: () => dispatch(clearCart()),
  removeItem: productId => dispatch(removeItemFromCart(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
