import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
}

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    SignOut: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = false

    },

    SignInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { SignInSuccess, SignOut } = UserSlice.actions

export default UserSlice.reducer