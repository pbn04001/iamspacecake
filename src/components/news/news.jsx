import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import PropTypes from 'prop-types'
import _ from 'lodash'

class News extends React.Component {

  constructor() {
    super()
    this.state = { }
  }

  componentWillMount() {
    this.props.getRecentNews();
  }

  renderNews() {
    if (!_.isEmpty(this.props.recentNews)) {
      let mainNews = this.props.recentNews[0]
      let image = _.first(mainNews.field_man_image)
      let smallImageUrl = _.replace(image.url, 'files/', 'files/styles/max_325x325/public')
      let mediumImageUrl = _.replace(image.url, 'files/', 'files/styles/max_650x650/public')
      return (<article>
        <div className='sp-left-content'>
        <h2>{_.first(mainNews.title).value}</h2>
        <div className='sp-article-body' dangerouslySetInnerHTML={{__html: _.first(mainNews.body).value}}></div>
        </div>
        <div className='sp-right-content'>
          <picture>
            <source srcSet={smallImageUrl} media="(max-width: 325px)"/>
              <source srcSet={mediumImageUrl} media="(max-width: 650px)"/>
              <source srcSet={image.url}/>
              <img srcSet={image.url} alt={image.alt}/>
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

function mapStateToProps (state) {
  return {
    recentNews: state.news.recentNews
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(News)