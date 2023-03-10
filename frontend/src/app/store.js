import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import itemReducer from '../features/list/listSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    list: itemReducer
  }
})
