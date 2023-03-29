import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { ProductDataMin } from "../../types/data-type";
import { cls } from "../../utils/class";

interface ProductTagTabProps {
  product: ProductDataMin[];
  tagItems: ProductDataMin[];
  closeTab: () => void;
  onSetItems: (list: ProductDataMin[]) => void;
}

const ProductTagTab: NextPage<ProductTagTabProps> = ({
  product,
  tagItems,
  closeTab,
  onSetItems,
}) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [temporaryItems, setTemporaryItems] = useState<ProductDataMin[]>([]);

  const setItemList = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const id = e.target.id;

    let tagItem: ProductDataMin;
    product?.forEach(item => {
      if (item.id === +id) tagItem = item;
    });

    if (isChecked) {
      setCheckedItems(prev => [...prev, +id]);
      setTemporaryItems(prev => [...prev, tagItem]);
    } else {
      setTemporaryItems(prev => prev.filter(item => item.id !== +id));
      setCheckedItems(prev => prev.filter(item => item !== +id));
    }
  };

  const submitList = () => {
    onSetItems(temporaryItems);
    closeTab();
  };

  useEffect(() => {
    if (tagItems.length > 0) {
      const checkedList = tagItems.map(item => +item.id);
      setCheckedItems(checkedList);
      setTemporaryItems(tagItems);
    }
  }, [tagItems]);

  const notice =
    product?.length > 0
      ? "게시물에 태그할 상품을 선택해 주세요."
      : "태그할 수 있는 상품이 없습니다.";

  return (
    <div className="fixed bottom-0 z-30 w-[390px] animate-bottomsheet transition">
      <div className="flex h-16 w-full items-center justify-center bg-white p-5 text-center">
        <span className="text-lg font-bold">상품 태그</span>
        <Icon
          icon="carbon:close"
          className="absolute top-4 right-4 z-50 h-7 w-7 cursor-pointer"
          onClick={closeTab}
        />
        <button
          className="absolute bottom-5 right-5 z-50 cursor-pointer font-bold"
          onClick={submitList}
        >
          완료
        </button>
      </div>
      <div className="h-[470px] w-full bg-white p-5 pt-0">
        <p className="text-textColor-gray-100">{notice}</p>
        <ul className="h-96 w-full space-y-4 overflow-y-scroll pt-5 [&>li]:text-textColor-gray-100">
          {product?.map(item => (
            <li key={item.id}>
              <input
                type="checkbox"
                id={item.id.toString()}
                className={cls("peer hidden")}
                onChange={setItemList}
                checked={checkedItems.includes(+item.id) ? true : false}
              />
              <label
                htmlFor={item.id.toString()}
                className="flex items-center gap-5 peer-checked:[&>span]:border-black peer-checked:[&>span]:bg-primary-green
                    peer-checked:[&>span]:after:absolute peer-checked:[&>span]:after:top-0.5 peer-checked:[&>span]:after:left-0.5
                    peer-checked:[&>span]:after:block peer-checked:[&>span]:after:h-[6px] peer-checked:[&>span]:after:w-[9px]
                    peer-checked:[&>span]:after:origin-center peer-checked:[&>span]:after:-rotate-45 peer-checked:[&>span]:after:border-2
                    peer-checked:[&>span]:after:border-t-0 peer-checked:[&>span]:after:border-r-0 peer-checked:[&>span]:after:border-black
                    "
              >
                <span className="relative h-4 w-4 border-2 border-textColor-gray-100"></span>
                <div className="flex">
                  <img
                    src={item.imgurl[0].img}
                    alt={item.title}
                    className="mr-3 h-[62px] w-[62px] border border-common-black object-cover"
                  />
                  <div className="text-common-black">
                    <p>{item.brand}</p>
                    <p className="mb-2 text-xs text-textColor-gray-100">
                      {item.title}
                    </p>
                    <p className="font-bold">{item.price}</p>
                  </div>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductTagTab;
