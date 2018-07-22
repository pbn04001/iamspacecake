import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Container, CONTAINER_TYPE } from 'components/container'
import { PageHeader } from 'components/typography'
import isEmpty from 'lodash/isEmpty'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { bindActionCreators } from 'redux'
import { regularPrice } from 'utils/price'
import { renderPaypalButton } from 'utils/paypal'
import { ERROR_TYPES } from 'utils/api/constants'

import {
  getShoppingCartItems,
  getShoppingCartTotal,
  getErrorModal,
} from './state/selectors'
import {
  emptyCart,
  toggleErrorModal,
  removeItemFromShoppingCart,
  purchaseComplete,
} from './state/actions'
import { ERROR_MODAL_MESSAGING } from './state/constants'

import './styles.scss'

class Cart extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    shoppingCartItems: PropTypes.array.isRequired,
    shoppingCartTotal: PropTypes.number.isRequired,
    toggleErrorModal: PropTypes.func.isRequired,
    errorModal: PropTypes.object.isRequired,
    removeItemFromShoppingCart: PropTypes.func.isRequired,
    purchaseComplete: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { shoppingCartItems } = this.props
    if (!isEmpty(shoppingCartItems)) {
      renderPaypalButton(shoppingCartItems, 'paypal-button', this.purchaseComplete, this.purchaseError)
    }
  }

  purchaseComplete = (results) => {
    this.props.purchaseComplete(results.results)
    this.props.history.push('/order-complete')
  }

  removeItemFromCart = (itemId) => {
    const foundItem = this.props.shoppingCartItems.find(item => parseInt(item.nid,10) === itemId)
    if (foundItem) this.props.removeItemFromShoppingCart(foundItem)
  }

  purchaseError = (results) => {
    if (results.type) {
      switch (results.type) {
        case ERROR_TYPES.PURCHASED_ITEMS_NO_LONGER_AVAILABLE:
          this.props.toggleErrorModal(true,
            ERROR_MODAL_MESSAGING.OUT_OF_STOCK.TITLE,
            ERROR_MODAL_MESSAGING.OUT_OF_STOCK.MESSAGE)
          this.removeItemFromCart(results.itemId)
          break
        default:
          break
      }
    } else {
      this.props.toggleErrorModal(true,
        ERROR_MODAL_MESSAGING.UNEXPECTED_ERROR.TITLE,
        ERROR_MODAL_MESSAGING.UNEXPECTED_ERROR.MESSAGE)
    }
  }

  closeModal = () => {
    this.props.toggleErrorModal(false)
  }

  cartCount = () => {
    const { shoppingCartItems } = this.props
    return !isEmpty(shoppingCartItems) && `(${shoppingCartItems.length})`
  }

  shoppingCartRight = () => {
    const { shoppingCartItems, shoppingCartTotal } = this.props
    return !isEmpty(shoppingCartItems) && (
      <div className="sp-cart-total">
        <div className="sp-cart-total__title">Summary</div>
        <div className="sp-cart-total__shipping">
          SHIPPING ON ALL ITEMS IS FREE
        </div>
        <div className="sp-cart-total__total">
          TOTAL {regularPrice(shoppingCartTotal)}
        </div>
        <div
          id="paypal-button"
          className="sp-cart-total__paypal-button"
        />
      </div>)
  }

  renderModal = () => {
    return (
      <Modal
        isOpen={this.props.errorModal.visible}
        onRequestClose={this.closeModal}
        className="sp-modal sp-modal"
        overlayClassName="sp-modal__overlay"
      >
        <div className="sp-modal__container">
          <div className="sp-modal__header">
            <span className="sp-modal__title">{this.props.errorModal.title}</span>
            <button type="button" className="sp-modal__close" onClick={this.closeModal}>Close</button>
          </div>
          <div className="sp-modal__contents">
            {this.props.errorModal.body}
          </div>
        </div>
      </Modal>
    )
  }

  render() {
    const { shoppingCartItems } = this.props
    return (
      <div className="sp-cart sp-page">
        {this.renderModal()}
        <Container type={CONTAINER_TYPE.TOP_LEFT}>
          <PageHeader>SHOPPING CART {this.cartCount()}</PageHeader>
          <div className="sp-cart__body">
            <div className="sp-cart__left">
              <ShoppingCartList shoppingCartItems={shoppingCartItems} />
            </div>
            {this.shoppingCartRight()}
          </div>
        </Container>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shoppingCartItems: getShoppingCartItems(state),
    shoppingCartTotal: getShoppingCartTotal(state),
    errorModal: getErrorModal(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { toggleErrorModal, emptyCart, removeItemFromShoppingCart, purchaseComplete },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart))
