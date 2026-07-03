export const getImageSrc = (img) => {
  if (!img) return "/placeholder.jpg";

  if (img.startsWith("http")) return img;

  const normalizedImg = img
    .replace(".jpg", ".png")
    .replace(".jpeg", ".png");

  return normalizedImg.startsWith("/")
    ? normalizedImg
    : `/${normalizedImg}`;
};