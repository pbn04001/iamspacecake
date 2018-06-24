export const getImages = (image, folder) => {
  const images = {};
  const imageExternalUrl = `/rest/${image.split('/drupal/')[1]}`;
  images.mobile = imageExternalUrl.replace(folder, `styles/medium/public/${folder}`);
  images.small = imageExternalUrl.replace(folder, `styles/large/public/${folder}`);
  images.medium = imageExternalUrl.replace(folder, `styles/max_650x650/public/${folder}`);
  images.large = imageExternalUrl.replace(folder, `styles/max_1300x1300/public/${folder}`);
  return images;
}
