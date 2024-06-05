import { gql } from '@apollo/client';
export const SPRINTS = gql`
  query Sprints {
    sprints {
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
export const SPRINTS_BY_AUTHOR = gql`
  query SprintsByAuthor($autor: String) {
    sprintsByAuthor(author: $author) {
      title
      description
      startDate
      endDate
      author
      stages {
        id
        title
        author
        guests
        grids{
          grid
          group
          title
          description
          souraNb
          arabName
          souraName
          ayahs{
            order
            text
            juz
            slice
          }
          createdA
          }
      }
    }
  }
`;
export const GET_TABLET_TEMPLATES = gql`
  query GetTabletTemplates {
    getTabletTemplates {
      arabName
      ayahs {
        number
        slice
        juz
        numberInSurah
        text}
      group
      description
      souraNb
      souraName
      createdAt
      updatedAt
    }
  }
`;

export const GET_TEMPLATE_BY_SOURA = gql`
  query GetTemplateBySoura($soura: String) {
    getTemplateBySoura(soura: $soura) {
      arabName
      ayahs {
        number
        slice
        juz
        numberInSurah
        text
      }
      group
      description
      souraNb
      souraName
      createdAt
      updatedAt
    }
  }
`;

export const GUESTS = gql`
  query Guests{
    guests {
     token
     flag
     time
    }
  }
`;

export const GET_STATS = gql`
  query GetStats($soura: String) {
    getStats(soura: $soura) {
      guests
      time
      suggestions
      coll
      soura
    }
  }
`;
export const GET_GRIDS_BY_NB = gql`
  query GetGridsByNb($input: GetGridsByNbInput) {
    getGridsByNb(input: $input) {
      success
      grids{
          grid
          group
          title
          description
          souraNb
          arabName
          souraName
          ayahs{
            order
            text
            juz
            
          }
          createdAt
          }
          }
  }
`;