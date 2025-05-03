export interface IProduct {
  nameAr:string,
  nameEn:string,
  descAr:string,
  descEn:string,
  detailAr:string,
  detailEn:string,
  price: string,
  oldPrice: string,
  categoryId:string,
  isOffer:string,
  showHome:string,
  id:string,
  files?:any,
  images?:any,
  category:ICategory[],
}
interface IPhotos{
  id: number,
  imagePath: string,
}
interface ICategory{
  id: number,
  nameAr: string,
  nameEn: string,
}
