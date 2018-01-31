import React from 'react'

export default class Header extends React.Component {

  constructor() {
    super()
    this.state = { items: [] }
  }

  render() {
    return (
      <header>
        <button className='sp-search'
                title='Search items for sale'>Search</button>
        <div className='sp-right'>
          <button className='sp-shopping-cart'
                  title='View shopping cart'>Shopping Cart</button>
          <a className='sp-facebook'
             href='https://www.facebook.com/SpaceCakesArt/'
             target='_blank'
             title='Facebook page'/>
          <a className='sp-instagram'
             href='https://www.instagram.com/spacecake_productions/'
             target='_blank'
             title='Instagram page'/>
        </div>
      </header>);
  }
}