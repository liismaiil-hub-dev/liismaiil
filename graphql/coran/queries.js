import { gql } from '@apollo/client';

export const SOURAS = gql`
  query Souras{
    souras {
    _id
    englishName
    name
     ayahs{
        number
        text
        numberInSurah
        juz
        }
    }
  }
`;


export const SOURAS_SELECT = gql`
  query SourasSelect{
    souras {
    _id
    englishName
    name
    }
  }
`;

export const SOURA = gql`
  query Soura($id: Int) {
    soura(id: $id) {
    id
    englishName
    name
      ayahs{
        number
        text
        numberInSurah
        juz
        }
    }
  }
`;
