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
  fav: {
    id: number;
    productId: number;
    userId: number;
  }[];
}

export interface ProductData {
  id: number;
  brand: string;
  category: string;
  description: string;
  price: number;
  title: string;
  view: number;
  fav: {
    id: number;
    productId: number;
    userId: number;
  }[];
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

export interface ProductDataMin {
  brand: string;
  id: string | number;
  price: number;
  title: string;
  imgurl: { id: number; img: string }[];
}

export interface UserData {
  createdDate: string;
  email: string;
  id: number;
  fav: {
    id: number;
    productId: number;
    userId: number;
  }[];
  product: ProductData[] | ProductDataMin[];
  keywords: {
    id: number;
    tag: string;
    userId: number;
  }[];
  nickname: string;
  password: string;
  profileImg?: string;
  followers: number[];
  followings: number[];
}

export interface LookbookData {
  id: number;
  createdDate: string;
  description: string;
  hashTag: { id: number; tag: string }[];
  imgurl: { id: number; img: string }[];
  product: ProductDataMin[];
  likes: number;
  userId: number;
  user: {
    nickname: string;
  };
}
