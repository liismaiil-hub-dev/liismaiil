import { gql } from '@apollo/client';

export const ADD_COURS = gql`
  mutation AddCours($input: CoursInput) {
    addCours(input: $input) {
            success
            message
    }
  }
`;
export const ADD_LESSONS_TO_COURS = gql`
  mutation AddLessonsToCours($input: AddLessonsToCoursInput) {
    addLessonsToCours(input: $input) {
      success
    }
  }
`;
export const UPDATE_COURS = gql`
  mutation UpdateCours($input: UpdateCoursInput) {
    updateCours(tinput: $input) {
      title
      description
      price
      author
      image {
        url
      }
      lessons
      reviews
      createdAt
    }
  }
`;

export const REMOVE_COURS = gql`
  mutation RemoveCours($input: RemoveCoursInput) {
    removeCours(input: $input) {
      success
      message
    }
  }
`;
