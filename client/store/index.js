import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './products'
import category from './category'
import lineItems from './line-items'
import shippingAddress from './shipping-address'
import order from './order'

const reducer = combineReducers({
  user,
  product,
  category,
  lineItems,
  shippingAddress,
  order
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './category'
export * from './line-items'
export * from './shipping-address'
export * from './order'
