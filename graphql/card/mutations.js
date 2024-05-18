import { gql } from '@apollo/client';

export const ADD_CARD = gql`
  mutation AddCard($input: CardInput) {
    addCard(input: $input) {
      titleSlug
      title
      tags
      soura
      words
      cardStatus
      description
      level
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($input: UpdateCardInput) {
    updateCard(input: $input) {
      titleSlug
      title
      tags
      soura
      words
      cardStatus
      description
      level
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation RemoveCard($titleSlug: String) {
    removeCard(titleSlug: $titleSlug)
  }
`;
export const VALIDATE_APOLLO_CARD = gql`
  mutation ValidateCard($titleSlug: String) {
    validateCard(titleSlug: $titleSlug) {
      title
    }
  }
`;
