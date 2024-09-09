import coursReducer from '@/store/slices/coursSlice'
import guestPrismaReducer from '@/store/slices/guestPrismaSlice'
import lessonReducer from '@/store/slices/lessonSlice'

import profileReducer from '@/store/slices/profileSlice'
import searchReducer from '@/store/slices/searchSlice'
import sprintReducer from '@/store/slices/sprintSlice'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import createWebStorage from "redux-persist/lib/storage/createWebStorage"

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer = combineReducers({
  profile: profileReducer,
  guestPrisma: guestPrismaReducer,
  lesson: lessonReducer,
  cours: coursReducer,
  sprint: sprintReducer,
  search: searchReducer,
})
const persistedRootReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedRootReducer,
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