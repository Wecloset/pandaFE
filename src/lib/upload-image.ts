import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { v1, v4, v5 } from "uuid";

interface credentialProps {
  region: string;
  accessKey: string;
  secretKey: string;
}

const uploadImage = ({ region, accessKey, secretKey }: credentialProps) => {
  const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const fetchImage = async (file: any) => {
    console.log(file);
    const ext = file.type.split("/")[1];
    const key = `products/${v4().replaceAll("-", "")}.${ext}`;

    const bucketParams = {
      Bucket: "panda-products",
      Key: key,
      Body: file,
      ContentType: "image/jpeg",
      ACL: "public-read",
    };

    try {
      const response = await s3Client.send(new PutObjectCommand(bucketParams));
      console.log(response);
    } catch (err) {
      console.log("Error", err);
    }
  };

  // const deleteImage = async (file: any) => {
  //   // const ext = file.type.split("/")[1];
  //   // const key = `panda-products.s3.${region}.amazon.aws.com/products/${v4().replaceAll(
  //   //   "-",
  //   //   "",
  //   // )}.${ext}`;

  //   const bucketParams = {
  //     Bucket: "panda-products",
  //     Key: "panda-products.s3.ap-northeast-2.amazonaws.com/products/e30f53a2a862479f87ce26e36859fece.jpeg",
  //   };

  //   try {
  //     const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
  //     console.log("Success. Object deleted.", data);
  //   } catch (err) {
  //     console.log("Error", err);
  //   }
  // };

  return [fetchImage];
};

export default uploadImage;
