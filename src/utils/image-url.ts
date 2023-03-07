export const createImageUrl = (file: File) => {
  const ext = file.type.split("/")[1];
  const encodedName = Buffer.from(file.name).toString("base64");
  const key = `products/${encodedName.substring(0, 11)}.${ext}`; // products/MjU3NzcxMDU.jpeg
  const imageurl = `https://panda-products.s3.ap-northeast-2.amazonaws.com/${key}`;
  return imageurl;
};
