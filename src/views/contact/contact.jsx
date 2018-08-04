import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Button } from 'components/button/button'
import { Container } from 'components/container'
import { sendMessage, clearResults } from './state/actions'
import PageHeader from '../../components/typography/pageHeader'

const FORM_NAME = 'contactForm'

class Contact extends Component {
  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired,
    messageSentResults: PropTypes.object,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (this.props.messageSentResults !== null) {
      this.props.clearResults()
    }
  }

  onSubmit = (values) => {
    this.props.sendMessage({
      name: values.name,
      email: values.email,
      message: values.message,
    })
  }

  getBody = () => {
    const { pristine, submitting, handleSubmit } = this.props
    let body = null
    if (submitting) {
      body = <div className="sp-body">Message sending....</div>
    } else if (this.props.messageSentResults !== null) {
      body = this.props.messageSentResults.error
        ? (
          <div className="sp-body">SORRY, SOMETHING WENT WRONG. PLEASE TRY AGAIN SHORTLY OR EMAIL ME DIRECTLY AT
            <a className="sp-link" href="mailto:al@iamspacecake.com">AL@IAMSPACECAKE.COM</a>
          </div>)
        : <div className="sp-body">THANK YOU FOR CONTACTING ME. I WILL BE IN TOUCH WITH YOUR SHORTLY.</div>
    } else {
      body = (
        <Fragment>
          <div className="sp-body">
            IF YOU WOULD LIKE ME TO PERFORM AT AN EVENT, PLEASE PROVIDE INFORMATION
            ABOUT THE EVENT ALONG WITH THE BEST WAY TO REACH YOU.
          </div>
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
        </Fragment>
      )
    }
    return body
  }

  render() {
    return (
      <div className="sp-contact sp-page">
        <Container>
          <PageHeader>CONTACT</PageHeader>
          {this.getBody()}
        </Container>
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    messageSentResults: state.contact.messageSentResults,
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { sendMessage, clearResults },
  dispatch,
)

export default reduxForm({
  form: FORM_NAME,
})(connect(mapStateToProps, mapDispatchToProps)(Contact))
