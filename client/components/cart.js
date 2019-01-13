import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {postOrUpdateItem} from '../store'
import {Button, List, Image, Header} from 'semantic-ui-react'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.updateQuantity({productId, quantity: event.target.value})
  }

  render() {
    const {cartItems, isLoggedIn} = this.props
    let total = 0
    let numberOfItems = 0
    cartItems &&
      cartItems.forEach(cartItem => {
        numberOfItems += cartItem.quantity
        total += cartItem.product.price * cartItem.quantity / 100
      })

    const quantityOptions = []
    for (let i = 1; i < 10; i++) {
      quantityOptions.push(i)
    }
    return (
      <List divided relaxed>
        <Header as="h1">Cart:</Header>
        {cartItems &&
          cartItems.map(cartItem => (
            <List.Item key={cartItem.id}>
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
                    onChange={this.handleChange}
                  >
                    {quantityOptions.map(quantity => (
                      <option key={quantity} value={`${quantity}`}>
                        {quantity}
                      </option>
                    ))}
                  </select>{' '}
                </p>
                <p>Price: ${cartItem.product.price / 100}</p>
              </List.Content>
            </List.Item>
          ))}
        <p>
          Subtotal ({numberOfItems} items): ${total}
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
    dispatch(postOrUpdateItem({productId, quantity}))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
