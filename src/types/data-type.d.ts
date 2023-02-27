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
  like?: number;
}
