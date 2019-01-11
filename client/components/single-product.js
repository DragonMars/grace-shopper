import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store'

class SingleProduct extends Component {
  componentDidMount() {
    const {productId} = this.props.match.params
    loadSingleProduct(productId)
  }

  render() {
    const {product} = this.props
    return (
      <div>
        {product.length === 1 && (
          <div>
            <div id="single-product-information">
              <div
                id="single-product-image"
                alt={product.altText}
                src={product.imageUrl}
              >
                render image large on lefthand side
              </div>
              <div id="single-product-details">
                <div id="single-product-name">{product.name}</div>
                <div id="single-product-description">{product.description}</div>
                <div id="single-product-price">Price</div>
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
    fetchOneProduct(productId)
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
