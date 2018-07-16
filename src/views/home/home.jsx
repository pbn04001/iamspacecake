import React from 'react'
import News from '../../components/news/news'
import NewProducts from '../../components/products/newProducts'

import 'styles/views/home.scss'

const Home = () => (
  <div className="sp-home sp-page">
    <div className="sp-home__top">
      <News className="sp-home__news" />
      <NewProducts className="sp-home__products" />
    </div>
  </div>
)

export default Home
