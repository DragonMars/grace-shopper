import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setOrUpdateItem} from '../store'
import {Card, Image, Container, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
    this.state = {
      singleProduct: {}
    }
  }

  addToCart(productId) {
    const {setOrUpdateCart} = this.props
    setOrUpdateCart({productId})
  }

  async componentDidMount() {
    const {data} = await axios.get(
      `/api/products/${this.props.match.params.productId}`
    )
    this.setState({singleProduct: data})
  }

  render() {
    const {singleProduct} = this.state
    return (
      <Container>
        {singleProduct.id !== undefined && (
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
        )}
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setOrUpdateCart: ({productId}) => {
    dispatch(setOrUpdateItem({productId}))
  }
})
export default withRouter(connect(null, mapDispatchToProps)(SingleProduct))
