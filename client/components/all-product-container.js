import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SingleProductView from './all-product-single-view'
import {fetchAllProducts} from '../store/product'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadProductInfo()
  }

  render() {
    const {products} = this.props
    return (
      <div>
        <h1>Hello World</h1>
        {products &&
          products.map(product => <SingleProductView product={product} />)}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  loadProductInfo: () => dispatch(fetchAllProducts())
})

const mapStateToProps = state => {
  return {
    products: state.product
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
