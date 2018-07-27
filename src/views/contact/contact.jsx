import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Button } from 'components/button/button'
import { Container } from 'components/container'
import { sendMessage } from './state/actions'
import PageHeader from '../../components/typography/pageHeader'

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
        <Container>
          <PageHeader>CONTACT</PageHeader>
          <form className="sp-form" onSubmit={handleSubmit(this.onSubmit)}>
            <div>
              <label htmlFor="contact-name">NAME</label>
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
              <label htmlFor="contact-email">EMAIL</label>
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
              <label htmlFor="contact-message">MESSAGE</label>
              <div>
                <Field
                  id="contact-message"
                  name="message"
                  component="textarea"
                />
              </div>
            </div>
            <Button buttonType="submit" disabled={pristine || submitting}>
              SEND MESSAGE
            </Button>
          </form>
        </Container>
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
