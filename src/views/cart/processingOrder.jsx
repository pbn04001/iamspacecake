import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import qs from 'query-string'
import { Container, CONTAINER_TYPE } from 'components/container'
import { PageHeader } from 'components/typography'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  purchaseComplete,
  retrievePayment,
} from './state/actions'

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
    if (parsed.paymentId) {
      this.props.retrievePayment(parsed.paymentId)
    }
  }


  render() {
    const { retrievedPayment } = this.props

    if (retrievedPayment) {
      if (retrievedPayment.success) {
        console.log(JSON.stringify(retrievedPayment))
        debugger
        this.props.purchaseComplete(retrievedPayment.transaction)
        this.props.history.push('/order-complete')
      } else {
        // TODO: Show error message
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
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    purchaseComplete, retrievePayment,
  },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProcessingOrder))
