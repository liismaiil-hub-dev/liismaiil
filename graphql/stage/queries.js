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
export const GET_DOMAINS = `
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
}

`;
