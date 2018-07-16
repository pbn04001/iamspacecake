import React from 'react'

export const formatPrice = (price) => {
  const formatted = `${price.toFixed(2)}`.split('.')
  return (
    <span className="sp-price">
      ${formatted[0]}.
      <span className="sp-price__coin">
        {formatted[1]}
      </span>
    </span>
  )
}
