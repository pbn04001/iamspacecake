import React from 'react'
import { ENDPOINTS } from './api/constants'

function parseImageSize(imageUrl, folder, size) {
  return imageUrl.replace(folder, `styles/${size}/public/${folder}`)
}

export const getImages = (image, folder) => {
  const images = {}
  const imageUrl = `/${ENDPOINTS.CONTENT}/${image.split('/drupal/')[1]}`
  images.thumbnail = parseImageSize(imageUrl, folder, 'thumbnail')
  images.mobile = parseImageSize(imageUrl, folder, 'mobile')
  images.small = parseImageSize(imageUrl, folder, 'small')
  images.medium = parseImageSize(imageUrl, folder, 'medium')
  images.large = parseImageSize(imageUrl, folder, 'large')
  return images
}

export const getPicture = (image, altText, sizes, folder, onClick = null) => {
  const images = getImages(image, folder)
  const picture = (
    <picture>
      {sizes.large ? (
        <source
          srcSet={images.large}
          media="(min-width: 1000px)"
          type="image/png"
        />) : null}
      {sizes.medium ? (
        <source
          srcSet={images.medium}
          media="(min-width: 700px)"
          type="image/png"
        />) : null}
      {sizes.small ? (
        <source
          srcSet={images.small}
          media="(min-width: 400px)"
          type="image/png"
        />) : null}
      {sizes.mobile ? (
        <source
          srcSet={images.mobile}
          media="(min-width: 200px)"
          type="image/png"
        />) : null}
      <img src={images.thumbnail} alt={altText} />
    </picture>)
  if (onClick) {
    return <button type="button" onClick={onClick}>{picture}</button>
  }
  return picture
}

export const getFullPicture = (image, altText, folder) => {
  const images = getImages(image, folder)
  return (
    <picture>
      <source
        srcSet={images.large}
        media="(min-width: 768px)"
        type="image/png"
      />
      <img src={images.medium} alt={altText} />
    </picture>)
}

export const getThumbnail = (image, altText, folder) => {
  const images = getImages(image, folder)
  return (
    <img src={images.medium} alt={altText} />
  )
}
