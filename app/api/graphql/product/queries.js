import { gql } from '@apollo/client';
export const GET_PRODUCT = gql`
  query Product($titleSlug: String) {
    product(titleSlug: $titleSlug) {
      title
      description
      price
      author
      promotedBy {
        profile
        rate
      }
      image {
        url
        public_id
      }
      productStatus
    }
  }
`;
export const PRODUCTS_BY_EMAIL = gql`
  query ProductsByEmail($email: String) {
    productsByEmail(email: $email) {
      title
      titleSlug
      description
      price
      promotedBy {
        profile
        rate
      }
      author
      createdAt
      image {
        url
        public_id
      }
      productStatus
      stock
      promo
      selection
    }
  }
`;
export const PRODUCTS = gql`
  query Products {
    products {
      title
      titleSlug
      price
      author
      promotedBy {
        profile
        rate
      }
      image {
        url
        public_id
      }
      productStatus
      author
      promo
      stock
      selection

      createdAt
    }
  }
`;
export const DISCOUNTS = gql`
  query Discounts {
    discounts {
      title
      titleSlug
      price
      author
      promotedBy {
        profile
        rate
      }
      image {
        url
        public_id
      }
      productStatus
      author
      discount
      stock
      selection

      createdAt
    }
  }
`;
export const VRACS = gql`
  query Vracs {
    vracs {
      title
      titleSlug
      price
      author
      promotedBy {
        rate
        profile
      }
      image {
        url
        public_id
      }
      productStatus
      author
      discount
      stock
      selection

      createdAt
    }
  }
`;
export const PRODUCTS_BY_ID = gql`
  query ProductsById {
    productsById {
      title
      titleSlug
      price
      author
      promotedBy {
        rate
        profile
      }
      image {
        url
        public_id
      }
      productStatus
      author
      promo
      stock

      createdAt
    }
  }
`;
