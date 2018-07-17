import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from 'components/typography'
import { Container, CONTAINER_TYPE } from 'components/container'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-modal'
import { formatPrice } from 'utils/price'
import BuyButton from 'components/shoppingCart/buyButton'
import { getPicture, getFullPicture } from 'utils/images'
import { loadProduct, toggleModal } from './state/actions'

import 'styles/views/product.scss'

class Product extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    loadProduct: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    product: PropTypes.object,
    modalOpen: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { match } = this.props
    this.props.loadProduct(match.params.id)
  }

  openModal = () => this.props.toggleModal(true)

  closeModal = () => this.props.toggleModal(false)

  renderModal = () => {
    const { title, fieldImage } = this.props.product
    return (
      <Modal
        isOpen={this.props.modalOpen}
        onRequestClose={() => this.props.toggleModal(false)}
      >
        <div className="sp-modal">
          <div className="sp-modal__header">
            <button type="button" className="sp-modal__close" onClick={this.closeModal}>Close</button>
          </div>
          <div className="sp-modal__contents">
            {getFullPicture(fieldImage,
              title,
              'product_images')}
          </div>
        </div>
      </Modal>
    )
  }

  renderProduct = () => {
    const { product } = this.props
    if (!product) {
      return <div>Loading...</div>
    }
    const {
      title, body, price, fieldImage,
    } = product
    return (
      <Fragment>
        {this.renderModal()}
        <div className="sp-product">
          <div className="sp-product__image">
            {getPicture(fieldImage,
              title,
              { medium: true, small: true, mobile: true },
              'product_images',
              this.openModal)}
          </div>
          <div className="sp-product__content">
            <PageHeader>{title}</PageHeader>
            <div
              className="sp-product__body"
              dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
            />
            <span className="sp-product__buy-line">
              <span className="sp-product__price">{formatPrice(price)}</span>
              <BuyButton item={product} />
            </span>
          </div>
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <div className="sp-shop sp-page">
        <Container type={CONTAINER_TYPE.TOP_LEFT}>
          {this.renderProduct()}
        </Container>
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    product: state.product.product,
    modalOpen: state.product.modalOpen,
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { loadProduct, toggleModal },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(Product)