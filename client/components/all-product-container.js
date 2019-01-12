import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SingleProductView from './all-product-single-view'
import {fetchAllProducts} from '../store/product'
import {Grid} from 'semantic-ui-react'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadProductInfo()
  }

  render() {
    const {products} = this.props
    return (
      <div>
        <h1>Hello World</h1>
        <Grid>
          <Grid.Row columns={3}>
            {products &&
              products.map(product => (
                <Grid.Column key={product.id}>
                  <SingleProductView product={product} />
                </Grid.Column>
              ))}
          </Grid.Row>
        </Grid>
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
