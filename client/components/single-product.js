import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setOrUpdateItem} from '../store'
import {Card, Image, Container, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const {products, setOrUpdateCart} = this.props
    setOrUpdateCart({productId: products[0].id})
  }

  render() {
    const {products} = this.props
    const productId = Number(this.props.match.params.productId)
    const [singleProduct] = products.filter(product => {
      console.log('product.id', product.id)
      return product.id === productId
    })
    console.log('singleProduct', singleProduct)
    return (
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
          <Button type="submit" onClick={this.handleClick} id="add-to-cart">
            Add to Cart
          </Button>
        </Card>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {products: state.product}
}

const mapDispatchToProps = dispatch => ({
  setOrUpdateCart: ({productId}) => {
    dispatch(setOrUpdateItem({productId}))
  }
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
