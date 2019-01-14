import axios from 'axios'

//ACTION TYPES
const GOT_SHIPPING_ADDRESS = 'GOT_SHIPPING_ADDRESS'

//INITIAL STATE
const initialState = {
  shippingAddress: {}
}

//ACTION CREATORS
const gotShippingAddress = shippingAddress => {
  return {
    type: GOT_SHIPPING_ADDRESS,
    shippingAddress
  }
}

//THUNK CREATORS
export const postShippingAddress = shippingAddress => {
  return async function(dispatch) {
    const response = await axios.post('/api/shipping-address', shippingAddress)
    dispatch(gotShippingAddress(response.data))
  }
}
export const fetchShippingAddress = orderId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(gotShippingAddress(data))
  }
}

//REDUCER
export default function(state = initialState, action) {
  const newState = {...state}
  switch (action.type) {
    case GOT_SHIPPING_ADDRESS:
      newState.shippingAddress = action.shippingAddress
      return newState
    default:
      return state
  }
}
