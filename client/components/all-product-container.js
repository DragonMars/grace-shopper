import React from 'react'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'
import {SingleProductView} from './index'
import {fetchAllProducts} from '../store'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadProductInfo()
  }

  render() {
    const {products} = this.props
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
  return {
    products: state.product
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
