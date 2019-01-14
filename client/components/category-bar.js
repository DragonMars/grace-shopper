import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu} from 'semantic-ui-react'
import {fetchAllCategories, fetchAllProducts} from '../store'

class CategoryBar extends Component {
  componentDidMount() {
    this.props.loadCategories()
  }
  render() {
    const {categories, loadProductsByCategory} = this.props
    return (
      <Menu>
        {categories.length &&
          categories.map(category => (
            <Menu.Item
              key={category.id}
              onClick={() => loadProductsByCategory(category.name)}
            >
              {category.name}
            </Menu.Item>
          ))}
        <Menu.Item onClick={() => loadProductsByCategory(null)}>
          All Products
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCategories: () => dispatch(fetchAllCategories()),
    loadProductsByCategory: category => dispatch(fetchAllProducts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBar)
