import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './UserSlice.js'

export const store = configureStore({
  reducer: {
    UserShop: UserSlice,
  },
})