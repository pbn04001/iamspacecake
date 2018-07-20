import React from 'react'
import { ENDPOINTS } from './api/constants'

function parseImageSize(imageUrl, folder, size) {
  return imageUrl.replace(folder, `styles/${size}/public/${folder}`)
}

export const getImages = (image, folder) => {
  const images = {}
  const imageUrl = `/${ENDPOINTS.CONTENT}/${image.split('/drupal/')[1]}`
  images.original = imageUrl
  images.thumbnail = parseImageSize(imageUrl, folder, 'thumbnail')
  images.small = parseImageSize(imageUrl, folder, 'small')
  return images
}

export const getFullPicture = (image, altText, folder, onClick = null) => {
  const images = getImages(image, folder)
  return (<img src={images.original} alt={altText} style={{width: 'auto', height: 'auto'}} onClick={onClick} />)
}

export const getPicture = (image, altText, folder, onClick = null) => {
  const images = getImages(image, folder)
  return (<img src={images.original} alt={altText} onClick={onClick} />)
}
