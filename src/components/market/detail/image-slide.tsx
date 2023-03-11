import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cls } from "../../../utils/class";
import LoadingSpinner from "../../loading-spinner";

interface Images {
  id: number;
  img: string;
  productId?: number;
}

const translateClasses: { [key: string]: string } = {
  0: "transform -translate-x-[0px]",
  1: "transform -translate-x-[390px]",
  2: "transform -translate-x-[780px]",
  3: "transform -translate-x-[1170px]",
  4: "transform -translate-x-[1560px]",
  5: "transform -translate-x-[1950px]",
  6: "transform -translate-x-[2340px]",
  7: "transform -translate-x-[2730px]",
  8: "transform -translate-x-[3120px]",
  9: "transform -translate-x-[3510px]",
  10: "transform -translate-x-[3900px]",
};

const ImageSlide: NextPage<{ images: Images[]; isLoading?: boolean }> = ({
  images,
  isLoading,
}) => {
  const [slideCount, setSlideCount] = useState<number>(1);
  const [translateX, setTranslateX] = useState<string>("");
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const slideCountUp = () => {
    setSlideCount(prev => (prev += 1));
    setIsMoving(true);
  };

  const slideCountDown = () => {
    setSlideCount(prev => (prev -= 1));
    setIsMoving(true);
  };

  const transitionEnd = () => {
    if (slideCount === images.length + 1) {
      setIsMoving(false);
      setSlideCount(1);
    } else if (slideCount === 0) {
      setIsMoving(false);
      setSlideCount(images.length);
    }
  };

  useEffect(() => {
    const translate = translateClasses[slideCount];
    setTranslateX(translate);
  }, [slideCount]);

  const lastImageClone = images.at(-1)?.img as string;
  const firstImageClone = images.at(0)?.img as string;

  return (
    <div className="relative">
      <div className="min-h-[370px] w-full overflow-hidden bg-slate-200">
        {isLoading && <LoadingSpinner />}
        <ul
          className={cls(
            `flex min-h-[370px] [&>li]:flex-shrink-0 ${translateX}`,
            isMoving ? `transition duration-300 ease-out` : "",
          )}
          onTransitionEnd={transitionEnd}
        >
          <li>
            <Image
              src={lastImageClone}
              alt="상품이미지00"
              width={390}
              height={370}
              className="h-[370px] w-[390px] object-cover"
            />
          </li>
          {images.map(item => (
            <li key={item.id}>
              <Image
                src={item.img}
                alt={`상품이미지${item.id}`}
                width={390}
                height={370}
                className="object-cover"
              />
            </li>
          ))}
          <li>
            <Image
              src={firstImageClone}
              alt="상품이미지"
              width={390}
              height={370}
              className="object-cover"
            />
          </li>
        </ul>
      </div>
      {images.length > 1 && (
        <div className="absolute top-1/2 flex w-[390px] items-center justify-between px-5 text-2xl text-textColor-gray-50">
          <Icon
            icon="material-symbols:chevron-left"
            className="absolute left-2"
            onClick={slideCountDown}
          />
          <Icon
            icon="material-symbols:chevron-right"
            className="absolute right-2"
            onClick={slideCountUp}
          />
        </div>
      )}
      <div className="absolute bottom-2 flex h-[3px] w-[390px] justify-center space-x-0.5">
        {images.map((item, i) => (
          <span
            key={item.id}
            className={`block h-[2px] w-6 ${
              slideCount - 1 === i ? "bg-black" : "bg-white opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlide;
