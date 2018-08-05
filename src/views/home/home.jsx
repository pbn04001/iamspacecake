import React from 'react'
import News from 'components/news/news'
import NewProducts from 'components/products/newProducts'
import NewArrivals from 'components/newArrivals/newArrivals'
import { CATEGORY } from 'service/product'

import 'styles/views/home.scss'

const Home = () => (
  <div className="sp-home sp-page">
    <div className="sp-home__top">
      <News className="sp-home__news" />
      <NewArrivals className="sp-home__new-arrivals" />
    </div>
    <NewProducts className="sp-home__products" category={CATEGORY.JEWELRY} title="JEWELRY" />
    <NewProducts className="sp-home__products" category={CATEGORY.PAINTING} title="PAINTINGS" />
  </div>
)

export default Home
