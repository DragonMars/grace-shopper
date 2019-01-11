import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_NEW_ITEM = 'GOT_NEW_ITEM'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const gotNewItem = newLineItem => ({type: GOT_NEW_ITEM, newLineItem})

/**
 * THUNK CREATORS
 */
export const postItem = newLineItem => async dispatch => {
  const {data} = await axios.post('/api/cart', newLineItem)
  dispatch(gotNewItem(data))
}

/**
 * REDUCER
 */
export default function lineItem(state = defaultCart, action) {
  switch (action.type) {
    case GOT_NEW_ITEM: {
      return action.lineItem
    }
    default:
      return state
  }
}
