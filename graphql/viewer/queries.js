import { gql } from "@apollo/client";

export const GET_VIEWERS = gql`
  query Viewers {
    viewers {
      login
      email
    
      level
      phone
    }
  }
`;

export const GET_VIEWER = gql`
  query Viewer($id: String) {
    viewer(id: $id) {
      login
      email
      token
      level
      phone
      productsPromoted
      bio
      cards {
        title
      }

      tablets {
        title
      }
      cardsValid {
        title
      }
      tabletsValid {
        title
      }
      role

      liism
      walletId
      address {
        name
        destination
        building
        street
        city
        state
        country

        zip
        isdefault
      }
      updatedAt
      createdAt
    }
  }
`;
export const GUESTS = gql`
  query Guests {
    guests {
      token
      password
      String
      flagAvatar
      organisation
      instagram
      cha3bi
      tablets
      cards
      tabletsValid
      cardsValid
    }
  }
`;

export const GUEST_BY_TOKEN = gql`
  query GuestByToken($input: GuestByTokenInput) {
    guestByToken(input: $input) {
      success
      token
      flag
    }
  }
`;

export const GUEST_BY_TOKEN_AWS = gql`
  query GuestByTokenAws($token: String) {
    GuestByTokenAws(token: $token) {
      token
      password
      String
      flagAvatar
      organisation
      instagram
      cha3bi
      tablets
      cards
      tabletsValid
      cardsValid
    }
  }
`;

export const SIGN_IN_VIEWER = gql`
  query SignInViewer($input: SignViewerInput) {
    signinViewer(input: $input) {
      login
      email
      token

      phone

      productsPromoted
    }
  }
`;
export const GET_TOKEN = gql`
  query RefreshToken {
    refreshToken {
      token
    }
  }
`;
