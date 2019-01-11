/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProductContainer} from './all-product-container'
export {default as SingleProduct} from './single-product'
export {ProductItem} from './product-item'
export {default as OrderConfirmation} from './order-confirmation'
export {default as OrderProducts} from './order-products'
