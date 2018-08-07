import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import qs from 'query-string'
import { Container, CONTAINER_TYPE } from 'components/container'
import { PageHeader } from 'components/typography'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ERROR_MODAL_MESSAGING } from './state/constants'
import { ERROR_TYPES } from 'utils/api/constants'

import {
  purchaseComplete,
  retrievePayment,
} from './state/actions'
import { getOrderResults } from './state/selectors'

import './styles.scss'

class ProcessingOrder extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    purchaseComplete: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    retrievePayment: PropTypes.func.isRequired,
    retrievedPayment: PropTypes.object,
  }

  componentDidMount() {
    const { location } = this.props
    const parsed = qs.parse(location.search)
    if (parsed.paymentId && parsed.PayerID) {
      this.props.retrievePayment(parsed.paymentId, parsed.PayerID)
    }
  }

  render() {
    const { retrievedPayment, orderResults } = this.props

    if (orderResults) {
      this.props.history.push('/')
    }else if (retrievedPayment) {
      if (retrievedPayment.success) {
        this.props.purchaseComplete(retrievedPayment.results)
        this.props.history.push('/order-complete')
      } else if (retrievedPayment.error) {
        let title
        let message
        switch (retrievedPayment.error.type) {
          case ERROR_TYPES.PURCHASED_ITEMS_NO_LONGER_AVAILABLE:
            title = ERROR_MODAL_MESSAGING.OUT_OF_STOCK.TITLE
            message = ERROR_MODAL_MESSAGING.OUT_OF_STOCK.MESSAGE
            break
          case ERROR_TYPES.UNABLE_TO_EXECUTE_PAYPAL_PAYMENT:
            title = ERROR_MODAL_MESSAGING.UNABLE_TO_EXECUTE_PAYMENT.TITLE
            message = ERROR_MODAL_MESSAGING.UNABLE_TO_EXECUTE_PAYMENT.MESSAGE
            break
          default:
            title = ERROR_MODAL_MESSAGING.UNEXPECTED_ERROR.TITLE
            message = ERROR_MODAL_MESSAGING.UNEXPECTED_ERROR.MESSAGE
        }
        return (
          <Container type={CONTAINER_TYPE.TOP_LEFT}>
            <PageHeader>{title}</PageHeader>
            <div className="sp-cart__body">
              {message}
            </div>
          </Container>)
      }
    }

    return (
      <Container type={CONTAINER_TYPE.TOP_LEFT}>
        <PageHeader>PROCESSING ORDER</PageHeader>
        <div className="sp-cart__body">
          Please wait while we finish processing your order.
        </div>
      </Container>)
  }
}

function mapStateToProps(state) {
  return {
    retrievedPayment: state.cart.retrievedPayment,
    orderResults: getOrderResults(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    purchaseComplete, retrievePayment,
  },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProcessingOrder))
