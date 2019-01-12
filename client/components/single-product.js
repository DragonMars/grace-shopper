import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct, postOrUpdateItem} from '../store'

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
      <div>
        {product.length === 1 && (
          <div>
            <div id="single-product-information">
              <img
                id="single-product-image"
                alt={singleProduct.altText}
                src={singleProduct.imageUrl}
              />
              <div id="single-product-details">
                <div id="single-product-name">{singleProduct.name}</div>
                <div id="single-product-description">
                  {singleProduct.description}
                </div>
                <div id="single-product-price">
                  Price: ${singleProduct.price / 100}
                </div>
              </div>
            </div>
            <button onClick={this.handleClick} id="add-to-cart">
              Add to Cart
            </button>
          </div>
        )}
      </div>
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
