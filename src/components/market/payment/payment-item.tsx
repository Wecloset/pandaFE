import { NextPage } from "next";
import Link from "next/link";

const PaymentItem: NextPage = () => {
  return (
    <li className="relative flex gap-[14px] pt-3">
      <Link href="">
        <div role="img" className="h-[100px] w-[100px] bg-borderColor-gray">
          <div className="h-full w-full" />
        </div>
      </Link>
      <dl>
        <dt>Vivienne Westwood</dt>
        <dd className="mb-2 text-textColor-gray-100">
          비비안 웨스트우드 카드지갑
        </dd>
        <dd aria-label="가격" className="mb-[10px] text-base font-bold">
          185,000
        </dd>
      </dl>
      <button className="border-textColor-gray text-borderColor-gray-100 absolute right-0 bottom-0 h-8 w-16 border text-xs">
        삭제
      </button>
    </li>
  );
};

export default PaymentItem;
