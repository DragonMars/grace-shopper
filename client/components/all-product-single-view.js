import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Image} from 'semantic-ui-react'

function SingleProductViewForAllProduct({product}) {
  return (
    <Card>
      <Link to={`/products/${product.id}`}>
        <Image src={product.imageUrl} alt={product.altText} />
        <Card.Content>
          <Card.Header>{product.name}</Card.Header>
        </Card.Content>
      </Link>
      <Card.Content extra>
        {(product.price / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </Card.Content>
    </Card>
  )
}

export default SingleProductViewForAllProduct
