import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { Container } from 'components/container'
import { connect } from 'react-redux'
import { startLogin } from './state/actions'

const FORM_NAME = 'loginForm'

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    startLogin: PropTypes.func.isRequired,
  }

  onSubmit = (values) => {
    this.props.startLogin(values.username, values.password)
  }

  render() {
    const { pristine, submitting, handleSubmit } = this.props
    return (
      <Container>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <label htmlFor="login-username">First Name</label>
            <div>
              <Field
                id="login-username"
                name="username"
                component="input"
                type="text"
                placeholder="Username"
              />
            </div>
          </div>
          <div>
            <label htmlFor="login-password">Password</label>
            <div>
              <Field
                id="login-password"
                name="password"
                component="input"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
        </form>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { startLogin },
  dispatch,
)

export default reduxForm({
  form: FORM_NAME,
})(connect(mapStateToProps, mapDispatchToProps)(Login))
