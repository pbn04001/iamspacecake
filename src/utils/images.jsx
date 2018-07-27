import React from 'react'
import { ENDPOINTS } from './api/constants'

const adjustImagePath = (imageUrl) => {
  return imageUrl ? `/${ENDPOINTS.CONTENT}/${imageUrl.split('/drupal/')[1]}` : ''
}

export const getImages = (product) => {
  const images = {}
  images.original = adjustImagePath(product.defaultImage)
  images.small = adjustImagePath(product.smallImage)
  images.medium = adjustImagePath(product.mediumImage)
  images.thumbnail = adjustImagePath(product.thumbnailImage)
  return images
}

export const getFullPicture = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.original} alt={altText} style={{ width: 'auto', height: 'auto' }} onClick={onClick} />)  // eslint-disable-line
}

export const getPicture = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.original} alt={altText} onClick={onClick} />) // eslint-disable-line
}

export const getSmallPicture = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.small} alt={altText} onClick={onClick} />) // eslint-disable-line
}

export const getMediumPicture = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.medium} alt={altText} onClick={onClick} />) // eslint-disable-line
}

export const getThumbnail = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.thumbnail} alt={altText} onClick={onClick} />) // eslint-disable-line
}
