import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_NEW_ITEM = 'GOT_NEW_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const gotNewItem = newLineItem => ({type: GOT_NEW_ITEM, newLineItem})
const updateQuantity = updatedLineItem => ({
  type: UPDATED_QUANTITY,
  updatedLineItem
})

/**
 * THUNK CREATORS
 */
export const postOrUpdateItem = newLineItem => async (dispatch, getState) => {
  let inCart = false
  const {productId} = newLineItem
  getState().lineItems.forEach(async lineItem => {
    if (productId === lineItem.productId) {
      inCart = true
      const newQuantity = newLineItem.quantity || lineItem.quantity + 1
      const {data} = await axios.put('/api/line-items', {
        id: lineItem.id,
        quantity: newQuantity
      })
      dispatch(updateQuantity(data))
    }
  })
  if (!inCart) {
    const {data} = await axios.post('/api/line-items', newLineItem)
    dispatch(gotNewItem(data))
  }
}

/**
 * REDUCER
 */
export default function lineItem(state = defaultCart, action) {
  switch (action.type) {
    case GOT_NEW_ITEM: {
      return [...state, action.lineItem]
    }
    case UPDATE_QUANTITY:
      return state
        .filter(lineItem => lineItem.id !== action.updatedLineItem.id)
        .push(action.updatedLineItem)
    default:
      return state
  }
}
