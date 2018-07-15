import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { Container, CONTAINER_TYPE } from 'components/container'
import { Button } from 'components/button'
import { PageHeader } from 'components/typography'
import { getRecentNews } from './state/actions'
import { getPicture } from '../../utils/images'

class News extends React.Component {
  componentWillMount() {
    this.props.getRecentNews()
  }

  renderNews = () => {
    if (!_.isEmpty(this.props.recentNews)) {
      const mainNews = this.props.recentNews[0]
      const {
        title, fieldImage, body,
      } = mainNews
      const rightContent = (!isEmpty(fieldImage))
        ? (
          <div className="sp-news__image">
            {getPicture(fieldImage,
              title,
              { small: true, mobile: true },
              'news_images')}
          </div>) : null
      return (
        <Fragment>
          <article>
            <span className="sp-news__spacer" />
            <span className="sp-news__spacer_2" />
            {rightContent}
            <PageHeader>{title}</PageHeader>
            <div
              className="sp-article-body"
              dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
            />
            <NavLink to="/shop">
              <Button>Shop Now</Button>
            </NavLink>
          </article>
        </Fragment>)
    }
    return <article />
  }

  render() {
    return (
      <Container type={CONTAINER_TYPE.TOP_LEFT} className={classnames('sp-news', this.props.className)}>
        {this.renderNews()}
      </Container>
    )
  }
}

News.propTypes = {
  className: PropTypes.string,
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
