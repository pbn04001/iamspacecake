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
      return (<article>
        <h2>New collection,
          The elegant universe.</h2>
        <div className='sp-article-body'></div>
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