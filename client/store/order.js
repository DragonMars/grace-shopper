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
export const postOrder = (order, id) => {
  return async dispatch => {
    const {data} = await axios.post('/api/orders', {order, id})
    dispatch(postedOrder(data))
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
