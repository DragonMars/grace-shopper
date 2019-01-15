import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Image} from 'semantic-ui-react'

function SingleProductViewForAllProduct({product}) {
  return (
    <Card fluid as={Link} to={`/products/${product.id}`}>
      <Image src={product.imageUrl} alt={product.altText} />
      <Card.Header textAlign="center" as="h3">
        {product.name}
      </Card.Header>
      <Card.Content textAlign="center" extra>
        {(product.price / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </Card.Content>
    </Card>
  )
}

export default SingleProductViewForAllProduct
