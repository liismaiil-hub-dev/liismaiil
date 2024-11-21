import { gql } from '@apollo/client';
export const GET_LESSON = gql`
  query Lesson($titleSlug: String) {
    lesson(titleSlug: $titleSlug) {
      success
      message
  }}
`;
export const LESSONS_BY_ID = gql`
  query LessonsById($id: String) {
    lessonsById(id: $id) {
     success
     message
    }
  }
`;
export const LESSONS = gql`
  query Lessons {
     success
     message
  }
`;
