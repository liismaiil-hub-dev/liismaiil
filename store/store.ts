import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import guestReducer, { GuestStateType } from '@/store/slices/guestSlice'
import viewerReducer, { ViewerStateType } from '@/store/slices/viewerSlice'
import lessonReducer, { LessonStateType } from '@/store/slices/lessonSlice'
import coursReducer, { CoursStateType } from '@/store/slices/coursSlice'
import searchReducer from '@/store/slices/searchSlice'
import sprintReducer from '@/store/slices/sprintSlice'
import menuReducer from '@/store/slices/menuSlice'
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer = combineReducers({
  viewer: viewerReducer,
  guest: guestReducer,
  lesson: lessonReducer,
  cours: coursReducer,
  sprint: sprintReducer,
  search: searchReducer,
  menu: menuReducer,
})
const persistedRootReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedRootReducer,
  //enhancers: [composedEnhancers],
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE,
          PERSIST, PURGE, REGISTER], logger
      },
    }),
})
export const persistor = persistStore(store)
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>