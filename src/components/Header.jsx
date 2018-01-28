import React from 'react';
import '../styles/components/Header.scss';

export default class Header extends React.Component {

  constructor() {
    super();
    this.state = { items: [] };
  }

  render() {
    return (
      <header>
        <button className='sp-search'>Search</button>
        <div className='sp-right'>
          <button className='sp-shopping-cart'>Shopping Cart</button>
          <a className='sp-facebook' href='https://www.facebook.com/SpaceCakesArt/' name='_blank'></a>
          <a className='sp-instagram' href='https://www.instagram.com/spacecake_productions/' name='_blank'></a>
        </div>
      </header>);
  }
}