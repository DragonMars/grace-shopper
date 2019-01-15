import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setOrUpdateItem, clearCart, removeItemFromCart} from '../store'
import {
  Button,
  List,
  Image,
  Header,
  Container,
  Item,
  Grid,
  Segment
} from 'semantic-ui-react'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.numberOfItems = this.numberOfItems.bind(this)
    this.subtotal = this.subtotal.bind(this)
    this.clearCart = this.clearCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
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

  handleChange(productId, event) {
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

  render() {
    const {cartItems, isLoggedIn} = this.props
    const numberOfItems = this.numberOfItems()
    const subtotal = this.subtotal()
    const quantityOptions = []
    for (let i = 1; i < 10; i++) {
      quantityOptions.push(i)
    }
    return (
      <Container>
        <Segment>
          <p />
          <p />
          <p />
          <Header as="h1" color="teal">
            cart:
          </Header>
          <Item.Group>
            {cartItems[0] &&
              cartItems.map(cartItem => (
                <Item key={cartItem.product.id}>
                  <Item.Image
                    as={Link}
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.altText}
                    height="200px"
                    width="auto"
                    to={`/products/${cartItem.product.id}`}
                  />
                  <Item.Content>
                    <Button
                      basic
                      color="red"
                      icon="close"
                      floated="right"
                      onClick={() => this.removeFromCart(cartItem)}
                    />
                    <Link to={`/products/${cartItem.product.id}`}>
                      <Item.Header as="h3">{cartItem.product.name}</Item.Header>
                    </Link>
                    <Item.Extra>
                      Price:{' '}
                      {(cartItem.product.price / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </Item.Extra>
                    <Item.Description>
                      <label htmlFor="quantity">
                        Quantity:{' '}
                        <input
                          type="number"
                          name="quantity"
                          defaultValue={cartItem.quantity}
                          min="1"
                          onChange={event =>
                            this.handleChange(cartItem.productId, event)
                          }
                        />
                      </label>
                    </Item.Description>
                  </Item.Content>
                </Item>
              ))}
            <Item.Header as="h4">
              Subtotal ({numberOfItems} items):{' '}
              {subtotal.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </Item.Header>
          </Item.Group>
        </Segment>
        <Segment>
          <Button onClick={this.clearCart}>Clear Cart</Button>
          <Link to="/checkout">
            {isLoggedIn ? (
              <Button color="teal">Checkout</Button>
            ) : (
              <Button color="teal">Checkout as Guest</Button>
            )}
          </Link>
        </Segment>
      </Container>
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
