import React from 'react'
import {connect} from 'react-redux'
import {Grid, Container, Card} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {SingleProductView} from './index'
import {fetchAllProducts} from '../store'

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
      <Container>
        <Grid relaxed columns={3}>
          <Grid.Row>
            {products &&
              products.map(product => (
                <Grid.Column key={product.id}>
                  <Card.Group centered>
                    <SingleProductView product={product} />
                  </Card.Group>
                </Grid.Column>
              ))}
          </Grid.Row>
        </Grid>
      </Container>
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
