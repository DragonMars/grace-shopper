//ACTIONTYPES
const GOT_STRIPE_TOKEN = 'GOT_STRIPE_TOKEN'

const CLEAR_STRIPE_TOKEN = 'CLEAR_STRIPE_TOKEN'

//ACTION CREATORS
export const gotStripeToken = token => {
  return {
    type: GOT_STRIPE_TOKEN,
    token
  }
}

export const clearStripeToken = () => {
  return {
    type: CLEAR_STRIPE_TOKEN
  }
}

const initialState = ''

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STRIPE_TOKEN:
      return action.token
    case CLEAR_STRIPE_TOKEN:
      return ''
    default:
      return state
  }
}
