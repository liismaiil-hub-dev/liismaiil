export type ImageType = {
  public_id: string;
  url: string;
};

export enum PRODUCT_STATUS_ENUM {
  ORGA = 'ORGA',
  FAMI = 'FAMI',
  LIBRARY = 'LIBRARY',
  VRAC = 'VRAC',
  DISC = 'DISC'
}

export enum PRODUCT_STATUS_NAME_ENUM {

  ORGA = 'Organisator',
  FAMI = 'Familly',
  LIBRARY = 'Library',
  VRAC = 'Vrac',
  DISC = 'Discount'
}
export type PromoteRateType = {
  profile: string;
  rate: number;
};

export type ProductTypeData = {
  title: string;
  titleSlug: string;
  description: string;
  price: number;
  offerPrice?: number;
  author: string;
  image: ImageType;
  productStatus: PRODUCT_STATUS_ENUM;
  promotedBy?: PromoteRateType[];
  valid?: boolean;
  selection: string;
  stock: number;
  promo: number;
  rate: number;
  discount?: number;
  quantity?: number;
  reviews?: string[];
  createdAt?: string;
};
export type BookTypeData = {
  title: string;
  titleSlug: string;
  description: string;
  price: number;
  author: string;
  image?: ImageType;
  productStatus: PRODUCT_STATUS_ENUM;
  promotedBy?: PromoteRateType[];
  valid?: boolean;
  selection: string;
  stock: number;
  quantity?: number;
  reviews?: string[];
  createdAt?: string;
};

export interface ProductsFilterArgs {
  filter: ProductsFilterType;
  page: number;
  limit: number;
}

export enum ProductsFilterType {
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW'
}

export type ProductInput = {
  title: string;
  description: string;
  price: string;
  image: ImageType;
  productStatus: string;
  author: string;
  stock: number;
  promo: number;
  discount: number;
  selection: string;
};
export type CheckedProductType = {
  titleSlug: string;
  title: string;
  description: string;
  price: number;
  image: ImageType;
  productStatus: string;
  stock: number;
  promo: number;
  author: string;
  selection: string;
};
export type UpdateProductInput = {
  titleSlug: string;
  title: string;
  description: string;
  price: number;
  image: ImageType;
  productStatus: string;
  stock: number;
  promo: number;
  author: string;
  selection: string;
};

export type PromoteProductInput = {
  titleSlug: string;
  profile: string;
  selectionSlug: string;
  rate: number;
};

export type SortOptionsProps = {
  value: string;
  label: string;
};

export type RemoveProductType = {
  slug: string;
  image_id: string;
  selection: string;
};
export type RemoveProductsInput = RemoveProductType[];
// product shop filter
export type ProductsFilter = {
  length?: number;
  search: string;
  sort: string;
  gender: string[];
  categories: string[];
  colors: string[];
  price: string;
  rating: number;
};

// product shop filter - sort options
