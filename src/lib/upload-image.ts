import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

  const upload = async (file: File) => {
    const encodedName = Buffer.from(file.name).toString("base64");
    const ext = file.type.split("/")[1];
    const key = `products/${encodedName.substring(0, 11)}.${ext}`;

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

  return [upload];
};

export default uploadImage;
