import React from 'react'
import News from './News.jsx'

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = { items: [] }
  }

  render() {
    return (
      <div className='sp-page-home'>
        <News></News>
      </div>
    )
  }
}