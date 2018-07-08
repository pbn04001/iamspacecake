import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Container from '../../components/container/container'
import PageHeader from '../../components/typography/pageHeader'
import { getCurrentUser } from './state/selectors'

const LoginSuccess = ({ currentUser }) => (
  <div className="sp-page-home">
    <Container>
      <PageHeader>Login Success as {currentUser.currentUser.name}</PageHeader>
    </Container>
  </div>
)

LoginSuccess.propTypes = {
  currentUser: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUser(state),
  }
}

export default connect(mapStateToProps, null)(LoginSuccess)
