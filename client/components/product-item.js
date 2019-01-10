import React, {Component} from 'react'

import {Link} from 'react-router-dom'
export const ProductItem = props => {
  return (
    <div>
      <Link to="/single-product">
        <div id="product-item-image">Image large up top</div>
      </Link>
      <div id="product-item-details">
        <Link to="/single-product">
          <div id="product-item-name">Name</div>
          <div id="product-item-price">Price</div>
        </Link>
      </div>
    </div>
  )
}
