import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Container } from 'components/container'
import { getRecentNews } from './state/actions'
import { getPicture } from '../../utils/images'

class News extends React.Component {
  componentWillMount() {
    this.props.getRecentNews()
  }

  renderNews = () => {
    if (!_.isEmpty(this.props.recentNews)) {
      const mainNews = this.props.recentNews[0]
      const title = _.first(mainNews.title).value
      const rightContent = (!isEmpty(mainNews.fieldImage))
        ? (
          <div className="sp-right-content">
            {getPicture(mainNews.fieldImage[0].url,
              title,
              { large: true, medium: true, small: true },
              'news_images')}
          </div>) : null
      return (
        <article>
          <div className="sp-left-content">
            <h2>{title}</h2>
            {rightContent}
            <div
              className="sp-article-body"
              dangerouslySetInnerHTML={{ __html: _.first(mainNews.body).value }} // eslint-disable-line react/no-danger
            />
          </div>
          {rightContent}
        </article>)
    }
    return <article />
  }

  render() {
    return (
      <Container className="sp-news">
        {this.renderNews()}
      </Container>
    )
  }
}

News.propTypes = {
  recentNews: PropTypes.array.isRequired,
  getRecentNews: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    recentNews: state.news.recentNews,
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { getRecentNews },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(News)
