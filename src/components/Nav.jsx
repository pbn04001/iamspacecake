import React from 'react'
import { NavLink } from 'react-router-dom';

export default class Nav extends React.Component {

  constructor() {
    super()
    this.state = { items: [] }
  }

  render() {
    return (
      <div className='sp-nav-bar'>
        <NavLink to='/'
        className='sp-logo'
        title='SpaceCake Productions'/>
        <div className='sp-menu-back-left'></div>
        <nav>
          <ul>
            <li><NavLink to='/shop'>Shop</NavLink></li>
            <li><NavLink to='/gallery'>Gallery</NavLink></li>
            <li><NavLink to='/news'>News</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
          </ul>
        </nav>
      </div>);
  }
}