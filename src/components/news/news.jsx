import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getImages } from '../../utils/images';

class News extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.props.getRecentNews();
  }

  renderNews() {
    if (!_.isEmpty(this.props.recentNews)) {
      let mainNews = this.props.recentNews[0]
      let images = getImages(mainNews.field_image[0].url, 'news_images');
      return (<article>
        <div className='sp-left-content'>
          <h2>{_.first(mainNews.title).value}</h2>
          <div className='sp-article-body'
               dangerouslySetInnerHTML={{ __html: _.first(mainNews.body).value }}></div>
        </div>
        <div className='sp-right-content'>
          <picture>
            <source
                srcSet={images.large}
                media="(min-width: 1440px)" type="image/png" />
            <source
                srcSet={images.medium}
                media="(min-width: 1024px)" type="image/png" />
            <source
                srcSet={images.small}
                media="(min-width: 768px)" type="image/png" />
            <source
                srcSet={images.mobile}
                type="image/png" />
            <img src={images.medium} alt={mainNews.title} />
          </picture>
        </div>
      </article>)
    }
  }

  render() {
    return (
        <section className='sp-news'>
          {this.renderNews()}
        </section>
    )
  }
}

News.propTypes = {
  recentNews: PropTypes.array
}

function mapStateToProps(state) {
  return {
    recentNews: state.news.recentNews
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(News)