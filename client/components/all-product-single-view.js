import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function SingleProductViewForAllProduct(props) {
  const product = props.product

  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <div>
          <img src={product.imageUrl} alt={product.altText} />
        </div>
        <div>
          <h3>{product.name}</h3>
        </div>
      </Link>
    </div>
  )
}

export default SingleProductViewForAllProduct
