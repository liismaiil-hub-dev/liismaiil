import { gql } from '@apollo/client';

export const ADD_SELECTION = gql`
  mutation AddSelection($input: SelectionInput) {
    addSelection(input: $input) {
      title
      description
      image {
        url
      }
      author
      createdAt
    }
  }
`;
export const UPDATE_SELECTION = gql`
  mutation UpdateSelection($titleSlug: String, $input: SelectionInput) {
    updateSelection(titleSlug: $titleSlug, input: $input) {
      title
      description
      image {
        url
      }
      author
      products {
        titleSlug
        createdAt
        title
        image {
          url
        }
        description
      }
    }
  }
`;

export const REMOVE_SELECTION = gql`
  mutation RemoveSelection($input: RemoveSelectionInput) {
    removeSelection(input: $input) {
      success
      message
    }
  }
`;

export const SEND_TELEGRAM_ADDED_SELECTION = gql`
  mutation SendTelegramAddedSelection($input: SendTelegramAddedSelectionInput) {
    sendTelegramAddedSelection(input: $input) {
      success
      message
    }
  }
`;

export const PROMOTE_SELECTION = gql`
  mutation PromoteSelection($input: SelectionPromoteInput) {
    promoteSelection(input: $input) {
      title
      description
      image {
        url
      }
      author
      products {
        titleSlug
        title
        image {
          url
        }
        description
      }
      promote
    }
  }
`;
