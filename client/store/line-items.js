import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_ITEMS = 'GOT_ITEMS'
const GOT_NEW_ITEM = 'GOT_NEW_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CLEAR_ITEMS = 'CLEAR_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'

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
const removeItem = productId => ({type: REMOVE_ITEM, productId})

/**
 * THUNK CREATORS
 */

export const fetchItems = () => async dispatch => {
  const {data} = await axios.get('/api/line-items')
  dispatch(gotItems(data))
}

export const setOrUpdateItem = newLineItem => async (dispatch, getState) => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify({}))
  }
  const {productId, quantity} = newLineItem
  const itemToBeUpdated = getState().lineItems.find(
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
      if (quantity) {
        cart[productId] = quantity
      } else {
        cart[productId] += 1
      }
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

export const clearCart = () => (dispatch, getState) => {
  localStorage.clear()
  const cartItems = getState().lineItems
  if (getState().user.id) {
    cartItems.forEach(async cartItem => {
      console.log(cartItem.id)
      await axios.delete(`/api/line-items/${cartItem.id}`)
    })
  }
  dispatch(clearItems())
}

//this thunk creator removes one lineItem (item in the cart)
export const removeItemFromCart = cartItem => async (dispatch, getState) => {
  const {user} = getState()
  const {productId} = cartItem
  if (user.id) {
    await axios.delete(`/api/line-items/${cartItem.id}`)
    dispatch(removeItem(productId))
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'))
    delete cart[productId]
    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch(removeItem(productId))
  }
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
        const selectedCartItem = cartInDB.find(
          cartItem => cartItem.productId === productId
        )
        dispatch(gotNewItem(selectedCartItem))
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
    case REMOVE_ITEM: {
      const newState = state.filter(lineItem => {
        if (lineItem.productId !== action.productId) {
          return lineItem
        }
      })
      return newState
    }

    default:
      return state
  }
}
