import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setOrUpdateItem} from '../store'
import {
  Image,
  Container,
  Button,
  Sidebar,
  List,
  Segment,
  Header,
  Divider,
  Icon,
  Item,
  Grid
} from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {visible: false}
    this.addToCart = this.addToCart.bind(this)
    this.handleHideClick = this.handleHideClick.bind(this)
    this.handleShowClick = this.handleShowClick.bind(this)
    this.state = {
      singleProduct: {},
      visible: false
    }
  }

  handleHideClick = () => this.setState({visible: false})
  handleShowClick = () => this.setState({visible: true})

  addToCart(productId) {
    const {setOrUpdateCart} = this.props
    setOrUpdateCart({productId})
    this.setState({visible: true})
  }

  async componentDidMount() {
    const {data} = await axios.get(
      `/api/products/${this.props.match.params.productId}`
    )
    this.setState({singleProduct: data})
  }

  render() {
    const {visible, singleProduct} = this.state
    const {lineItems} = this.props
    return (
      <Container>
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
            </List>
            <Item.Group>
              {lineItems.map(lineItem => (
                <Item key={lineItem.id}>
                  <Item.Image
                    size="tiny"
                    src={lineItem.product.imageUrl}
                    rounded
                    spaced="left"
                    verticalAlign="middle"
                  />
                  <Item.Content verticalAlign="middle">
                    <Item.Header>{lineItem.product.name}</Item.Header>
                    <Item.Description>
                      quantity: {lineItem.quantity}
                    </Item.Description>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
            <Divider />
            <List>
              <List.Item>
                <Header as="h3" textAlign="center">
                  CurrentTotal: ${lineItems.reduce((acc, curVal) => {
                    return acc + curVal.quantity * curVal.product.price
                  }, 0) / 100}
                </Header>
              </List.Item>
            </List>
            <Button
              fluid
              icon
              labelPosition="left"
              as={Link}
              to="/cart"
              color="teal"
            >
              <Icon name="shop" />
              View Cart
            </Button>
          </Sidebar>
          <Sidebar.Pusher>
            <Container>
              {singleProduct.id !== undefined && (
                <Grid padded>
                  <Grid.Column width={4}>
                    <Image
                      id="single-product-image"
                      alt={singleProduct.altText}
                      src={singleProduct.imageUrl}
                      rounded
                      spaced
                      verticalAlign="middle"
                    />
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <Segment padded verticalAlign="middle">
                      <Header as="h2">{singleProduct.name}</Header>
                      <Divider />
                      {singleProduct.description}
                      <Divider />
                      <Header sub>Price</Header>
                      <span>${singleProduct.price / 100}</span>
                    </Segment>
                    <Button
                      type="submit"
                      onClick={event => this.addToCart(singleProduct.id, event)}
                      id="add-to-cart"
                      color="teal"
                    >
                      Add to Cart
                    </Button>
                  </Grid.Column>
                </Grid>
              )}
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
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
