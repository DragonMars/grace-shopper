import React, {Component} from 'react'

export const SingleProduct = props => {
  return (
    <div>
      <div id="single-product-information">
        <div id="single-product-image">render image large on lefthand side</div>
        <div id="single-product-details">
          <div id="single-product-name">Name</div>
          <div id="single-product-description">Description</div>
          <div id="single-product-price">Price</div>
        </div>
      </div>
      <button id="add-to-cart">Add to cart</button>
    </div>
  )
}
