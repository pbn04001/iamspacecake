import React from 'react'
import News from 'components/news/news.jsx'
import NewProducts from 'components/products/newProducts'

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = { items: [] }
  }

  render() {
    return (
      <div className='sp-page-home'>
        <News/>
        <NewProducts/>
      </div>
    )
  }
}