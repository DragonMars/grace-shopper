//ACTIONTYPES
const GOT_STRIPE_TOKEN = 'GOT_STRIPE_TOKEN'

//const ACTION CREATORS
export const gotStripeToken = token => {
  return {
    type: GOT_STRIPE_TOKEN,
    token
  }
}

const initialState = ''

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STRIPE_TOKEN:
      return action.token
    default:
      return state
  }
}
