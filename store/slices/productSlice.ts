import {ProductStatusEnum,  } from '@/api/product/product.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export type ProductProductType = {
  title: string, titleSlug: string,
  description: string, price: number,
  offerPrice: number,
  author: string, image: { url: string, public_id: '' },
  productStatus: ProductStatusEnum.FRONT,
  selection: string,
  stock: number,
  promo: number,
  rate: number,
  quantity: number,
  discount: number,
  createdAt: string
}
type ProductReviewType = {
  date: string,
  profile: string,
  rate: number,
  content: string
}
export type ProductStateType = {

  pageIndex: number,
  products: ProductProductType[],
  page: number,
  productStatus: string,
  selected: ProductProductType,
  allProducts: ProductProductType[],
  checkedProduct: ProductProductType,
  discountProducts: ProductProductType[],
  selfProducts: ProductProductType[],
  product: ProductProductType,
  reviews: ProductReviewType[],

  promoted: ProductProductType[],
}
const initialProductState: ProductStateType = {

  pageIndex: 0,
  products: [{
    title: '', titleSlug: '',
    description: '', price: 0,
    offerPrice: 0,
    author: '',
    image: { url: '', public_id: '' },
    productStatus: ProductStatusEnum.FRONT,
    selection: '',
    stock: -1,
    promo: 0,
    rate: 5,
    quantity: 0,
    discount: 0,
    createdAt: ''
  }],
  page: 1,
  productStatus: '',
  selected: {
    title: '', titleSlug: '',
    description: '', price: 0,
    offerPrice: 0,
    author: '',
    image: { url: '', public_id: '' },
    productStatus: ProductStatusEnum.FRONT,
    selection: '',
    stock: -1,
    promo: 0,
    rate: 5,
    quantity: 0,
    discount: 0,
    createdAt: ''
  },
  allProducts: [{
    title: '', titleSlug: '',
    description: '', price: 0,
    offerPrice: 0,
    author: '',
    image: { url: '', public_id: '' },
    productStatus: ProductStatusEnum.FRONT,
    selection: '',
    stock: -1,
    promo: 0,
    rate: 5,
    quantity: 0,
    discount: 0,
    createdAt: ''
  }],
  checkedProduct: {
    title: '', titleSlug: '',
    description: '', price: 0,
    offerPrice: 0,
    author: '',
    image: { url: '', public_id: '' },
    productStatus: ProductStatusEnum.FRONT,
    selection: '',
    stock: -1,
    promo: 0,
    rate: 5,
    quantity: 0,
    discount: 0,
    createdAt: ''
  },
  discountProducts: [{
    title: '', titleSlug: '',
    description: '', price: 0,
    offerPrice: 0,
    author: '', image: { url: '', public_id: '' },
    productStatus: ProductStatusEnum.FRONT,
    selection: '',
    stock: 100,
    promo: 0,
    rate: 5,
    quantity: 0,
    discount: 50,
    createdAt: ''
  }],
  selfProducts: [{
    title: '', titleSlug: '',
    description: '', price: 0,
    offerPrice: 0,
    author: '', image: { url: '', public_id: '' },
    productStatus: ProductStatusEnum.FRONT,
    selection: '',
    stock: 100,
    promo: 0,
    rate: 5,
    discount: 0,
    quantity: 0,
    createdAt: ''
  }
  ],
  product: {
    title: '', titleSlug: '',
    description: '', price: 0,
    offerPrice: 0,
    author: '', image: { url: '', public_id: '' },
    productStatus: ProductStatusEnum.FRONT,
    selection: '',
    stock: 100,
    promo: 0,
    rate: 5,
    discount: 0,
    quantity: 0,
    createdAt: ''
  },

  reviews: [{
    date: '',
    profile: '',
    rate: 0,
    content: ''
  }],

  promoted: [{
    title: '', titleSlug: '',
    description: '', price: 0,
    offerPrice: 0,
    author: '', image: { url: '', public_id: '' },
    productStatus: ProductStatusEnum.FRONT,
    selection: '',
    stock: 100,
    promo: 0,
    rate: 5,
    discount: 0,
    quantity: 0,
    createdAt: ''
  }],

};
const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    setAllProducts(state, action: PayloadAction<{ products: ProductProductType[] }>) {

      state.allProducts = action.payload.products
    },
    setProducts(state, action: PayloadAction<{ products: ProductProductType[] }>) {
      state.products = action.payload.products
    },
    setDiscountProducts(state, action: PayloadAction<{ products: ProductProductType[] }>) {
      state.discountProducts = action.payload.products
    },

    setCheckedProduct(state, action: PayloadAction<{ product: ProductProductType }>) {
      state.checkedProduct = action.payload.product
    },

    setSelected(state, action: PayloadAction<{ product: ProductProductType }>) {
      state.selected = action.payload.product
    },
    setProductStatus(state, action: PayloadAction<{ status: ProductStatusEnum }>) {
      state.productStatus = action.payload.status
    },

    setProduct(state, action: PayloadAction<{ product: ProductProductType }>) {
      state.product = action.payload.product
    },
    setSelfProducts(state, action: PayloadAction<{ products: ProductProductType[] }>) {
      state.selfProducts = action.payload.products
    },
    addToSelfProducts(state, action: PayloadAction<{ product: ProductProductType }>) {
      state.selfProducts = state.selfProducts.concat(action.payload.product)
    },
    setPageIndex(state, action: PayloadAction<{ index: number }>) {
      state.pageIndex = action.payload.index
    }
  }
})
export const productActions = productSlice.actions
export default productSlice.reducer
