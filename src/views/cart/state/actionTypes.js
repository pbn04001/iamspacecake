import { namespace } from './constants'

export default {
  viewDidMount: `${namespace}/viewDidMount`,
  addItemToShoppingCart: `${namespace}/addItemToShoppingCart`,
  emptyShoppingCart: `${namespace}/emptyShoppingCart`,
  removeItemFromShoppingCart: `${namespace}/removeItemFromShoppingCart`,
  toggleErrorModal: `${namespace}/toggleErrorModal`,
  purchaseComplete: `${namespace}/purchaseComplete`,
  retrievePayment: `${namespace}/retrievePayment`,
  paymentRetrieved: `${namespace}/paymentRetrieved`,
}
