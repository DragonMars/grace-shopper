import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Segment, Item} from 'semantic-ui-react'

const calculateTotal = function(lineItems) {
  let total = 0
  lineItems.forEach(lineItem => {
    total += lineItem.price * lineItem.quantity
  })
  return total / 100
}

class OrderProducts extends Component {
  render() {
    let total
    const {lineItems, order} = this.props
    if (order.id) {
      total = calculateTotal(order, lineItems)
    } else {
      total = 0
      lineItems.forEach(lineItem => {
        total += lineItem.product.price * lineItem.quantity / 100
      })
    }
    return (
      <Segment>
        <Item.Group>
          {lineItems.map(lineItem => (
            <Item key={lineItem.id}>
              <Item.Image
                src={lineItem.product.imageUrl}
                alt={lineItem.product.altText}
                height="200px"
                width="auto"
              />
              <Item.Content>
                <Item.Header as="h4">{lineItem.product.name}</Item.Header>
                <Item.Description>
                  <p>Quantity: {lineItem.quantity} </p>
                </Item.Description>
                <Item.Extra>
                  {lineItem.orderId ? (
                    <p>Price: ${lineItem.price / 100}</p>
                  ) : (
                    <p>Price: ${lineItem.product.price / 100}</p>
                  )}
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
        <p>Total: ${total}</p>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    lineItems: state.lineItems,
    order: state.order
  }
}

export default connect(mapStateToProps)(OrderProducts)
