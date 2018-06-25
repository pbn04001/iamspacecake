export const getImages = (image, folder) => {
  const images = {};
  const imageUrl = `/rest/${image.split('/drupal/')[1]}`;
  images.thumbnail = parseImageSize(imageUrl, folder, 'thumbnail')
  images.mobile = parseImageSize(imageUrl, folder, 'mobile')
  images.small = parseImageSize(imageUrl, folder, 'small')
  images.medium = parseImageSize(imageUrl, folder, 'medium')
  images.large = parseImageSize(imageUrl, folder, 'large')
  return images;
}

function parseImageSize(imageUrl, folder, size) {
  return imageUrl.replace(folder, `styles/${size}/public/${folder}`);
}
