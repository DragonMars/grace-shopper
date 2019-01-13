import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {postOrUpdateItem, fetchCartProductsForGuests} from '../store'
import {setOrUpdateItem} from '../store'
import {Button, List, Image, Header} from 'semantic-ui-react'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.numberOfItems = this.numberOfItems.bind(this)
    this.subtotal = this.subtotal.bind(this)
  }

  handleChange(productId, event) {
    this.props.updateQuantity({productId, quantity: event.target.value})
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

  render() {
    const {cartItems, isLoggedIn} = this.props
    const numberOfItems = this.numberOfItems()
    console.log(numberOfItems)
    const subtotal = this.subtotal()
    const quantityOptions = []
    for (let i = 1; i < 10; i++) {
      quantityOptions.push(i)
    }
    return (
      <List divided relaxed>
        <Header as="h1">Cart:</Header>
        {cartItems[0] &&
          cartItems.map(cartItem => (
            <List.Item key={cartItem.product.id}>
              <List.Content>
                <List.Header as="h3">{cartItem.product.name}</List.Header>
              </List.Content>
              <Image
                src={cartItem.product.imageUrl}
                alt={cartItem.product.altText}
                height="200px"
                width="auto"
              />
              <List.Content floated="right">
                <p>
                  Quantity:{' '}
                  <select
                    defaultValue={cartItem.quantity}
                    onChange={event =>
                      this.handleChange(cartItem.product.id, event)
                    }
                  >
                    {quantityOptions.map(quantity => (
                      <option key={quantity} value={`${quantity}`}>
                        {quantity}
                      </option>
                    ))}
                  </select>{' '}
                </p>
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
        <Link to="/checkout">
          {isLoggedIn ? (
            <Button>Checkout</Button>
          ) : (
            <Button>Checkout as Guest</Button>
          )}
        </Link>
      </List>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  cartItems: state.lineItems
})

const mapDispatchToProps = dispatch => ({
  updateQuantity: ({productId, quantity}) =>
    dispatch(setOrUpdateItem({productId, quantity}))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
