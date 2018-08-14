import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Button } from 'components/button/button'
import { Container } from 'components/container'
import { Validation } from 'utils/validation'
import 'styles/components/forms.scss'
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
    const disabled = pristine || submitting
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
      const { email, required } = Validation
      body = (
        <Fragment>
          <form className="sp-form" onSubmit={handleSubmit(this.onSubmit)}>
            <div>
              <label htmlFor="contact-name">NAME</label>
              <div className="sp-form__row">
                <Field
                  id="contact-name"
                  name="name"
                  component={this.input}
                  type="text"
                  placeholder="Name"
                  className="sp-form__input"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="sp-form__row">
              <label htmlFor="contact-email">EMAIL</label>
              <div>
                <Field
                  id="contact-email"
                  name="email"
                  component={this.input}
                  type="text"
                  placeholder="Email"
                  className="sp-form__input"
                  validate={[required, email]}
                />
              </div>
            </div>
            <div className="sp-form__row">
              <label htmlFor="contact-message">MESSAGE</label>
              <div>
                <Field
                  id="contact-message"
                  name="message"
                  component={this.textArea}
                  className="sp-form__input"
                  validate={[required]}
                />
              </div>
            </div>
            <Button buttonType="submit" disabled={disabled} className={disabled && 'sp-button--disabled'}>
              SEND MESSAGE
            </Button>
          </form>
        </Fragment>
      )
    }
    return body
  }

  input = (args) => {
    const { input, meta } = args
    const error = meta.touched && meta.invalid && meta.error
    return (
      <Fragment>
        <input {...input} className={`${args.className} ${error && 'sp-form__input--error'}`} />
        { error && (<div className="sp-form__error">{meta.error}</div>)}
      </Fragment>)
  }

  textArea = (args) => {
    const { input, meta } = args
    const error = meta.touched && meta.invalid && meta.error
    return (
      <Fragment>
        <textarea {...input} className={`${args.className} ${error && 'sp-form__input--error'}`} />
        { error && (<div className="sp-form__error">{meta.error}</div>)}
      </Fragment>)
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
