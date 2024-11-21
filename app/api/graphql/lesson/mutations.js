import { gql } from '@apollo/client';

export const ADD_LESSON = gql`
  mutation AddLesson($input: LessonInput) {
    addLesson(input: $input) {
      title
      description
      author
      video
      videoLink
      pdf
      createdAt
    }
  }
`;

export const UPDATE_LESSON = gql`
  mutation UpdateLesson($input: UpdateLessonInput) {
    updateLesson(input: $input) {
      title
      description
      author
      video
      videoLink
      pdf
      createdAt
    }
  }
`;

export const REMOVE_LESSON = gql`
  mutation RemoveLesson($input: RemoveLessonInput) {
    removeLesson(input: $input) {
      success
    }
  }
`;
export const PROMOTE_LESSON = gql`
  mutation PromoteLesson($input: PromoteLessonInput) {
    promoteLesson(input: $input) {
      success
    }
  }
`;
