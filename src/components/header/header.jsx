import React from 'react'
import ShoppingCartIcon from 'components/shoppingCart/shoppingCartIcon'

import 'styles/components/header.scss'

const Header = () => (
  <header>
    <button
      type="button"
      className="sp-search"
      title="Search items for sale"
    >
      Search
    </button>
    <div className="sp-right">
      <ShoppingCartIcon />
      <a
        className="sp-facebook"
        href="https://www.facebook.com/SpaceCakesArt/"
        rel="noopener noreferrer"
        target="_blank"
        title="Facebook page"
      />
      <a
        className="sp-instagram"
        href="https://www.instagram.com/spacecake_productions/"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram page"
      />
    </div>
  </header>
)

export default Header
