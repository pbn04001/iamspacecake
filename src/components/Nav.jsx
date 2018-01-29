import React from 'react'

export default class Nav extends React.Component {

  constructor() {
    super()
    this.state = { items: [] }
  }

  render() {
    return (
      <nav>
        <a href='/'
        className='sp-logo'/>
        <div className='sp-menu-back-left'></div>
        <div className='sp-nav-items'>

        </div>
      </nav>);
  }
}