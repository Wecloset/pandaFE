import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { useCallback, useState } from "react";

interface credentialProps {
  region: string;
  accessKey: string;
  secretKey: string;
}

interface ImageInfo {
  name: string;
  dataUrl: string;
  file: File;
}

const useUpload = ({ region, accessKey, secretKey }: credentialProps) => {
  const [imgsrc, setImgsrc] = useState<ImageInfo[]>([]);

  const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const uploadImage = useCallback(async (file: File, path: string) => {
    const encodedName = Buffer.from(file.name).toString("base64");
    const ext = file.type.split("/")[1];
    const key = `${path}/${encodedName}.${ext}`;
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
  }, []);

  const deleteImage = (selectedImage: string) => {
    setImgsrc(prev => prev.filter(item => item.dataUrl !== selectedImage));
  };

  const encodeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files;
    if (!imageFile || imageFile.length < 0) return;

    [...imageFile].forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;
        const obj = {
          name: file.name,
          dataUrl: result,
          file,
        };

        setImgsrc(prev => [...prev, obj]);
      };
    });
  };

  return { uploadImage, deleteImage, encodeFile, imgsrc };
};

export default useUpload;
