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
          media="(min-width: 2400px)"
          type="image/png"
        />) : null}
      {sizes.medium ? (
        <source
          srcSet={images.medium}
          media="(min-width: 1800px)"
          type="image/png"
        />) : null}
      {sizes.small ? (
        <source
          srcSet={images.small}
          media="(min-width: 1200px)"
          type="image/png"
        />) : null}
      {sizes.mobile ? (
        <source
          srcSet={images.mobile}
          media="(min-width: 700px)"
          type="image/png"
        />) : null}
      <img src={images.thumbnail} alt={altText} />
    </picture>)
}
