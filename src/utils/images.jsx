import React from 'react'
import { ENDPOINTS } from './api/constants'

const adjustImagePath = (imageUrl) => {
  if (imageUrl) {
    const images = imageUrl.split(',')
    const imageArray = []
    images.forEach((image) => {
      imageArray.push(`/${ENDPOINTS.CONTENT}/${image.split('/drupal/')[1]}`)
    })
    return imageArray
  }
  return []
}

export const getImages = (product) => {
  const images = {}
  images.original = adjustImagePath(product.defaultImage)
  images.small = adjustImagePath(product.smallImage)
  images.medium = adjustImagePath(product.mediumImage)
  images.large = adjustImagePath(product.largeImage)
  images.thumbnail = adjustImagePath(product.thumbnailImage)
  return images
}

export const getFullPicture = (images, currentImage = 0, altText, onClick = null) => {
  return (<img src={images.original[currentImage]} alt={altText} style={{ width: 'auto', height: 'auto' }} onClick={onClick} />)  // eslint-disable-line
}

export const getProductPicture = (images, currentImage = 0, altText, onClick = null) => {
  return (<img src={images.medium[currentImage]} alt={altText} onClick={onClick} />) // eslint-disable-line
}

export const getPicture = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.original[0]} alt={altText} onClick={onClick} />) // eslint-disable-line
}

export const getSmallPicture = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.small[0]} alt={altText} onClick={onClick} />) // eslint-disable-line
}

export const getMediumPicture = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.medium[0]} alt={altText} onClick={onClick} />) // eslint-disable-line
}

export const getNewsImage = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.large[0]} alt={altText} onClick={onClick} />) // eslint-disable-line
}

export const getThumbnail = (product, altText, onClick = null) => {
  const images = getImages(product)
  return (<img src={images.thumbnail[0]} alt={altText} onClick={onClick} />) // eslint-disable-line
}
