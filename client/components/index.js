/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProductContainer} from './all-product-container'
export {ProductItem} from './all-product-single-view'
export {default as SingleProduct} from './single-product'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout'
export {default as ShippingAddressForm} from './shipping-address-form'
export {default as OrderProducts} from './order-products'
export {default as OrderConfirmation} from './order-confirmation'
export {default as CategoryBar} from './categorybar'
