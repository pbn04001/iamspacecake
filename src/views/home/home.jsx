import React from 'react'
import News from 'components/news/news'
import NewProducts from 'components/products/newProducts'
import { CATEGORY } from 'service/product'

import 'styles/views/home.scss'

const Home = () => (
  <div className="sp-home sp-page">
    <div className="sp-home__top">
      <News className="sp-home__news" />
      <NewProducts className="sp-home__products" category={CATEGORY.JEWELRY}/>
    </div>
  </div>
)

export default Home
