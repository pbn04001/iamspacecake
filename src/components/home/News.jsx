import React from 'react'

export default class News extends React.Component {

  constructor() {
    super()
    this.state = { items: [] }
  }

  render() {
    return (
      <section className='sp-news'>
          <article>
              <h2>New collection,
                The elegant universe.</h2>
              <div className='sp-article-body'></div>
          </article>
      </section>
    )
  }
}