
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CoursReviewType } from '@/store/reducers/slices/coursSlice'
import { LessonTypeData} from '@/api/lesson/lesson.types'

export type LessonStateType = {
  lesson: LessonTypeData,
  lessons: LessonTypeData[],
  landingLessons: LessonTypeData[],
  openDeleteConfirmDialog: boolean,
  coursSelected:string,
  checkedLesson: LessonTypeData,
  checkedLessons: LessonTypeData[],
  coursLessons: LessonTypeData[],
  selfLessons: LessonTypeData[],
  coursLessonsChecked: LessonTypeData[],
  organisatorLessons: LessonTypeData[],
};
const initialLessonState: LessonStateType = {
  lesson: {
    title: '',
    description: '',
    author: '',
    video: '',
    videoLink: '',
    pdf: '',
    reviews: [ ''],
    createdAt: '',
  },
  landingLessons: [{
    title: '',
    description: '',
    author: '',
    video: '',
    videoLink: '',
    pdf: '',
    reviews: [ ''],
    createdAt: '',
  }],
  coursSelected:'',
  lessons: [{
    title: '',
    description: '',
    author: '',
    video: '',
    videoLink: '',
    pdf: '',
    reviews: [ ''],
    
    createdAt: '',
  }],
  openDeleteConfirmDialog: false,
  checkedLesson: {
    title: '',
    description: '',
    author: '',
    video: '',
    videoLink: '',
    pdf: '',
    reviews: [ ''],
    createdAt: '',
  },
  checkedLessons: [{
    title: '',
    description: '',
    author: '',
    video: '',
    videoLink: '',
    pdf: '',
    reviews: [ ''],
    createdAt: '',
  }],
  coursLessons: [{
    title: '',
    description: '',
    author: '',
    video: '',
    videoLink: '',
    pdf: '',
    reviews: [ ''],
    createdAt: '',
  }],
  selfLessons: [{
    title: '',
    description: '',
    author: '',
    video: '',
    videoLink: '',
    pdf: '',

    reviews: [ ''],
    
    createdAt: '',
  }],
  coursLessonsChecked: [{
    title: '',
    description: '',
    author: '',
    video: '',
    videoLink: '',
    pdf: '',
    reviews: [''],
    createdAt: '',
  }],
  organisatorLessons: [{
    title: '',
    description: '',
    author: '',
    video: '',
    videoLink: '',
    pdf: '',
    reviews: [''],
    createdAt: '',
  }],
};
const lessonSlice = createSlice({
  name: 'lesson',
  initialState: initialLessonState,
  reducers: {
    setLessons(state, action: PayloadAction<{ lessons: LessonTypeData[] }>) {
      state.lessons = action.payload.lessons
    },
    setLandingLessons(state, action: PayloadAction<{ lessons: LessonTypeData[] }>) {
      state.landingLessons = action.payload.lessons
    },
    setOrganisatorLessons(state, action: PayloadAction<{ lessons: LessonTypeData[] }>) {
      state.organisatorLessons = action.payload.lessons
    },
    setLesson(state, action: PayloadAction<{ lesson: LessonTypeData }>) {
      state.lesson = action.payload.lesson
    },

    setSelfLessons(state, action: PayloadAction<{ lessons: LessonTypeData[] }>) {
      state.selfLessons = action.payload.lessons
    },
    setCheckedLesson(state, action: PayloadAction<{ lesson: LessonTypeData }>) {
      state.checkedLesson = action.payload.lesson
    },
    setCoursLessonsChecked(state, action: PayloadAction<{ lessons: LessonTypeData[] }>) {
      state.coursLessonsChecked = action.payload.lessons
    },
    setCoursSelected(state, action: PayloadAction<{ cours: string }>) {
      state.coursSelected = action.payload.cours
    },
    addSelfLesson(state, action: PayloadAction<{ lesson: LessonTypeData }>) {
      state.selfLessons = state.selfLessons.concat(action.payload.lesson)
    },
    addCoursLesson(state, action: PayloadAction<{ lesson: LessonTypeData[] }>) {
      if (state.coursLessons.length === 1 && state.coursLessons[0]['title'] === '') {
        console.log(action.payload.lesson)
        state.coursLessons = [...action.payload.lesson]

      } else {
        state.coursLessons = state.coursLessons.concat(action.payload.lesson)
      }
    },
    setOpenDeleteConfirmDialog (state, action: PayloadAction<{ open: boolean}>) {
      state.openDeleteConfirmDialog = action.payload.open

    },

  }
})
export const lessonActions = lessonSlice.actions
export default lessonSlice.reducer


