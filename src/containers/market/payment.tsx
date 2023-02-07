import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Link from "next/link";
import ButtonItem from "../../components/ui/buttonitem";

const PaymentPage: NextPage = () => {
  return (
    <>
      <div className=" px-5 py-10">
        <h1 className="mb-[18px] text-base">담은 아이템</h1>
        <ul>
          <li className="relative flex gap-[14px]">
            <Link href="">
              <div
                role="img"
                className="h-[100px] w-[100px] bg-borderColor-gray"
              >
                <div className="h-full w-full" />
              </div>
            </Link>
            <dl>
              <dt>Vivienne Westwood</dt>
              <dd className="mb-2 text-textColor-gray-100">
                <Link href="">비비안 웨스트우드 카드지갑</Link>
              </dd>
              <dd aria-label="가격" className="mb-[10px] text-base font-bold">
                185,000
              </dd>
            </dl>
            <button className="border-textColor-gray text-borderColor-gray-100 absolute right-0 bottom-0 h-8 w-16 border text-xs">
              삭제
            </button>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-0 h-[300px] w-full border-t border-common-black px-5 py-5">
        <div className="absolute -top-8 flex items-center text-xs text-textColor-gray-100">
          <input type="checkbox" id="agree" className="peer hidden" />
          <span className="relative mr-2 h-4 w-4 border-2 border-common-black peer-checked:border-0 peer-checked:bg-primary-violet"></span>
          <Icon
            icon="material-symbols:check-small"
            className="absolute -top-1 -left-1 hidden text-2xl text-common-black peer-checked:block"
          />
          <label htmlFor="agree">
            상품 및 주문 유의사항을 확인하였으며 이에 동의합니다.
          </label>
        </div>
        <h2 className="border-b border-borderColor-gray pb-[14px] text-base">
          주문금액
        </h2>
        <div className="py-[14px]">
          <div className="flex justify-between">
            상품 금액
            <span>
              <b className="text-base">185000</b>원
            </span>
          </div>
          <div className="mb-11 flex justify-between">
            배송비
            <span>
              <b className="text-base">3000</b>원
            </span>
          </div>
          <div className="flex justify-between text-base">
            총 결제금액
            <span>
              <b className="text-xl text-primary-violet">188000</b>원
            </span>
          </div>
        </div>
      </div>
      <ButtonItem text="결제하기" color="bg-black" fontColor="text-white" />
    </>
  );
};

export default PaymentPage;
