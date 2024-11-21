//import { gql } from "react-query";
import { gql } from '@apollo/client';

export const GET_COURS = gql`
  query Cours($titleSlug: String) {
    cours(titleSlug: $titleSlug) {
     message
     success
    }
  }
`;
export const GET_COURS_LESSONS = gql`
  query coursLessons($titleSlug: String) {
    coursLessons(titleSlug: $titleSlug) {
      message
     success
    }
  }
`;

export const GET_COURSES = gql`
  query Courses {
    courses {
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

export const COURSES_BY_ID = gql`
  query CoursesById($id: String) {
    coursesById(id: $id) {
      success
      message
    }
  }
`;
