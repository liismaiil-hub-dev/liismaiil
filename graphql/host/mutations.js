import { gql } from '@apollo/client';

export const ADD_VIEWER = gql`
mutation AddViewer($input: AddViewerInput) {
    addViewer(input: $input) {
      _id
      username
      login
      email
      token
      level
      phone
    }
  }
`;


export const UPDATE_VIEWER = gql`
  mutation UpdateViewer($input: UpdateViewerInput) {
    updateViewer(input: $input) {
      _id
      login
      email
      bio
      phone
    }
  }
`;
export const ADD_VIEWER_ADDRESS = gql`
mutation AddViewerAddress($input: AddViewerAddressInput) {
    addViewerAddress(input: $input) {
      _id
      login
      email
      token
      phone
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
    }
  }
`;

export const PROMOTE = gql`
mutation AddAddress($input: ViewerPromoteInput) {
    addAddress(input: $input) {
      _id
      username
      login
      email
      token
      level
      phone
        productsPromoted

          }
  }
`;

export const REMOVE_VIEWER = gql`
  mutation RemoveViewer {
    removeViewer
  }
`;
