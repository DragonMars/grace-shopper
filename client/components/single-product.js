import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct, postOrUpdateItem} from '../store'
import {Card, Image, Container, Button} from 'semantic-ui-react'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const productId = this.props.match.params.productId
    console.log(productId)
    this.props.loadSingleProduct(productId)
  }

  handleClick() {
    const {product, createOrUpdateCart} = this.props
    console.log('in handle click', product)
    createOrUpdateCart({productId: product[0].id})
  }

  render() {
    const product = this.props.product
    const singleProduct = product[0]
    return (
      <Container>
        {product.length === 1 && (
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
            <Button type="submit" onClick={this.handleClick} id="add-to-cart">
              Add to Cart
            </Button>
          </Card>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  loadSingleProduct: productId => {
    dispatch(fetchOneProduct(productId))
  },
  createOrUpdateCart: ({productId}) => {
    dispatch(postOrUpdateItem({productId}))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
