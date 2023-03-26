export const createImageUrl = (file: File, path: string) => {
  const ext = file.type.split("/")[1];
  const encodedName = Buffer.from(file.name).toString("base64");
  const key = `${path}/${encodedName}.${ext}`; // products/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDItMjAtMjAtMTctMTggMDAxLmpwZWc=.jpeg
  const imageurl = `https://panda-products.s3.ap-northeast-2.amazonaws.com/${key}`;
  return imageurl;
};
