import React from 'react'
import {connect} from 'react-redux'
import SingleProductView from './all-product-single-view'
import {fetchAllProducts} from '../store/product'
import {Grid} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadProductInfo()
  }

  render() {
    let {products} = this.props
    const category = this.props.match.params.category
    const productsByCategory = products.filter(
      product => product.category.name === category
    )
    if (category) {
      products = productsByCategory
    }
    return (
      <div>
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
  return {products: state.product}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
