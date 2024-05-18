import { gql } from '@apollo/client';

export const GET_CARD = gql`
  query Card($titleSlug: String) {
    card(titleSlug: $titleSlug) {
      title
      titleSlug
      tags
      soura
      words
      cardStatus
      description
      level
    }
  }
`;

export const GET_CARDS = gql`
  query Cards {
    cards {
      title
      titleSlug
      tags
      soura
      words
      cardStatus
      description
      level
    }
  }
`;
