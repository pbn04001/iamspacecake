import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { bindActionCreators } from 'redux'
import { Container, Card, CONTAINER_TYPE } from 'components/container'
import { PageHeader } from 'components/typography'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'
import { getShoppingCartItems } from '../state/selectors'
import { purchaseComplete } from './state/actions'

class Checkout extends Component {
  static propTypes = {
    purchaseComplete: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    shoppingCartItems: PropTypes.array.isRequired,
    orderResults: PropTypes.object,
  }

  componentDidMount() {
    const { shoppingCartItems, history } = this.props
    if (isEmpty(shoppingCartItems)) {
      history.goBack()
    }
  }

  getShoppingCartBody = () => {
    if (this.props.orderResults) {
      if (this.props.orderResults.success) {
        return (
          <div>
            Order Complete
          </div>)
      }
      return (
        <div>
          Error occurred placing order
        </div>
      )
    }
    return (
      <Fragment>
        <ShoppingCartList />
      </Fragment>)
  }

  render() {
    return (
      <div className="sp-page-checkout">
        <Container type={CONTAINER_TYPE.TOP_LEFT}>
          <PageHeader>Checkout</PageHeader>
          <Card>
            {this.getShoppingCartBody()}
          </Card>
        </Container>
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    orderResults: state.checkout.orderResults,
    shoppingCartItems: getShoppingCartItems(state),
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { purchaseComplete },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))
