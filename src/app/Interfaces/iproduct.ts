import { ICategry } from "./icategry";

export interface IProduct {
  _id: string,
  title: string,
  description: string,
  quantity: number,
  price: number,
  imageCover: string,
  category :ICategry,
  brand:any,
  subcategory:any,
  images: any,
  ratingsAverage: number,
  ratingsQuantity: number,
  updatedAt: string,
  files: any,
}

export interface IProducts{

    id: number;
    nameAr: string;
    nameEn: string;
    descAr: string | null;
    descEn: string | null;
    detailAr: string | null;
    detailEn: string | null;
    price: number;
    oldPrice: number;
    categoryId: number;
    isOffer: boolean;
    showHome: boolean;
    videoUrl: string | null;
    images: IImage[];
    category: {
      nameAr: string;
      nameEn: string;
      id: number;
    };


}

interface IImage{
  id: number,
  imagePath: string,
}
