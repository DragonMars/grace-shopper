import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_ONE_PRODUCT = 'GOT_ONE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = []
/**
 * ACTION CREATORS
 */
const gotProducts = products => ({type: GOT_PRODUCTS, products})
const gotOneProduct = oneProduct => ({type: GOT_ONE_PRODUCT, oneProduct})

/**
 * THUNK CREATORS
 */
export const fetchAllProducts = category => async dispatch => {
  if (category) {
    const {data} = await axios.get(`api/products?category=${category}`)
    dispatch(gotProducts(data))
  } else {
    const {data} = await axios.get('api/products')
    dispatch(gotProducts(data))
  }
}

export const fetchOneProduct = productId => async dispatch => {
  const {data} = await axios.get(`api/products/${productId}`)
  dispatch(gotOneProduct(data))
}

/**
 * REDUCER
 */
export default function product(state = defaultProducts, action) {
  switch (action.type) {
    case GOT_PRODUCTS: {
      return action.products
    }
    case GOT_ONE_PRODUCT: {
      return [action.oneProduct]
    }
    default:
      return state
  }
}
