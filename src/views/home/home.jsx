import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import News from 'components/news/news'
import NewProducts from 'components/newProducts/newProducts'
import NewArrivals from 'components/newArrivals/newArrivals'
import { CATEGORY } from 'service/product'

import './styles.scss'

const Home = ({ location }) => {
  const search = qs.parse(location.search)
  return (
    <div className="sp-home sp-page">
      <div className="sp-home__top">
        <News className="sp-home__news" preview={search.preview === 'true'} />
        <NewArrivals className="sp-home__new-arrivals" />
      </div>
      <NewProducts className="sp-home__products" category={CATEGORY.JEWELRY} title="JEWELRY" />
      <NewProducts className="sp-home__products" category={CATEGORY.PAINTING} title="PAINTINGS" />
      <NewProducts className="sp-home__products" category={CATEGORY.GLASS} title="GLASS" />
    </div>
  )
}

Home.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Home
