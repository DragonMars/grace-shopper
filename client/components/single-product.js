import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setOrUpdateItem} from '../store'
import {
  Card,
  Image,
  Container,
  Button,
  Sidebar,
  List,
  Segment,
  Header,
  Divider,
  Icon,
  Item
} from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {visible: false}
    this.addToCart = this.addToCart.bind(this)
    this.handleHideClick = this.handleHideClick.bind(this)
    this.handleShowClick = this.handleShowClick.bind(this)
  }

  handleHideClick = () => this.setState({visible: false})
  handleShowClick = () => this.setState({visible: true})

  addToCart(productId) {
    const {setOrUpdateCart} = this.props
    setOrUpdateCart({productId})
    this.setState({visible: true})
  }

  render() {
    const {visible} = this.state
    const {products, lineItems} = this.props
    const productId = Number(this.props.match.params.productId)
    const [singleProduct] = products.filter(product => {
      return product.id === productId
    })
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Segment}
          animation="overlay"
          direction="right"
          onHide={this.handleHideClick}
          vertical
          visible={visible}
          width="wide"
        >
          <List size="small">
            <List.Item>
              <Header as="h2" textAlign="center">
                Your Cart
              </Header>
              <Divider />
            </List.Item>
            {lineItems.map(lineItem => (
              <Item key={lineItem.id}>
                <Image
                  size="tiny"
                  src={lineItem.product.imageUrl}
                  rounded
                  spaced
                  verticalAlign="middle"
                />
                <Item.Content verticalAlign="middle">
                  <Item.Header>{lineItem.product.name}</Item.Header>
                  <Item.Description>
                    quantity: {lineItem.quantity}
                  </Item.Description>
                </Item.Content>
                <Divider />
              </Item>
            ))}
            <List.Item>
              <Header as="h3" textAlign="center">
                CurrentTotal: ${lineItems.reduce((acc, curVal) => {
                  return acc + curVal.quantity * curVal.product.price
                }, 0) / 100}
              </Header>
            </List.Item>
          </List>
          <Button fluid icon labelPosition="left" as={Link} to="/cart">
            <Icon name="shop" />
            View Cart
          </Button>
        </Sidebar>
        <Sidebar.Pusher>
          <Container>
            <Card id="single-product-information">
              <Image
                id="single-product-image"
                alt={singleProduct.altText}
                src={singleProduct.imageUrl}
              />
              <Card.Content id="single-product-details">
                <Card.Header id="single-product-name">
                  {singleProduct.name}
                </Card.Header>
                <Card.Description id="single-product-description">
                  {singleProduct.description}
                </Card.Description>
                <Card.Content extra id="single-product-price">
                  Price: ${singleProduct.price / 100}
                </Card.Content>
              </Card.Content>
              <Button
                type="submit"
                onClick={event => this.addToCart(singleProduct.id, event)}
                id="add-to-cart"
              >
                Add to Cart
              </Button>
            </Card>
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product,
    lineItems: state.lineItems
  }
}

const mapDispatchToProps = dispatch => ({
  setOrUpdateCart: ({productId}) => {
    dispatch(setOrUpdateItem({productId}))
  }
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
