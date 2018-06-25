import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { getPicture } from '../../utils/images';

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
      const title = _.first(mainNews.title).value
      const rightContent = (!isEmpty(mainNews.field_image)) ?
          (<div className='sp-right-content'>
            {getPicture(mainNews.field_image[0].url,
                title,
                { large: true, medium: true, small: true },
                'news_images')}
          </div>) : null;
      return (<article>
        <div className='sp-left-content'>
          <h2>{title}</h2>
          {rightContent}
          <div
              className='sp-article-body'
              dangerouslySetInnerHTML={{ __html: _.first(mainNews.body).value }}>
          </div>
        </div>
        {rightContent}
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