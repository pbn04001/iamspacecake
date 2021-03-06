import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from 'components/typography'
import { Container } from 'components/container'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-modal'
import { formatPrice } from 'utils/price'
import BuyButton from 'components/shoppingCart/buyButton'
import { getImages, getProductPicture, getFullPicture } from 'utils/images'
import { loadProduct, toggleModal } from './state/actions'

import './styles.scss'

class Product extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    loadProduct: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    product: PropTypes.object,
    modalOpen: PropTypes.bool.isRequired,
  }

  state = {
    currentImage: 0,
  }

  componentDidMount() {
    const { match } = this.props
    this.props.loadProduct(match.params.id)
  }

  getSold = (product, mobile) => {
    if (product.stock > 0) return null

    const className = `sp-product__sold-out ${mobile ? 'sp-product__sold-out--mobile' : ''}`
    return <span className={className}>SOLD</span>
  }

  setNewImage = (images, backward) => {
    const { currentImage } = this.state
    let newIndex = backward ? currentImage - 1 : currentImage + 1
    if (newIndex < 0) {
      newIndex = images.original.length - 1
    } else if (newIndex > images.original.length - 1) {
      newIndex = 0
    }
    this.setState({ currentImage: newIndex })
  }

  openModal = () => this.props.toggleModal(true)

  closeModal = () => this.props.toggleModal(false)

  renderModal = (images) => {
    const { title } = this.props.product
    return (
      <Modal
        isOpen={this.props.modalOpen}
        onRequestClose={() => this.props.toggleModal(false)}
        className="sp-modal sp-modal--image"
        overlayClassName="sp-modal__overlay"
      >
        <div className="sp-modal__container">
          <div className="sp-modal__header">
            <span className="sp-modal__title">{title}</span>
            <button type="button" className="sp-modal__close" onClick={this.closeModal}>Close</button>
          </div>
          <div className="sp-modal__contents">
            {this.renderImagePicker(images)}
            {getFullPicture(images, this.state.currentImage, title)}
          </div>
        </div>
      </Modal>
    )
  }

  renderImagePicker = (images) => {
    if (images.original.length > 1) {
      return (
        <Fragment>
          <button
            type="button"
            className="sp-product__image-left"
            onClick={() => {
              this.setNewImage(images, true)
            }}
          />
          <button
            type="button"
            className="sp-product__image-right"
            onClick={() => {
              this.setNewImage(images, false)
            }}
          />
        </Fragment>)
    }
    return null
  }

  renderProduct = () => {
    const { product } = this.props
    if (!product) {
      return <div>Loading...</div>
    }
    const {
      title, body, price,
    } = product
    const images = getImages(this.props.product)
    return (
      <Fragment>
        {this.renderModal(images)}
        <div className="sp-product">
          <PageHeader className="sp-product__mobile-title">{title}</PageHeader>{this.getSold(product, true)}
          <div className="sp-product__image">
            {this.renderImagePicker(images)}
            {getProductPicture(images, this.state.currentImage, title, this.openModal)}
          </div>
          <div className="sp-product__content">
            <PageHeader>{title}</PageHeader>
            {this.getSold(product)}
            <div
              className="sp-product__body"
              dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
            />
            <span className="sp-product__buy-line">
              <span className="sp-product__price">{formatPrice(price)}</span>
              {product.stock > 0 && (<BuyButton item={product} />)}
            </span>
          </div>
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <div className="sp-shop sp-page">
        <Container>
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
