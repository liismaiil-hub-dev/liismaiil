import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
  mutation AddProduct($input: ProductInput) {
    addProduct(input: $input) {
      title
      description
      price
      author
      image {
        public_id
        url
      }
      productStatus
      promo
      stock
    }
  }
`;
export const MAKE_DISCOUNT = gql`
  mutation MakeDiscount($input: ProductInput) {
    makeDiscount(input: $input) {
      title
      description
      price
      author
      image {
        public_id
        url
      }
      productStatus
      promo
      discount
      stock
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput) {
    updateProduct(input: $input) {
      title
      description
      price
      author
      image {
        public_id
        url
      }
      productStatus
    }
  }
`;

export const REMOVE_PRODUCTS = gql`
  mutation RemoveProducts($input: [RemoveProductInput]) {
    removeProducts(input: $input) {
      success
    }
  }
`;
export const PROMOTE_PRODUCT = gql`
  mutation PromoteProduct($input: PromoteProductInput) {
    promoteProduct(input: $input) {
      success
    }
  }
`;
