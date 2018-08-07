export const namespace = 'shoppingCart'

export const ERROR_MODAL_MESSAGING = {
  OUT_OF_STOCK: {
    TITLE: 'Out of stock',
    MESSAGE: 'We apologize, this item is no longer in stock.'
    + 'We have updated your cart so you can continue with the purchase of your other items.',
  },
  UNEXPECTED_ERROR: {
    TITLE: 'Unexpected issue occurred',
    MESSAGE: 'We apologize, but we appear to be having issues with our system.'
    + 'You can try again shortly or reach out to us directly through the contact us page.',
  },
  UNABLE_TO_EXECUTE_PAYMENT: {
    TITLE: 'Unable to process payment',
    MESSAGE: 'We apologize, but we are unable to process this payment.  It is possible this order was already completed, please check your '
     + 'email to see if you have received an order receipt from paypal',
  },
}
