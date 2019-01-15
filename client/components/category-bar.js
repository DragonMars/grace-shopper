import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Menu} from 'semantic-ui-react'
import {fetchAllCategories} from '../store'

class CategoryBar extends Component {
  state = {}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  componentDidMount() {
    this.props.loadCategories()
  }
  render() {
    const {activeItem} = this.state
    const {categories} = this.props
    return (
      <Menu>
        {categories.length &&
          categories.map(category => (
            <Menu.Item
              key={category.id}
              as={Link}
              active={activeItem === category.name}
              to={`/category/${category.name}`}
            >
              {category.name}
            </Menu.Item>
          ))}
        <Menu.Item as={Link} to="/">
          all products
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
    loadCategories: () => dispatch(fetchAllCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBar)
