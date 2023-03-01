export interface MainProductData {
  id: number;
  imgurl: string[{
    id: number;
    img: string;
  }];
  category: string;
  createdDate: string;
  description: string;
  brand: string;
  lookId: number | null;
  price: number;
  title: string;
  style: string;
  rental: boolean;
  view?: number;
  likes?: number;
}

export interface ProductData {
  id: number;
  brand: string;
  category: string;
  description: string;
  price: number;
  title: string;
  view: number;
  likes: number;
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
  hashTag: {
    id: number;
    tag: string;
  }[];
}
