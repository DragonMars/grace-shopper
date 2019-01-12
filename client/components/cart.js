import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {postOrUpdateItem} from '../store'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {}

  render() {
    const {cartItems} = this.props
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
      <div>
        <h1>Cart:</h1>
        {cartItems &&
          cartItems.map(cartItem => (
            <div key={cartItem.id}>
              <h4>{cartItem.product.name}</h4>
              <img
                src={cartItem.product.imageUrl}
                alt={cartItem.product.altText}
                height="200px"
                width="auto"
              />

              <p>
                Quantity:{' '}
                <select defaultValue={cartItem.quantity}>
                  {quantityOptions.map(quantity => (
                    <option key={quantity} value={`${quantity}`}>
                      {quantity}
                    </option>
                  ))}
                </select>{' '}
              </p>
              <p>Price: ${cartItem.product.price / 100}</p>
            </div>
          ))}
        <p>
          Subtotal ({numberOfItems} items): ${total}
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cartItems: state.lineItems
})

const mapDispatchToProps = dispatch => ({
  updateQuantity: ({productId, quantity}) =>
    dispatch(postOrUpdateItem({productId, quantity}))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
