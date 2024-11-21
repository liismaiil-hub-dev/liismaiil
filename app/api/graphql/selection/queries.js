//import { gql } from "react-query";
import { gql } from '@apollo/client';

export const GET_SELECTION = gql`
  query Selection($titleSlug: String) {
    selection(titleSlug: $titleSlug) {
      titleSlug
      title
      description
      author
      promote
      image {
        public_id
        url
      }
      products {
        title
        titleSlug
        image {
          url
        }
        promo
        description
        stock
        price
        productStatus
      }
    }
  }
`;

export const GET_SELECTIONS = gql`
  query Selections {
    selections {
      titleSlug
      title
      description
      author
      image {
        url
        public_id
      }
      products {
        title
        titleSlug
        image {
          url
        }
        productStatus
      }
    }
  }
`;
export const GET_PRODUCTS = gql`
  query GetProducts($titleSlug: String) {
    getproducts(titleSlug: $titleSlug) {
      title
      titleSlug
      description
      price
      author
      promotedBy {
        rate
        profile
      }
      stock
      promo
      reviews
      productStatus
      discount
      image {
        url
      }
      productStatus
    }
  }
`;

export const SELECTIONS_BY_AUTHOR = gql`
  query SelectionsByAuthor($email: String) {
    selectionsByAuthor(email: $email) {
      title
      titleSlug
      description
      author
      promote {
        profile
        rate
      }
      createdAt
      image {
        public_id
        url
      }
      products {
        title
        titleSlug
        productStatus
        discount
        image {
          url
        }
      }
    }
  }
`;

export const GET_FAVORITES = gql`
  query Favorites {
    favorites {
      titleSlug
      title
      description
      author
      image {
        public_id
        url
      }
      products {
        title
        titleSlug
        image {
          url
        }
      }
    }
  }
`;
