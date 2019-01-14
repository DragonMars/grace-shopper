import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_ITEMS = 'GOT_ITEMS'
const GOT_NEW_ITEM = 'GOT_NEW_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CLEAR_ITEMS = 'CLEAR_ITEMS'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const gotItems = lineItems => ({type: GOT_ITEMS, lineItems})
const gotNewItem = newLineItem => ({type: GOT_NEW_ITEM, newLineItem})
const updateQuantity = updatedLineItem => ({
  type: UPDATE_QUANTITY,
  updatedLineItem
})
const clearItems = () => ({type: CLEAR_ITEMS})

/**
 * THUNK CREATORS
 */

export const fetchItems = () => async (dispatch, getState) => {
  const {data} = await axios.get('/api/line-items')
  dispatch(gotItems(data))
}

export const setOrUpdateItem = newLineItem => async (dispatch, getState) => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify({}))
  }
  const {productId, quantity} = newLineItem
  const [itemToBeUpdated] = getState().lineItems.filter(
    lineItem => lineItem.productId === productId
  )
  const {user} = getState()
  if (itemToBeUpdated) {
    if (user.id) {
      const newQuantity = quantity || itemToBeUpdated.quantity + 1
      const {data} = await axios.put('/api/line-items', {
        id: itemToBeUpdated.id,
        quantity: newQuantity
      })
      dispatch(updateQuantity(data))
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'))
      quantity ? (cart[productId] = quantity) : (cart[productId] += 1)
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(
        updateQuantity({
          productId: productId,
          quantity: cart[productId]
        })
      )
    }
  }
  if (!itemToBeUpdated) {
    if (user.id) {
      const {data} = await axios.post('/api/line-items', newLineItem)
      dispatch(gotNewItem(data))
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart[productId] = 1
      localStorage.setItem('cart', JSON.stringify(cart))
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(
        gotNewItem({
          quantity: 1,
          productId,
          product: data
        })
      )
    }
  }
}

export const clearCart = () => dispatch => {
  localStorage.clear()
  dispatch(clearItems())
}

export const fetchCart = () => async (dispatch, getState) => {
  const cartOnState = getState().lineItems
  const productIdsOnState = cartOnState.map(cartItem => cartItem.productId)
  const cartOnLocalStorage = JSON.parse(localStorage.getItem('cart'))
  if (cartOnLocalStorage !== null) {
    const productIdsOnLocalStorage = Object.keys(cartOnLocalStorage)
    productIdsOnLocalStorage.forEach(async productId => {
      if (!productIdsOnState.includes(productId)) {
        const {data} = await axios.get(`/api/products/${productId}`)
        dispatch(
          gotNewItem({
            quantity: cartOnLocalStorage[productId],
            productId,
            product: data
          })
        )
      }
    })
  }
  const response = await axios.get('/api/line-items')
  const cartInDB = response.data
  if (cartInDB) {
    const productIdsInDB = cartInDB.map(cartItem => cartItem.productId)
    productIdsInDB.forEach(productId => {
      if (!productIdsOnState.includes(productId)) {
        const selectedCartItem = cartInDB.filter(
          cartItem => cartItem.productId === productId
        )
        dispatch(gotNewItem(selectedCartItem[0]))
      }
    })
  }
}

/**
 * REDUCER
 */

export default function lineItemReducer(state = defaultCart, action) {
  switch (action.type) {
    case GOT_ITEMS: {
      return action.lineItems
    }
    case GOT_NEW_ITEM: {
      return [...state, action.newLineItem]
    }
    case UPDATE_QUANTITY: {
      return state.map(lineItem => {
        if (lineItem.productId === action.updatedLineItem.productId) {
          return {...lineItem, quantity: action.updatedLineItem.quantity}
        } else {
          return {...lineItem}
        }
      })
    }
    case CLEAR_ITEMS: {
      return []
    }

    default:
      return state
  }
}
