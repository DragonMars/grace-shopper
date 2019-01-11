import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store'

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    console.log(productId)
    this.props.loadSingleProduct(productId)
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
                <div id="single-product-price">{singleProduct.price}</div>
              </div>
            </div>
            <button id="add-to-cart">Add to cart</button>
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
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
