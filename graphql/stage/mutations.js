import { gql } from '@apollo/client';

export const ADD_GUEST_PRISMA = gql`
  mutation AddGuestPrisma($input:AddGuestPrismaInput ) {
    addGuestPrisma(input: $input) {
     message
     success
      
    }
  }
`;
export const SIGN_IN_PRISMA = gql`
  mutation SignInPrisma($input:AddGuestPrismaInput ) {
    signInPrisma(input: $input) {
     message
     success
      
    }
  }
`;
export const UPDATE_STAGE = gql`
  mutation UpdateStage($input: UpdateStageInput) {
    updateStage(input: $input) {
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
  mutation AddViewerToStage($input: AddViewerInput) {
    addViewerToStage(input: $input) {
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

export const REMOVE_STAGE = gql`
  mutation RemoveStage {
    removeStage
  }
`;
