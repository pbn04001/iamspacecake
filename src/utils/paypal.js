
export const renderPaypalButton = (shoppingCartItems, buttonId, purchaseComplete) => {
  const mapShoppingCartItemsList = () => {
    let total = 0
    const items = shoppingCartItems.map((item) => {
      total += (item.price * item.quantity)
      return {
        sku: item.nid, // Product Id
        name: item.title,
        price: `${item.price}`,
        currency: 'USD',
        quantity: item.quantity,
      }
    })
    return {
      items,
      total,
    }
  }

  const itemsList = mapShoppingCartItemsList(shoppingCartItems)
  window.paypal.Button.render({
    // Configure environment
    env: process.env.PAY_PAL_ENVIRONMENT,
    // Customize button (optional)
    locale: 'en_US',
    style: {
      size: 'responsive',
      color: 'blue',
      shape: 'pill',
    },
    // Set up a payment
    payment: (data, actions) => {
      return actions.request({
        method: 'post',
        url: `${process.env.NODE_ENDPOINT}/product/create-payment`,
        json: {
          items: itemsList.items,
          total: itemsList.total,
        },
      })
        .then(res => res.id)
    },
    // Execute the payment
    onAuthorize: (data, actions) => {
      return actions.request({
        method: 'post',
        url: `${process.env.NODE_ENDPOINT}/product/execute-payment`,
        json: {
          paymentId: data.paymentID,
          payerId: data.payerID,
        },
      })
        .then((results) => {
          purchaseComplete(results)
        })
    },
  }, buttonId)
}