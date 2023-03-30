import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Image from "next/image";
import { translateClasses } from "../../../lib/translate-class";
import { cls } from "../../../utils/class";
import LoadingSpinner from "../../ui/loading-spinner";
import useSlide from "../../../hooks/useSlide";

interface Images {
  id: number;
  img: string;
  productId?: number;
}

const ImageSlide: NextPage<{ images: Images[]; isLoading?: boolean }> = ({
  images,
  isLoading,
}) => {
  const { next, prev, transitionEnd, translateX, isMoving, slideNum } =
    useSlide({
      list: images,
      classes: translateClasses.detailSlide,
    });

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
              priority
            />
          </li>
          {images.map(item => (
            <li key={item.id}>
              <Image
                src={item.img}
                alt={`상품이미지${item.id}`}
                width={390}
                height={370}
                className="h-[370px] w-[390px] object-cover"
              />
            </li>
          ))}
          <li>
            <Image
              src={firstImageClone}
              alt="상품이미지"
              width={390}
              height={370}
              className="h-[370px] w-[390px] object-cover"
            />
          </li>
        </ul>
      </div>
      {images.length > 1 && (
        <div className="absolute top-1/2 flex w-[390px] items-center justify-between px-5 text-2xl text-common-black">
          <Icon
            icon="material-symbols:chevron-left"
            className="absolute left-2"
            onClick={prev}
          />
          <Icon
            icon="material-symbols:chevron-right"
            className="absolute right-2"
            onClick={next}
          />
        </div>
      )}
      <div className="absolute bottom-2 flex h-[3px] w-[390px] justify-center space-x-0.5">
        {images.map((item, i) => (
          <span
            key={item.id}
            className={`block h-[2px] w-6 ${
              slideNum - 1 === i ? "bg-black" : "bg-white opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlide;
