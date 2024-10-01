import { gql } from '@apollo/client';

export const GET_DOMAINS = gql`
  query Domains {
    domains {
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

export const GET_DOMAIN = gql`
  query Domain {
    domain {
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

export const GET_GRIDS_BY_NB = gql`
  query GetGridsByNb($souraNb: Int) {
    getGridsByNb(souraNb: $souraNb) {
      success
      grids{
          grid
          title
          souraNb
          arabName
          group
          souraName
          ayahs
      }
  }
  }
  `;