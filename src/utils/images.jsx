import React from 'react'
import { ENDPOINTS } from './api/constants'

function parseImageSize(imageUrl, folder, size) {
  return imageUrl.replace(folder, `styles/${size}/public/${folder}`)
}

export const getImages = (image, folder) => {
  const images = {}
  const imageUrl = `${ENDPOINTS.CONTENT}/${image.split('/drupal/')[1]}`
  images.thumbnail = parseImageSize(imageUrl, folder, 'thumbnail')
  images.mobile = parseImageSize(imageUrl, folder, 'mobile')
  images.small = parseImageSize(imageUrl, folder, 'small')
  images.medium = parseImageSize(imageUrl, folder, 'medium')
  images.large = parseImageSize(imageUrl, folder, 'large')
  return images
}

export const getPicture = (image, altText, sizes, folder) => {
  const images = getImages(image, folder)
  return (
    <picture>
      {sizes.large ? (
        <source
          srcSet={images.large}
          media="(min-width: 1340px)"
          type="image/png"
        />) : null}
      {sizes.medium ? (
        <source
          srcSet={images.medium}
          media="(min-width: 1024px)"
          type="image/png"
        />) : null}
      {sizes.small ? (
        <source
          srcSet={images.small}
          media="(min-width: 768px)"
          type="image/png"
        />) : null}
      {sizes.mobile ? (
        <source
          srcSet={images.mobile}
          type="image/png"
        />) : null}
      <img src={images.medium} alt={altText} />
    </picture>)
}
