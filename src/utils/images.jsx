import React from 'react'
import { ENDPOINTS } from './api/constants'

function parseImageSize(imageUrl, folder, size) {
  return imageUrl.replace(folder, `styles/${size}/public/${folder}`)
}

const adjustImagePath = (imageUrl) => {
  return `/${ENDPOINTS.CONTENT}/${imageUrl.split('/drupal/')[1]}`
}

export const getImages = (product) => {
  const images = {}
  images.original = adjustImagePath(product.fieldImage)
  images.small = adjustImagePath(product.fieldImage1)
  images.thumbnail = adjustImagePath(product.fieldImage2)
  return images
}

export const getFullPicture = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.original} alt={altText} style={{ width: 'auto', height: 'auto' }} onClick={onClick} />)
}

export const getPicture = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.original} alt={altText} onClick={onClick} />)
}

export const getSmallPicture = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.small} alt={altText} onClick={onClick} />)
}

export const getThumbnail = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.thumbnail} alt={altText} onClick={onClick} />)
}
