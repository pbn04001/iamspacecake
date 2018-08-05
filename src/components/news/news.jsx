import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { Container, CONTAINER_TYPE } from 'components/container'
import { PageHeader } from 'components/typography'
import { getRecentNews } from './state/actions'
import { getNewsImage } from '../../utils/images'

import './styles.scss'

class News extends React.Component {
  componentWillMount() {
    this.props.getRecentNews()
  }

  renderNews = () => {
    if (!isEmpty(this.props.recentNews) && !this.props.recentNews.error) {
      const mainNews = this.props.recentNews[0]
      const {
        title, body,
      } = mainNews
      return (
        <Fragment>
          <article>
            <PageHeader>{title}</PageHeader>
            <NavLink to="/shop">
              {getNewsImage(mainNews, title)}
            </NavLink>
            <div
              className="sp-article-body"
              dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
            />
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
