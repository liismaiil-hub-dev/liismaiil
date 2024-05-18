import { gql } from '@apollo/client';

export const ADD_DOMAIN = gql`
  mutation AddDomain($input: CreateDomainInput) {
    addDomain(input: $input) {
      title
      titleSlug
      viewers {
        login
      }
      city
      country
      cards {
        title
      }
      tablets {
        title
      }
    }
  }
`;

export const UPDATE_DOMAIN = gql`
  mutation UpdateDomain($input: UpdateDomainInput) {
    updateDomain(input: $input) {
      title
      titleSlug
      viewers {
        login
      }
      city
      country
      cards {
        title
      }
      tablets {
        title
      }
    }
  }
`;
export const ADD_VIEWER = gql`
  mutation AddViewerToDomain($input: AddViewerInput) {
    addViewerToDomain(input: $input) {
      title
      titleSlug
      viewers {
        login
      }
      city
      country
      cards {
        title
      }
      tablets {
        title
      }
    }
  }
`;

export const REMOVE_DOMAIN = gql`
  mutation RemoveDomain {
    removeDomain
  }
`;
