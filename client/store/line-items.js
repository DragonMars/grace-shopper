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
  type: UPDATE_QUANTITY,
  updatedLineItem
})

/**
 * THUNK CREATORS
 */
// export const postOrUpdateItem = newLineItem => async (dispatch, getState) => {
//   let inCart = false
//   const {productId} = newLineItem
//   console.log(getState())
//   getState().lineItems.forEach(async lineItem => {
//     if (productId === lineItem.productId) {
//       inCart = true
//       const newQuantity = newLineItem.quantity || lineItem.quantity + 1
//       const {data} = await axios.put('/api/line-items', {
//         id: lineItem.id,
//         quantity: newQuantity
//       })
//       dispatch(updateQuantity(data))
//     }
//   })
//   if (!inCart) {
//     const {data} = await axios.post('/api/line-items', newLineItem)
//     dispatch(gotNewItem(data))
//   }
// }

export const setOrUpdateItem = newLineItem => async (dispatch, getState) => {
  const {productId} = newLineItem
  const [itemToBeUpdated] = getState().lineItems.filter(
    lineItem => lineItem.productId === productId
  )
  const {user} = getState().user
  if (itemToBeUpdated) {
    if (user) {
      const newQuantity = itemToBeUpdated.quantity + 1
      const {data} = await axios.put('/api/line-items', {
        id: itemToBeUpdated.id,
        quantity: newQuantity
      })
      dispatch(updateQuantity(data))
    } else {
      const quantity = window.localStorage[productId]
      window.localStorage[productId] = Number(quantity) + 1
      dispatch(
        updateQuantity({
          productId: productId,
          quantity: Number(window.localStorage[productId])
        })
      )
    }
  }
  if (!itemToBeUpdated) {
    if (user) {
      console.log(newLineItem)
      const {data} = await axios.post('/api/line-items', newLineItem)
      console.log(data)
      dispatch(gotNewItem(data))
    } else {
      window.localStorage.setItem(`${productId}`, '1')
      dispatch(
        gotNewItem({
          quantity: 1,
          productId: productId
        })
      )
    }
  }
}

/**
 * REDUCER
 */
export default function lineItemReducer(state = defaultCart, action) {
  switch (action.type) {
    case GOT_NEW_ITEM: {
      return [...state, action.newLineItem]
    }
    case UPDATE_QUANTITY: {
      const updated = state.filter(
        lineItem => lineItem.id !== action.updatedLineItem.id
      )
      updated.push(action.updatedLineItem)
      return updated
    }

    default:
      return state
  }
}
