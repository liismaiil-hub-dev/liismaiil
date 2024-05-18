import { gql } from '@apollo/client';

export const ADD_TABLET = gql`
  mutation AddTablet($input: TabletInput) {
    addTablet(input: $input) {
      title
      description
      grid
      arabName
      souraName
      souraNb
      wordsComment {
        word
        comment
        index
        ayah
      }
      ayahsGrid {
        text
        numberInSurah
        number
        juz
        soura
      }
    }
  }
`;

export const ADD_TABLET_TEMPLATE = gql`
  mutation AddTabletTemplate($input: TabletTemplateInput) {
    addTabletTemplate(input: $input) {
     success
     message
    }
  }
`;

export const ADD_TABLET_GRIDS = gql`
  mutation AddTabletGrids($input: TabletGridsInput) {
    addTabletGrids(input: $input) {
      title
      description
      grid
      arabName
      souraName
      souraNb
      wordsComment {
        word
        comment
        index
        ayah
      }
      ayahsGrids {
        text
        numberInSurah
        number
        juz
        soura
      }
    }
  }
`;
export const UPDATE_TABLET = gql`
  mutation UpdateTablet($input: TabletInput) {
    updateTablet(input: $input) {
      id
      title
      description
      arabeName
      soura
      souraNumber
      tabletWords {
        text
        number
      }
      ayahs {
        text
        numberInSurah
        number
        juz
        soura
      }
    }
  }
`;
export const VALIDATE_TABLET = gql`
  mutation ValidateTablet($titleSlug: String) {
    validateTablet(titleSlug: $titleSlug) {
      id
      title
      description
      arabeName
      soura
      souraNumber
      tabletWords {
        text
        number
      }
      ayahs {
        text
        numberInSurah
        number
        juz
        soura
      }
    }
  }
`;

export const REMOVE_TABLET = gql`
  mutation RemoveTablet($titleSlug: String) {
    removeTablet(titleSlug: $titleSlug)
  }
`;
export const CREATE_SOURAS_SECTIONS = gql`
  mutation CreateSourasSections($input: CreateSourasSectionsInput) {
    createSourasSections(input: $input) {
      success
    }
  }
`;
