import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Button } from 'components/button/button'
import { sendMessage } from './state/actions'

const FORM_NAME = 'contactForm'

class Contact extends Component {
  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
    messageSentResults: PropTypes.object,
  }

  onSubmit = (values) => {
    this.props.sendMessage({
      name: values.name,
      email: values.email,
      message: values.message,
    })
  }

  render() {
    const { pristine, submitting, handleSubmit } = this.props
    return (
      <div className="sp-contact sp-page">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <label htmlFor="contact-name">Name</label>
            <div>
              <Field
                id="contact-name"
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-email">Email</label>
            <div>
              <Field
                id="contact-email"
                name="email"
                component="input"
                type="text"
                placeholder="Email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-message">Message</label>
            <div>
              <Field
                id="contact-message"
                name="message"
                component="textarea"
              />
            </div>
          </div>
          <Button buttonType="submit" disabled={pristine || submitting}>
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messageSentResults: state.contact.messageSentResults,
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { sendMessage },
  dispatch,
)

export default reduxForm({
  form: FORM_NAME,
})(connect(mapStateToProps, mapDispatchToProps)(Contact))
