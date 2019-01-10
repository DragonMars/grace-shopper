import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GOT_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const gotProducts = products => ({type: GOT_PRODUCTS, products})

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

/**
 * REDUCER
 */
export default function product(state = defaultProducts, action) {
  switch (action.type) {
    case GOT_PRODUCTS: {
      return action.products
    }
    default:
      return state
  }
}
