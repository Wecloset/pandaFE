import { Icon } from "@iconify/react";
import { NextPage } from "next";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { CreateState } from "../../types/create-type";

interface UploadImagesProps {
  deleteImage: (selectedImage: string) => void;
  encodeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imgsrc: {
    name: string;
    dataUrl: string;
    file: File;
  }[];
}

const UploadImages: NextPage<UploadImagesProps> = ({
  deleteImage,
  encodeFile,
  imgsrc,
}) => {
  const { register } = useFormContext();

  return (
    <div className="mb-6 flex">
      <label className="mr-2 mt-2 flex h-[100px] w-[100px] flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-1 border bg-gray-100 text-textColor-gray-100">
        <input
          type="file"
          {...register("image", {
            required: "1개 이상의 이미지를 등록해주세요.",
            onChange: e => encodeFile(e),
          })}
          name="image"
          accept="image/png, image/jpeg"
          multiple
          className="hidden"
        />
        <Icon icon="bxs:image-add" className="text-2xl" />
        <p>
          {imgsrc.length === 0 ? 0 : imgsrc.length}
          /10
        </p>
      </label>
      <div className="h-[110px] w-[242px] overflow-x-scroll">
        <div className="mt-2 w-[242px]">
          <ul className="flex gap-2 ">
            {imgsrc.length > 0 &&
              imgsrc.map((item, i) => (
                <li
                  key={i}
                  className="relative h-[100px] w-[100px] flex-shrink-0 border border-borderColor-gray"
                >
                  <div className="peer">
                    <img
                      src={item.dataUrl}
                      alt={`업로드이미지${i}`}
                      className="h-[100px] w-[100px] object-cover"
                    />
                  </div>
                  <Icon
                    icon="ri:close-circle-fill"
                    className="absolute -top-2 -right-1 z-50 hidden rounded-full bg-white text-xl hover:block hover:cursor-pointer peer-hover:block"
                    onClick={() => deleteImage(item.dataUrl)}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
