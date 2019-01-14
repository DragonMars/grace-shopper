import axios from 'axios'

//ACION TYPES
const POSTED_ORDER = 'POSTED_ORDER'

//ACTION CREATORS
const postedOrder = order => {
  return {
    type: POSTED_ORDER,
    order
  }
}

//THUNK CREATORS

export const postOrder = (cartItems, shippingAddressId) => async (
  dispatch,
  getState
) => {
  //pull necessary info from state
  const {stripeToken, user} = getState()

  if (user.id) {
    const {data} = await axios.post('/api/orders', {
      cartItems,
      shippingAddressId,
      stripeToken
    })
    dispatch(postedOrder(data))
  } else {
    const {data} = await axios.post('/api/orders', {
      cartItems,
      shippingAddressId,
      stripeToken
    })
    dispatch(postedOrder(data))
    localStorage.clear()
  }
}

//INITIAL STATE
const initialState = {
  order: {}
}

export default function(state = initialState, action) {
  const newState = {...state}
  switch (action.type) {
    case POSTED_ORDER:
      newState.order = action.order
      return newState
    default:
      return newState
  }
}
