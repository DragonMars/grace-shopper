import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setOrUpdateItem} from '../store'
import {Card, Image, Container, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(productId) {
    const {setOrUpdateCart} = this.props
    setOrUpdateCart({productId})
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
        <Card>
          <Image alt={singleProduct.altText} src={singleProduct.imageUrl} />
          <Card.Content>
            <Card.Header>{singleProduct.name}</Card.Header>
            <Card.Description>{singleProduct.description}</Card.Description>
            <Card.Content extra>
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
