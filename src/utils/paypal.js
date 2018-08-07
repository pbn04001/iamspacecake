
export const renderPaypalButton = (shoppingCartItems, buttonId, purchaseComplete, purchaseError) => {
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
        .then((res) => {
          if (res.error) {
            return purchaseError(res.error)
          }
          const linkFound = res.links.find((link) => {
            return link.rel === 'approval_url'
          })
          if (linkFound) {
            window.location.href = linkFound.href
          } else {
            return purchaseError('No redirect link found')
          }
        })
        .catch((error) => {
          if (__DEBUG__) {
            console.log(error) // eslint-disable-line
          }
          purchaseError(error)
        })
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
          if (results.error) {
            purchaseError(results.error)
          } else {
            purchaseComplete(results)
          }
        })
        .catch((error) => {
          if (__DEBUG__) {
            console.log(error) // eslint-disable-line
          }
          purchaseError(error)
        })
    },
  }, buttonId)
}
