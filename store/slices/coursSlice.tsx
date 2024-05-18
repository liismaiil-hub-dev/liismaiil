import { CoursTypeData } from '@/api/cours/cours.types'
//import { LessonType } from '@/api/lesson/lesson.types'
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'

export type CoursReviewType = {
  date: string,
  profileId: string,
  rate: number,
  content: string
}

export type CoursStateType = {
  cours: CoursTypeData,
  selfCourses: CoursTypeData[],
  checkedCours: CoursTypeData,
  courses: CoursTypeData[],
};
const initialCoursState: CoursStateType = {
  cours: {
    title: '',
    description: '',
    price: -1,
    author: '',
    reviews: [{
      date: '',
      profileId: '',
      rate: -1,
      content: ''
    }],
    image: { public_id: '', url: '' },
    lessons: [''],
    createdAt: '', guests: [
       '']
  },
  selfCourses: [{
    title: '',
    description: '',
    price: -1,
    author: '',
    image: { public_id: '', url: '' },
    lessons: [ ''   ],
    guests: [ ''],
    reviews: [{
      date: '',
      profileId: '',
      rate: -1,
      content: ''
    }],
    
    createdAt: '',
  }],
  checkedCours: {
    title: '',
    description: '',
    price: -1,
    author: '',
    image: { public_id: '', url: '' },
    lessons: [ ''],
    reviews: [{
      date: '',
      profileId: '',
      rate: -1,
      content: ''
    }], 
    createdAt: '', guests: [''],
  },

  courses: [{
    title: '',
    description: '',
    price: -1,
    author: '',
    image: { public_id: '', url: '' },
    lessons: [ ''],
    reviews: [{
      date: '',
      profileId: '',
      rate: -1,
      content: ''
    }], 
    createdAt: '', guests: [''],
  }],

};
const coursSlice = createSlice({
  name: 'cours',
  initialState: initialCoursState,
  reducers: {
    setCourses(state, action: PayloadAction<{ courses: CoursTypeData[] }>) {
      state.courses = action.payload.courses
    },
    setCours(state, action: PayloadAction<{ cours: CoursTypeData }>) {
      state.cours = action.payload.cours
    },
    setCheckedCours(state, 
      action: PayloadAction<{ cours: CoursTypeData }>) {
      state.checkedCours = action.payload.cours
    },
    setSelfCourses(state, action: PayloadAction<{ courses: CoursTypeData[] }>) {
      console.log({ courses: action.payload.courses})
      
      if(current(state).selfCourses[0].title === '') {
      state.selfCourses = action.payload.courses
        }else {
          state.selfCourses = [...current(state).selfCourses, ...action.payload.courses]
        }
    },
    addSelfCours(state, action: PayloadAction<{ cours: CoursTypeData }>) {
      if (state.selfCourses[0]['title'] === '') {
        state.selfCourses = [action.payload.cours]
      } else {
        state.selfCourses = [...state.selfCourses, action.payload.cours]
      }
    }
  }
})
export const coursActions = coursSlice.actions

export default coursSlice.reducer