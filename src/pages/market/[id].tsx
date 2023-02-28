import { Icon } from "@iconify/react";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Button from "../../components/button";
import Header from "../../components/header";
import ImageSlide from "../../components/market/detail/image-slide";
import { MainProductData } from "../../types/data-type";

interface ProductData {
  id: number;
  brand: string;
  category: string;
  description: string;
  price: number;
  title: string;
  view: number;
  imgurl: {
    id: number;
    img: string;
    productId: number;
  }[];
  user: {
    id: number;
    nickname: string;
    profileImg?: string;
  };
}

interface ProductData {
  productData: {
    message: string;
    data: ProductData;
  };
}

const Product: NextPage<ProductData> = ({ productData }) => {
  const { brand, category, description, price, title, imgurl, user, view } =
    productData.data;

  const categoryToEng = (category: string) => {
    switch (category) {
      case "상의":
        return "TOP";
      case "하의":
        return "BOTTOM";
      case "아우터":
        return "OUTER";
      case "가방":
        return "BAG";
      case "기타":
        return "OTHER";
      default:
        return;
    }
  };
  const firstToUppercase = `${brand[0].toUpperCase()}${brand.slice(1)}`;
  const priceAddComma = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      <Header goBack />
      <ImageSlide images={imgurl} />
      <div className="p-5">
        <div className="flex justify-between">
          <div>
            <p className="text-base">{firstToUppercase}</p>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black">
            <Icon icon="icon-park-outline:like" className="text-lg" />
          </div>
        </div>
        <div className="mt-4 mb-6 flex gap-2">
          <div className="rounded-full border border-common-black px-2 py-0.5">
            {categoryToEng(category)}
          </div>
          <div className="rounded-full border border-common-black px-2 py-0.5">
            {firstToUppercase}
          </div>
        </div>
        <div className="mb-4 flex text-xs text-commom-gray">
          <span className="mr-2">조회 {view}</span>
          <span>찜 1</span>
        </div>
        <div className="border-t border-b py-[18px]">
          <p className="mb-8 whitespace-pre-wrap">{description}</p>
          <ul className="flex space-x-3 text-primary-violet">
            <li>#태그</li>
            <li>#태그</li>
          </ul>
        </div>
        <div className="py-5">
          <h3 className="mb-4 text-lg font-bold">Seller</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-[50px] w-[50px] rounded-full border border-common-black bg-slate-400" />
              <span className="ml-4 text-base font-bold">{user.nickname}</span>
            </div>
            <button className="h-8 bg-black px-4 py-1 text-white">
              메시지
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 flex w-[390px] items-center justify-between pl-5">
        <p className="text-2xl font-bold">
          {priceAddComma}
          <span className="text-lg">원</span>
        </p>
        <div className="relative w-64">
          <Button text="구매하기" color="bg-black" fontColor="text-white" />
        </div>
      </div>
    </>
  );
};

const getAllProducts = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/products");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getOneProduct = async (id: string | string[]) => {
  const productId = id;
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${productId}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getAllProducts();

  const paths = response.map((post: MainProductData) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;

  let productData = null;
  if (params?.id) {
    productData = await getOneProduct(params.id);
  }

  return { props: { productData } };
};

export default Product;
